import { Request, Response, NextFunction } from 'express';
import { auth } from 'firebase-admin';
import { collections } from '../firebase';
import { AuthUser } from '@shared/types';

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = await auth().verifyIdToken(token);
    
    // Get user from Firestore
    const userDoc = await collections.users.doc(decodedToken.uid).get();
    
    if (!userDoc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userData = userDoc.data();
    if (!userData) {
      return res.status(404).json({ message: 'User data not found' });
    }
    
    // Attach user to request object
    req.user = {
      id: userDoc.id,
      email: userData.email || null,
      firstName: userData.firstName || null,
      lastName: userData.lastName || null,
      profileImageUrl: userData.profileImageUrl || null,
      role: userData.role || 'customer',
      createdAt: userData.createdAt?.toDate() || null,
      updatedAt: userData.updatedAt?.toDate() || null,
      isAdmin: userData.role === 'admin',
    };

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

// Role-based access control middleware
export const requireRole = (roles: string | string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const userRole = req.user.role || 'customer';
    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    const hasRole = allowedRoles.includes(userRole);

    if (!hasRole) {
      return res.status(403).json({ 
        message: `Forbidden: Requires one of these roles: ${allowedRoles.join(', ')}` 
      });
    }

    next();
  };
};
