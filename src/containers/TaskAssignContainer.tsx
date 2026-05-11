import { useState } from "react";
import { useAssignTask } from "../hooks/useAssignments";
import { useGroups } from "../hooks/useGroups";
import { useTasks } from "../hooks/useTasks";
import { useUsers } from "../hooks/useUsers";
import type { TaskAssignRequest } from "../types/assignment.types";

type AssignmentTargetType = "USER" | "GROUP" | "GROUP_MEMBER";

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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

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

      <form onSubmit={handleSubmit}>
        <select
          value={formData.taskId}
          onChange={(event) =>
            setFormData((current) => ({
              ...current,
              taskId: Number(event.target.value),
            }))
          }
        >
          <option value={0}>Task seç</option>
          {tasksQuery.data?.map((task) => (
            <option key={task.id} value={task.id}>
              #{task.id} - {task.title}
            </option>
          ))}
        </select>

        <select
          value={targetType}
          onChange={(event) => {
            setTargetType(event.target.value as AssignmentTargetType);
            setFormData((current) => ({
              ...current,
              userId: undefined,
              groupId: undefined,
            }));
          }}
        >
          <option value="USER">Kullanıcıya ata</option>
          <option value="GROUP">Gruba ata</option>
          <option value="GROUP_MEMBER">Grup içindeki kullanıcıya ata</option>
        </select>

        {(targetType === "USER" || targetType === "GROUP_MEMBER") && (
          <select
            value={formData.userId ?? 0}
            onChange={(event) =>
              setFormData((current) => ({
                ...current,
                userId: Number(event.target.value),
              }))
            }
          >
            <option value={0}>Kullanıcı seç</option>
            {usersQuery.data?.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        )}

        {(targetType === "GROUP" || targetType === "GROUP_MEMBER") && (
          <select
            value={formData.groupId ?? 0}
            onChange={(event) =>
              setFormData((current) => ({
                ...current,
                groupId: Number(event.target.value),
              }))
            }
          >
            <option value={0}>Grup seç</option>
            {groupsQuery.data?.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        )}

        <button type="submit" disabled={assignTaskMutation.isPending}>
          {assignTaskMutation.isPending ? "Atanıyor..." : "Task ata"}
        </button>
      </form>
    </section>
  );
}
