import { initializeApp, cert, getApps, App, getApp } from 'firebase-admin/app';
import { getFirestore, Firestore, DocumentData, QueryDocumentSnapshot, WithFieldValue, DocumentReference, FirestoreDataConverter } from 'firebase-admin/firestore';
import { getAuth, Auth } from 'firebase-admin/auth';

// Define a base document type that includes an optional id
interface FirestoreDocument {
  id?: string;
  [key: string]: any;
}

// Get Firebase service account from environment
const getServiceAccount = () => {
  if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT environment variable is not set');
  }

  try {
    return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } catch (error) {
    console.error('Error parsing FIREBASE_SERVICE_ACCOUNT:', error);
    throw new Error('Failed to parse FIREBASE_SERVICE_ACCOUNT. Make sure it is a valid JSON string.');
  }
};

const serviceAccount = getServiceAccount();

// Initialize Firebase Admin
let firebaseAdmin: App;
let db: Firestore;
let auth: Auth;

// Format private key by replacing escaped newlines
const privateKey = serviceAccount.private_key.replace(/\\n/g, '\n');

const firebaseConfig = {
  credential: cert({
    projectId: serviceAccount.project_id,
    clientEmail: serviceAccount.client_email,
    privateKey: privateKey,
  }),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
  storageBucket: `${serviceAccount.project_id}.appspot.com`,
  projectId: serviceAccount.project_id
};

if (!getApps().length) {
  try {
    firebaseAdmin = initializeApp(firebaseConfig);
    console.log('Firebase Admin initialized');
  } catch (error) {
    console.error('Failed to initialize Firebase Admin:', error);
    throw error;
  }
} else {
  firebaseAdmin = getApp();
}

// Initialize Firestore and Auth
db = getFirestore(firebaseAdmin);
auth = getAuth(firebaseAdmin);

// Configure Firestore settings
if (process.env.NODE_ENV === 'development') {
  // Use local emulator if running in development
  if (process.env.FIRESTORE_EMULATOR_HOST) {
    db.settings({
      host: process.env.FIRESTORE_EMULATOR_HOST,
      ssl: false,
    });
    console.log('Using Firestore emulator at', process.env.FIRESTORE_EMULATOR_HOST);
  }
}

export { firebaseAdmin, db, auth };

// Firestore data converter with proper typing
export const converter = <T extends FirestoreDocument>(): FirestoreDataConverter<T> => {
  return {
    toFirestore: (data: WithFieldValue<T>): DocumentData => {
      const { id, ...rest } = data as any;
      return rest as DocumentData;
    },
    fromFirestore: (snap: QueryDocumentSnapshot): T => {
      const data = snap.data() as T;
      return {
        ...data,
        id: snap.id,
      } as T;
    },
  };
};

// Collection references with type safety
export const collections = {
  users: db.collection('users').withConverter(converter<any>()),
  hubs: db.collection('hubs').withConverter(converter<any>()),
  deliveryPartners: db.collection('deliveryPartners').withConverter(converter<any>()),
  shipments: db.collection('shipments').withConverter(converter<any>()),
  trackingHistory: db.collection('trackingHistory').withConverter(converter<any>()),
  routes: db.collection('routes').withConverter(converter<any>()),
  supportTickets: db.collection('supportTickets').withConverter(converter<any>()),
};

// Helper function to get a typed collection reference
export const getCollection = <T extends FirestoreDocument>(collectionName: string) => 
  db.collection(collectionName).withConverter(converter<T>());
