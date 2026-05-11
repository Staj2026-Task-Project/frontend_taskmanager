import { useTasks } from "../hooks/useTasks";
import {
  ASSIGNMENT_RULE_LABELS,
  TASK_PRIORITY_LABELS,
  TASK_STATUS_LABELS,
} from "../constants/enums";
import { formatDateTime } from "../utils/date";

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

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Başlık</th>
            <th>Öncelik</th>
            <th>Atama Kuralı</th>
            <th>Durum</th>
            <th>Bitiş Tarihi</th>
          </tr>
        </thead>

        <tbody>
          {tasksQuery.data?.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{TASK_PRIORITY_LABELS[task.priority]}</td>
              <td>{ASSIGNMENT_RULE_LABELS[task.assignmentRule]}</td>
              <td>{TASK_STATUS_LABELS[task.status]}</td>
              <td>{formatDateTime(task.dueDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
