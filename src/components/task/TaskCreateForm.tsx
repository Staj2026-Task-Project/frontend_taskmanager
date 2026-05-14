import type {
  AssignmentRule,
  TaskCreateRequest,
  TaskPriority,
} from "../../types/task.types";

interface TaskCreateFormProps {
  value: TaskCreateRequest;
  showCreatedByInput: boolean;
  isSubmitting: boolean;
  onChange: (value: TaskCreateRequest) => void;
  onSubmit: () => void;
}

export function TaskCreateForm({
  value,
  showCreatedByInput,
  isSubmitting,
  onChange,
  onSubmit,
}: TaskCreateFormProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <input
        placeholder="Başlık"
        value={value.title}
        onChange={(event) =>
          onChange({
            ...value,
            title: event.target.value,
          })
        }
      />

      <textarea
        placeholder="Açıklama"
        value={value.description}
        onChange={(event) =>
          onChange({
            ...value,
            description: event.target.value,
          })
        }
      />

      <select
        value={value.priority}
        onChange={(event) =>
          onChange({
            ...value,
            priority: event.target.value as TaskPriority,
          })
        }
      >
        <option value="HIGH">Yüksek</option>
        <option value="MEDIUM">Orta</option>
        <option value="LOW">Düşük</option>
      </select>

      <select
        value={value.assignmentRule}
        onChange={(event) =>
          onChange({
            ...value,
            assignmentRule: event.target.value as AssignmentRule,
          })
        }
      >
        <option value="INDIVIDUAL">Kişiye atanır</option>
        <option value="GROUP_ANYONE">Gruptan bir kişi tamamlayabilir</option>
        <option value="GROUP_EVERYONE">Gruptaki herkes tamamlamalı</option>
      </select>

      <input
        type="datetime-local"
        value={value.dueDate}
        onChange={(event) =>
          onChange({
            ...value,
            dueDate: event.target.value,
          })
        }
      />

      {showCreatedByInput && (
        <input
          type="number"
          placeholder="Oluşturan admin ID"
          value={value.createdBy}
          onChange={(event) =>
            onChange({
              ...value,
              createdBy: Number(event.target.value),
            })
          }
        />
      )}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Oluşturuluyor..." : "Task oluştur"}
      </button>
    </form>
  );
}
