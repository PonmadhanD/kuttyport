import { User } from './user';

export interface AuthUser extends User {
  isAdmin: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  firstName: string;
  lastName: string;
  role?: UserRole;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}
