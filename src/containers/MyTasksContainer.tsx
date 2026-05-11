import { useTaskAssignments, useUpdateTaskState } from "../hooks/useAssignments";
import { useAuth } from "../hooks/useAuth";
import type { TaskAssignmentResponse } from "../types/assignment.types";
import type { TaskStatus } from "../types/task.types";
import { TASK_STATUS_LABELS } from "../constants/enums";
import { formatDateTime } from "../utils/date";

function MyTaskAssignmentItem({
  assignment,
  onStatusChange,
  isPending,
}: {
  assignment: TaskAssignmentResponse;
  onStatusChange: (assignmentId: number, newState: TaskStatus) => void;
  isPending: boolean;
}) {
  return (
    <li>
      <strong>Assignment #{assignment.id}</strong>
      <div>Task ID: {assignment.taskId}</div>
      <div>Grup ID: {assignment.groupId ?? "-"}</div>
      <div>Durum: {TASK_STATUS_LABELS[assignment.taskState]}</div>
      <div>Ceza: {assignment.penaltyApplied ? "Uygulandı" : "Yok"}</div>
      <div>Tamamlanma: {formatDateTime(assignment.completedAt)}</div>

      <select
        value={assignment.taskState}
        disabled={isPending}
        onChange={(event) =>
          onStatusChange(assignment.id, event.target.value as TaskStatus)
        }
      >
        <option value="TODO">Bekliyor</option>
        <option value="IN_PROGRESS">Devam ediyor</option>
        <option value="DONE">Tamamlandı</option>
      </select>
    </li>
  );
}

export function MyTasksContainer() {
  const { userId } = useAuth();

  const assignmentsQuery = useTaskAssignments();
  const updateTaskStateMutation = useUpdateTaskState();

  const myAssignments = assignmentsQuery.data?.filter((assignment) => {
    if (!userId) {
      return true;
    }

    return assignment.userId === userId;
  });

  function handleStatusChange(assignmentId: number, newState: TaskStatus) {
    if (!userId) {
      return;
    }

    updateTaskStateMutation.mutate({
      taskAssignmentId: assignmentId,
      newState,
      userId,
    });
  }

  if (assignmentsQuery.isLoading) {
    return <p>Görevler yükleniyor...</p>;
  }

  if (assignmentsQuery.error) {
    return <p>Görevler alınamadı.</p>;
  }

  return (
    <section>
      <h2>Görevlerim</h2>

      {!myAssignments?.length && <p>Atanmış görev bulunamadı.</p>}

      <ul>
        {myAssignments?.map((assignment) => (
          <MyTaskAssignmentItem
            key={assignment.id}
            assignment={assignment}
            onStatusChange={handleStatusChange}
            isPending={updateTaskStateMutation.isPending}
          />
        ))}
      </ul>
    </section>
  );
}
