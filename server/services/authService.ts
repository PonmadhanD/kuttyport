import { auth, db } from '../firebase';
import { collections } from '../firebase';
import { User, UserRole } from '@shared/types';

export class AuthService {
  static async createUser(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: UserRole;
  }) {
    try {
      // Create Firebase auth user
      const userRecord = await auth.createUser({
        email: userData.email,
        password: userData.password,
        displayName: `${userData.firstName} ${userData.lastName}`.trim(),
      });

      // Create user in Firestore
      const user: User = {
        id: userRecord.uid,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        profileImageUrl: null,
        role: userData.role || 'customer',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await collections.users.doc(userRecord.uid).set(user);

      // Set custom claims for role-based access
      await auth.setCustomUserClaims(userRecord.uid, {
        role: user.role,
      });

      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  static async verifyToken(token: string) {
    try {
      const decodedToken = await auth.verifyIdToken(token);
      const userDoc = await collections.users.doc(decodedToken.uid).get();
      
      if (!userDoc.exists) {
        throw new Error('User not found');
      }

      return {
        ...userDoc.data(),
        id: userDoc.id,
      } as User;
    } catch (error) {
      console.error('Error verifying token:', error);
      throw new Error('Invalid or expired token');
    }
  }

  static async getUserById(userId: string) {
    const userDoc = await collections.users.doc(userId).get();
    if (!userDoc.exists) {
      return null;
    }
    return { id: userDoc.id, ...userDoc.data() } as User;
  }
}

export default AuthService;
