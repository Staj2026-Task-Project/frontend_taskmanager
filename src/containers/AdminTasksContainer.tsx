import { ErrorState } from "../components/feedback/ErrorState";
import { LoadingState } from "../components/feedback/LoadingState";
import { TaskTable } from "../components/task/TaskTable";
import { useTasks } from "../hooks/useTasks";

export function AdminTasksContainer() {
  const tasksQuery = useTasks();

  if (tasksQuery.isLoading) {
    return <LoadingState message="Tasklar yükleniyor..." />;
  }

  if (tasksQuery.error) {
    return <ErrorState message="Tasklar alınamadı." />;
  }

  return (
    <section>
      <h2>Task Listesi</h2>
      <TaskTable tasks={tasksQuery.data ?? []} />
    </section>
  );
}
