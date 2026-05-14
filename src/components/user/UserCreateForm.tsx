import type { FormEvent } from "react";
import type { UserCreateRequest, UserRole } from "../../types/user.types";

interface UserCreateFormProps {
  value: UserCreateRequest;
  isSubmitting: boolean;
  onChange: (value: UserCreateRequest) => void;
  onSubmit: () => void;
}

export function UserCreateForm({
  value,
  isSubmitting,
  onChange,
  onSubmit,
}: UserCreateFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Kullanıcı adı"
        value={value.username}
        onChange={(event) =>
          onChange({
            ...value,
            username: event.target.value,
          })
        }
      />

      <input
        placeholder="Şifre"
        type="password"
        value={value.password}
        onChange={(event) =>
          onChange({
            ...value,
            password: event.target.value,
          })
        }
      />

      <select
        value={value.role}
        onChange={(event) =>
          onChange({
            ...value,
            role: event.target.value as UserRole,
          })
        }
      >
        <option value="ROLE_USER">Kullanıcı</option>
        <option value="ROLE_ADMIN">Admin</option>
      </select>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Oluşturuluyor..." : "Kullanıcı oluştur"}
      </button>
    </form>
  );
}
