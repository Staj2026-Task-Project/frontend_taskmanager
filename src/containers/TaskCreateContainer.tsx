import { useState } from "react";
import { useCreateTask } from "../hooks/useTasks";
import type {
  AssignmentRule,
  TaskCreateRequest,
  TaskPriority,
} from "../types/task.types";
import { getCurrentUserId } from "../services/auth.service";

export function TaskCreateContainer() {
  const createTaskMutation = useCreateTask();
  const currentUserId = getCurrentUserId();

  const [formData, setFormData] = useState<TaskCreateRequest>({
    title: "",
    description: "",
    priority: "MEDIUM",
    assignmentRule: "INDIVIDUAL",
    dueDate: "",
    createdBy: currentUserId ?? 0,
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const requestData: TaskCreateRequest = {
      ...formData,
      createdBy: currentUserId ?? formData.createdBy,
    };

    createTaskMutation.mutate(requestData, {
      onSuccess: () => {
        setFormData({
          title: "",
          description: "",
          priority: "MEDIUM",
          assignmentRule: "INDIVIDUAL",
          dueDate: "",
          createdBy: currentUserId ?? 0,
        });
      },
    });
  }

  return (
    <section>
      <h2>Task Oluştur</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Başlık"
          value={formData.title}
          onChange={(event) =>
            setFormData((current) => ({
              ...current,
              title: event.target.value,
            }))
          }
        />

        <textarea
          placeholder="Açıklama"
          value={formData.description}
          onChange={(event) =>
            setFormData((current) => ({
              ...current,
              description: event.target.value,
            }))
          }
        />

        <select
          value={formData.priority}
          onChange={(event) =>
            setFormData((current) => ({
              ...current,
              priority: event.target.value as TaskPriority,
            }))
          }
        >
          <option value="HIGH">Yüksek</option>
          <option value="MEDIUM">Orta</option>
          <option value="LOW">Düşük</option>
        </select>

        <select
          value={formData.assignmentRule}
          onChange={(event) =>
            setFormData((current) => ({
              ...current,
              assignmentRule: event.target.value as AssignmentRule,
            }))
          }
        >
          <option value="INDIVIDUAL">Kişiye atanır</option>
          <option value="GROUP_ANYONE">Gruptan bir kişi tamamlayabilir</option>
          <option value="GROUP_EVERYONE">Gruptaki herkes tamamlamalı</option>
        </select>

        <input
          type="datetime-local"
          value={formData.dueDate}
          onChange={(event) =>
            setFormData((current) => ({
              ...current,
              dueDate: event.target.value,
            }))
          }
        />

        {!currentUserId && (
          <input
            type="number"
            placeholder="Oluşturan admin ID"
            value={formData.createdBy}
            onChange={(event) =>
              setFormData((current) => ({
                ...current,
                createdBy: Number(event.target.value),
              }))
            }
          />
        )}

        <button type="submit" disabled={createTaskMutation.isPending}>
          {createTaskMutation.isPending ? "Oluşturuluyor..." : "Task oluştur"}
        </button>
      </form>
    </section>
  );
}
