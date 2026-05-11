import type { TaskAssignmentResponse } from "../../types/assignment.types";
import type { TaskStatus } from "../../types/task.types";
import { TASK_STATUS_LABELS } from "../../constants/enums";
import { formatDateTime } from "../../utils/date";

interface MyTaskListProps {
  assignments: TaskAssignmentResponse[];
  isUpdating: boolean;
  onStatusChange: (assignmentId: number, newState: TaskStatus) => void;
}

export function MyTaskList({
  assignments,
  isUpdating,
  onStatusChange,
}: MyTaskListProps) {
  if (!assignments.length) {
    return <p>Atanmış görev bulunamadı.</p>;
  }

  return (
    <ul>
      {assignments.map((assignment) => (
        <li key={assignment.id}>
          <strong>Assignment #{assignment.id}</strong>
          <div>Task ID: {assignment.taskId}</div>
          <div>Grup ID: {assignment.groupId ?? "-"}</div>
          <div>Durum: {TASK_STATUS_LABELS[assignment.taskState]}</div>
          <div>Ceza: {assignment.penaltyApplied ? "Uygulandı" : "Yok"}</div>
          <div>Tamamlanma: {formatDateTime(assignment.completedAt)}</div>

          <select
            value={assignment.taskState}
            disabled={isUpdating}
            onChange={(event) =>
              onStatusChange(assignment.id, event.target.value as TaskStatus)
            }
          >
            <option value="TODO">Bekliyor</option>
            <option value="IN_PROGRESS">Devam ediyor</option>
            <option value="DONE">Tamamlandı</option>
          </select>
        </li>
      ))}
    </ul>
  );
}
