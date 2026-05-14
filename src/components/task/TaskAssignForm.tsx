import type { GroupResponse } from "../../types/group.types";
import type { TaskAssignRequest } from "../../types/assignment.types";
import type { TaskResponse } from "../../types/task.types";
import type { UserResponse } from "../../types/user.types";

export type AssignmentTargetType = "USER" | "GROUP" | "GROUP_MEMBER";

interface TaskAssignFormProps {
  value: TaskAssignRequest;
  targetType: AssignmentTargetType;
  tasks: TaskResponse[];
  users: UserResponse[];
  groups: GroupResponse[];
  isSubmitting: boolean;
  onChange: (value: TaskAssignRequest) => void;
  onTargetTypeChange: (value: AssignmentTargetType) => void;
  onSubmit: () => void;
}

export function TaskAssignForm({
  value,
  targetType,
  tasks,
  users,
  groups,
  isSubmitting,
  onChange,
  onTargetTypeChange,
  onSubmit,
}: TaskAssignFormProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <select
        value={value.taskId}
        onChange={(event) =>
          onChange({
            ...value,
            taskId: Number(event.target.value),
          })
        }
      >
        <option value={0}>Task seç</option>
        {tasks.map((task) => (
          <option key={task.id} value={task.id}>
            #{task.id} - {task.title}
          </option>
        ))}
      </select>

      <select
        value={targetType}
        onChange={(event) => {
          onTargetTypeChange(event.target.value as AssignmentTargetType);
          onChange({
            ...value,
            userId: undefined,
            groupId: undefined,
          });
        }}
      >
        <option value="USER">Kullanıcıya ata</option>
        <option value="GROUP">Gruba ata</option>
        <option value="GROUP_MEMBER">Grup içindeki kullanıcıya ata</option>
      </select>

      {(targetType === "USER" || targetType === "GROUP_MEMBER") && (
        <select
          value={value.userId ?? 0}
          onChange={(event) =>
            onChange({
              ...value,
              userId: Number(event.target.value),
            })
          }
        >
          <option value={0}>Kullanıcı seç</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
      )}

      {(targetType === "GROUP" || targetType === "GROUP_MEMBER") && (
        <select
          value={value.groupId ?? 0}
          onChange={(event) =>
            onChange({
              ...value,
              groupId: Number(event.target.value),
            })
          }
        >
          <option value={0}>Grup seç</option>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      )}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Atanıyor..." : "Task ata"}
      </button>
    </form>
  );
}
