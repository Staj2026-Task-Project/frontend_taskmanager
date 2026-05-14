import { useState } from "react";
import { UserCreateForm } from "../components/user/UserCreateForm";
import { UserTable } from "../components/user/UserTable";
import { useCreateUser, useUsers } from "../hooks/useUsers";
import type { UserCreateRequest } from "../types/user.types";

export function AdminUsersContainer() {
  const usersQuery = useUsers();
  const createUserMutation = useCreateUser();

  const initialFormData: UserCreateRequest = {
    username: "",
    password: "",
    role: "ROLE_USER",
  };

  const [formData, setFormData] = useState<UserCreateRequest>(initialFormData);

  function handleSubmit() {
    createUserMutation.mutate(formData, {
      onSuccess: () => {
        setFormData(initialFormData);
      },
    });
  }

  return (
    <section>
      <h2>Kullanıcı Yönetimi</h2>

      <UserCreateForm
        value={formData}
        isSubmitting={createUserMutation.isPending}
        onChange={setFormData}
        onSubmit={handleSubmit}
      />

      {usersQuery.isLoading && <p>Kullanıcılar yükleniyor...</p>}
      {usersQuery.error && <p>Kullanıcılar alınamadı.</p>}

      <UserTable users={usersQuery.data ?? []} />
    </section>
  );
}
