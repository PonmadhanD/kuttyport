export type UserRole = 'customer' | 'delivery_partner' | 'employee' | 'admin';

export interface BaseUser {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  profileImageUrl: string | null;
  role: UserRole;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface User extends BaseUser {
  // Add any additional user properties here
}

export interface AuthUser extends BaseUser {
  // Add any auth-specific properties here
  isAdmin: boolean;
}

// Add other types as needed
export * from './schema';
