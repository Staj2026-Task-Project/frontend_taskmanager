import { useState } from "react";
import { useCreateUser, useUsers } from "../hooks/useUsers";
import type { UserCreateRequest, UserRole } from "../types/user.types";
import { USER_ROLE_LABELS } from "../constants/enums";

export function AdminUsersContainer() {
  const usersQuery = useUsers();
  const createUserMutation = useCreateUser();

  const [formData, setFormData] = useState<UserCreateRequest>({
    username: "",
    password: "",
    role: "ROLE_USER",
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    createUserMutation.mutate(formData, {
      onSuccess: () => {
        setFormData({
          username: "",
          password: "",
          role: "ROLE_USER",
        });
      },
    });
  }

  return (
    <section>
      <h2>Kullanıcı Yönetimi</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Kullanıcı adı"
          value={formData.username}
          onChange={(event) =>
            setFormData((current) => ({
              ...current,
              username: event.target.value,
            }))
          }
        />

        <input
          placeholder="Şifre"
          type="password"
          value={formData.password}
          onChange={(event) =>
            setFormData((current) => ({
              ...current,
              password: event.target.value,
            }))
          }
        />

        <select
          value={formData.role}
          onChange={(event) =>
            setFormData((current) => ({
              ...current,
              role: event.target.value as UserRole,
            }))
          }
        >
          <option value="ROLE_USER">Kullanıcı</option>
          <option value="ROLE_ADMIN">Admin</option>
        </select>

        <button type="submit" disabled={createUserMutation.isPending}>
          {createUserMutation.isPending ? "Oluşturuluyor..." : "Kullanıcı oluştur"}
        </button>
      </form>

      {usersQuery.isLoading && <p>Kullanıcılar yükleniyor...</p>}
      {usersQuery.error && <p>Kullanıcılar alınamadı.</p>}

      <ul>
        {usersQuery.data?.map((user) => (
          <li key={user.id}>
            #{user.id} - {user.username} - {USER_ROLE_LABELS[user.role]} -{" "}
            {user.isActive ? "Aktif" : "Pasif"}
          </li>
        ))}
      </ul>
    </section>
  );
}
