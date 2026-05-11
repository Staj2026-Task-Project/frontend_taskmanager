import { axiosClient } from "./axiosClient";
import type { AuthResponse, UserLoginRequest } from "../types/auth.types";

export async function login(data: UserLoginRequest): Promise<AuthResponse> {
  const response = await axiosClient.post<AuthResponse>("/auth/login", data);
  return response.data;
}
