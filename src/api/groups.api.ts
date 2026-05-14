import { axiosClient } from "./axiosClient";
import type {
  GroupCreateRequest,
  GroupResponse,
  UserGroupAddRequest,
} from "../types/group.types";

export async function createGroup(data: GroupCreateRequest): Promise<GroupResponse> {
  const response = await axiosClient.post<GroupResponse>("/groups", data);
  return response.data;
}

export async function getGroups(): Promise<GroupResponse[]> {
  const response = await axiosClient.get<GroupResponse[]>("/groups");
  return response.data;
}

export async function addUserToGroup(data: UserGroupAddRequest): Promise<void> {
  await axiosClient.post("/groups/users", data);
}
