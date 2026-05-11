import { useState } from "react";
import { TaskCreateForm } from "../components/task/TaskCreateForm";
import { useCreateTask } from "../hooks/useTasks";
import { getCurrentUserId } from "../services/auth.service";
import type { TaskCreateRequest } from "../types/task.types";

export function TaskCreateContainer() {
  const createTaskMutation = useCreateTask();
  const currentUserId = getCurrentUserId();

  const initialFormData: TaskCreateRequest = {
    title: "",
    description: "",
    priority: "MEDIUM",
    assignmentRule: "INDIVIDUAL",
    dueDate: "",
    createdBy: currentUserId ?? 0,
  };

  const [formData, setFormData] = useState<TaskCreateRequest>(initialFormData);

  function handleSubmit() {
    const requestData: TaskCreateRequest = {
      ...formData,
      createdBy: currentUserId ?? formData.createdBy,
    };

    createTaskMutation.mutate(requestData, {
      onSuccess: () => {
        setFormData(initialFormData);
      },
    });
  }

  return (
    <section>
      <h2>Task Oluştur</h2>

      <TaskCreateForm
        value={formData}
        showCreatedByInput={!currentUserId}
        isSubmitting={createTaskMutation.isPending}
        onChange={setFormData}
        onSubmit={handleSubmit}
      />
    </section>
  );
}
