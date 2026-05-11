export type UserRole = "ROLE_ADMIN" | "ROLE_USER";

export interface UserCreateRequest {
  username: string;
  password: string;
  role: UserRole;
}

export interface UserResponse {
  id: number;
  username: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
