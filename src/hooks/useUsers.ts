import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, getUserById, getUsers } from "../api/users.api";
import type { UserCreateRequest } from "../types/user.types";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
}

export function useUser(userId: number | null | undefined) {
  return useQuery({
    queryKey: ["users", userId],
    queryFn: () => getUserById(userId as number),
    enabled: typeof userId === "number",
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserCreateRequest) => createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
