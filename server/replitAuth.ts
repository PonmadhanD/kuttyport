import { Request, Response, NextFunction } from 'express';
import { auth, collections } from './firebase';
import { AuthUser } from '@shared/types';
import session from 'express-session';
import connectPg from 'connect-pg-simple';
import type { Express } from 'express';

// Extend the session type to include the user property
declare module 'express-session' {
  interface SessionData {
    user?: AuthUser;
  }
}

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

// Create a custom request type that includes our user
export interface AuthRequest extends Request {
  user?: AuthUser;
}

export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  
  // Set secure based on environment - false for development (HTTP), true for production (HTTPS)
  const isProduction = process.env.NODE_ENV === 'production';
  
  return session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: isProduction,
      maxAge: sessionTtl,
      sameSite: 'lax',
    },
  });
}

// Middleware to verify Firebase ID token
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = await auth.verifyIdToken(token);
    
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

    const userRole = (req.user as any).role || 'customer';
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

export function setupAuth(app: Express) {
  // Initialize session middleware
  app.use(getSession());
  
  // Authentication routes
  app.post('/auth/login', (req, res) => {
    // This would typically handle email/password login and return a token
    res.status(200).json({ message: 'Use the /auth/token endpoint with your Firebase ID token' });
  });

  // Verify token and create session
  app.post('/auth/token', async (req, res) => {
    try {
      const { token } = req.body;
      if (!token) {
        return res.status(400).json({ message: 'Token is required' });
      }

      const decodedToken = await auth.verifyIdToken(token);
      const userRecord = await auth.getUser(decodedToken.uid);
      
      // Get additional user data from Firestore
      const userDoc = await collections.users.doc(userRecord.uid).get();
      const userData = userDoc.data();
      
      // Create session
      req.session.user = {
        id: userRecord.uid,
        email: userRecord.email || null,
        firstName: userData?.firstName || null,
        lastName: userData?.lastName || null,
        profileImageUrl: userData?.profileImageUrl || null,
        role: userData?.role || 'customer',
        createdAt: userData?.createdAt?.toDate() || null,
        updatedAt: userData?.updatedAt?.toDate() || null,
        isAdmin: userData?.role === 'admin',
      };
      
      // Save the session
      req.session.save((err) => {
        if (err) {
          console.error('Error saving session:', err);
          return res.status(500).json({ message: 'Error saving session' });
        }
        res.status(200).json({ message: 'Authentication successful', user: req.session.user });
      });
    } catch (error) {
      console.error('Token verification error:', error);
      res.status(401).json({ message: 'Invalid token' });
    }
  });

  // Logout route
  app.post('/auth/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        return res.status(500).json({ message: 'Error logging out' });
      }
      res.clearCookie('connect.sid');
      res.status(200).json({ message: 'Logged out successfully' });
    });
  });
}

// Middleware to check if user is authenticated
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    return next();
  }
  res.status(401).json({ message: 'Authentication required' });
};
