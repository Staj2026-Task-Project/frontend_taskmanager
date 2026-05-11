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
    return <p>Görevler yükleniyor...</p>;
  }

  if (assignmentsQuery.error) {
    return <p>Görevler alınamadı.</p>;
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
