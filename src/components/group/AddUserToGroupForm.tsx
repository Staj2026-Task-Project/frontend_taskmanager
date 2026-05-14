import type { FormEvent } from "react";
import type { GroupResponse, UserGroupAddRequest } from "../../types/group.types";
import type { UserResponse } from "../../types/user.types";

interface AddUserToGroupFormProps {
  value: UserGroupAddRequest;
  users: UserResponse[];
  groups: GroupResponse[];
  isSubmitting: boolean;
  onChange: (value: UserGroupAddRequest) => void;
  onSubmit: () => void;
}

export function AddUserToGroupForm({
  value,
  users,
  groups,
  isSubmitting,
  onChange,
  onSubmit,
}: AddUserToGroupFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit}>
      <select
        value={value.userId}
        onChange={(event) =>
          onChange({
            ...value,
            userId: Number(event.target.value),
          })
        }
      >
        <option value={0}>Kullanıcı seç</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.username}
          </option>
        ))}
      </select>

      <select
        value={value.groupId}
        onChange={(event) =>
          onChange({
            ...value,
            groupId: Number(event.target.value),
          })
        }
      >
        <option value={0}>Grup seç</option>
        {groups.map((group) => (
          <option key={group.id} value={group.id}>
            {group.name}
          </option>
        ))}
      </select>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Ekleniyor..." : "Gruba ekle"}
      </button>
    </form>
  );
}
