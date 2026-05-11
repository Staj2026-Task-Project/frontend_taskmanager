export interface GroupCreateRequest {
  name: string;
}

export interface GroupResponse {
  id: number;
  name: string;
  createdBy: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserGroupAddRequest {
  userId: number;
  groupId: number;
}
