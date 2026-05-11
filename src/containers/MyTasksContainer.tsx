import { ErrorState } from "../components/feedback/ErrorState";
import { LoadingState } from "../components/feedback/LoadingState";
import { MyTaskList } from "../components/task/MyTaskList";
import { useTaskAssignments, useUpdateTaskState } from "../hooks/useAssignments";
import { useAuth } from "../hooks/useAuth";
import type { TaskStatus } from "../types/task.types";

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
    return <LoadingState message="Görevler yükleniyor..." />;
  }

  if (assignmentsQuery.error) {
    return <ErrorState message="Görevler alınamadı." />;
  }

  return (
    <section>
      <h2>Görevlerim</h2>

      <MyTaskList
        assignments={myAssignments ?? []}
        isUpdating={updateTaskStateMutation.isPending}
        onStatusChange={handleStatusChange}
      />
    </section>
  );
}
