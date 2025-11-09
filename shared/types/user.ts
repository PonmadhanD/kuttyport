export type UserRole = 'customer' | 'delivery_partner' | 'employee' | 'admin';

export interface User {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  profileImageUrl: string | null;
  role: UserRole;
  createdAt: Date | null;
  updatedAt: Date | null;
}

// Export a type that includes the role for auth purposes
export interface UserWithRole extends User {
  role: UserRole;
}
