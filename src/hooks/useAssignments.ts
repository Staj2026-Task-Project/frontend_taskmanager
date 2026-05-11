import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  assignTask,
  getTaskAssignments,
  updateTaskState,
} from "../api/assignments.api";
import type {
  TaskAssignRequest,
  TaskStateUpdateRequest,
} from "../types/assignment.types";

export function useTaskAssignments() {
  return useQuery({
    queryKey: ["task-assignments"],
    queryFn: getTaskAssignments,
  });
}

export function useAssignTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TaskAssignRequest) => assignTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task-assignments"] });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useUpdateTaskState() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TaskStateUpdateRequest) => updateTaskState(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task-assignments"] });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
