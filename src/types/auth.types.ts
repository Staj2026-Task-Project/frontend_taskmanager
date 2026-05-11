export interface UserLoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}
