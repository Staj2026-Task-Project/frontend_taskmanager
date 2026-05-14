import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTask, getTaskById, getTasks } from "../api/tasks.api";
import type { TaskCreateRequest } from "../types/task.types";

export function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });
}

export function useTask(taskId: number | null | undefined) {
  return useQuery({
    queryKey: ["tasks", taskId],
    queryFn: () => getTaskById(taskId as number),
    enabled: typeof taskId === "number",
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TaskCreateRequest) => createTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
