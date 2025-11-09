import { db } from './firebase';
import * as schema from "@shared/schema";

// Export Firestore instance and schema
export { db, schema };

// Helper function to get a typed collection reference
export const getCollection = <T>(collectionName: string) => 
  db.collection(collectionName).withConverter<T>({
    toFirestore: (data: any) => {
      const { id, ...rest } = data;
      return rest;
    },
    fromFirestore: (snapshot: any): T => {
      const data = snapshot.data();
      return {
        id: snapshot.id,
        ...data,
      } as T;
    },
  });

// Example collection references
export const collections = {
  users: getCollection<any>('users'),
  // Add other collections as needed
};
