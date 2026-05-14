import { axiosClient } from "./axiosClient";
import type { UserCreateRequest, UserResponse } from "../types/user.types";

export async function createUser(data: UserCreateRequest): Promise<UserResponse> {
  const response = await axiosClient.post<UserResponse>("/users", data);
  return response.data;
}

export async function getUsers(): Promise<UserResponse[]> {
  const response = await axiosClient.get<UserResponse[]>("/users");
  return response.data;
}

export async function getUserById(userId: number): Promise<UserResponse> {
  const response = await axiosClient.get<UserResponse>(`/users/${userId}`);
  return response.data;
}
