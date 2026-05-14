import type { FormEvent } from "react";
import type { GroupCreateRequest } from "../../types/group.types";

interface GroupCreateFormProps {
  value: GroupCreateRequest;
  isSubmitting: boolean;
  onChange: (value: GroupCreateRequest) => void;
  onSubmit: () => void;
}

export function GroupCreateForm({
  value,
  isSubmitting,
  onChange,
  onSubmit,
}: GroupCreateFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Grup adı"
        value={value.name}
        onChange={(event) =>
          onChange({
            name: event.target.value,
          })
        }
      />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Oluşturuluyor..." : "Grup oluştur"}
      </button>
    </form>
  );
}
