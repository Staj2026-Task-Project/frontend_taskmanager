import { useState } from "react";
import {
  TaskAssignForm,
  type AssignmentTargetType,
} from "../components/task/TaskAssignForm";
import { useAssignTask } from "../hooks/useAssignments";
import { useGroups } from "../hooks/useGroups";
import { useTasks } from "../hooks/useTasks";
import { useUsers } from "../hooks/useUsers";
import type { TaskAssignRequest } from "../types/assignment.types";

export function TaskAssignContainer() {
  const tasksQuery = useTasks();
  const usersQuery = useUsers();
  const groupsQuery = useGroups();
  const assignTaskMutation = useAssignTask();

  const [targetType, setTargetType] = useState<AssignmentTargetType>("USER");

  const [formData, setFormData] = useState<TaskAssignRequest>({
    taskId: 0,
    userId: undefined,
    groupId: undefined,
  });

  function handleSubmit() {
    if (!formData.taskId) {
      return;
    }

    const requestData: TaskAssignRequest = {
      taskId: formData.taskId,
    };

    if (targetType === "USER") {
      requestData.userId = formData.userId;
    }

    if (targetType === "GROUP") {
      requestData.groupId = formData.groupId;
    }

    if (targetType === "GROUP_MEMBER") {
      requestData.groupId = formData.groupId;
      requestData.userId = formData.userId;
    }

    assignTaskMutation.mutate(requestData);
  }

  return (
    <section>
      <h2>Task Ata</h2>

      <TaskAssignForm
        value={formData}
        targetType={targetType}
        tasks={tasksQuery.data ?? []}
        users={usersQuery.data ?? []}
        groups={groupsQuery.data ?? []}
        isSubmitting={assignTaskMutation.isPending}
        onChange={setFormData}
        onTargetTypeChange={setTargetType}
        onSubmit={handleSubmit}
      />
    </section>
  );
}
