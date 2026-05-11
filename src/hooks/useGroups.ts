import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addUserToGroup, createGroup, getGroups } from "../api/groups.api";
import type { GroupCreateRequest, UserGroupAddRequest } from "../types/group.types";

export function useGroups() {
  return useQuery({
    queryKey: ["groups"],
    queryFn: getGroups,
  });
}

export function useCreateGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: GroupCreateRequest) => createGroup(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
}

export function useAddUserToGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserGroupAddRequest) => addUserToGroup(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
