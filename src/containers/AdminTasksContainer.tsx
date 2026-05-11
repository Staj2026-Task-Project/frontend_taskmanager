import { TaskTable } from "../components/task/TaskTable";
import { useTasks } from "../hooks/useTasks";

export function AdminTasksContainer() {
  const tasksQuery = useTasks();

  if (tasksQuery.isLoading) {
    return <p>Tasklar yükleniyor...</p>;
  }

  if (tasksQuery.error) {
    return <p>Tasklar alınamadı.</p>;
  }

  return (
    <section>
      <h2>Task Listesi</h2>
      <TaskTable tasks={tasksQuery.data ?? []} />
    </section>
  );
}
