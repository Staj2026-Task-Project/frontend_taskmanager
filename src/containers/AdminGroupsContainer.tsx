import { useState } from "react";
import { useAddUserToGroup, useCreateGroup, useGroups } from "../hooks/useGroups";
import { useUsers } from "../hooks/useUsers";
import type { GroupCreateRequest, UserGroupAddRequest } from "../types/group.types";

export function AdminGroupsContainer() {
  const groupsQuery = useGroups();
  const usersQuery = useUsers();

  const createGroupMutation = useCreateGroup();
  const addUserToGroupMutation = useAddUserToGroup();

  const [groupFormData, setGroupFormData] = useState<GroupCreateRequest>({
    name: "",
  });

  const [addUserFormData, setAddUserFormData] = useState<UserGroupAddRequest>({
    userId: 0,
    groupId: 0,
  });

  function handleCreateGroup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    createGroupMutation.mutate(groupFormData, {
      onSuccess: () => {
        setGroupFormData({ name: "" });
      },
    });
  }

  function handleAddUserToGroup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!addUserFormData.userId || !addUserFormData.groupId) {
      return;
    }

    addUserToGroupMutation.mutate(addUserFormData);
  }

  return (
    <section>
      <h2>Grup Yönetimi</h2>

      <form onSubmit={handleCreateGroup}>
        <input
          placeholder="Grup adı"
          value={groupFormData.name}
          onChange={(event) =>
            setGroupFormData({
              name: event.target.value,
            })
          }
        />

        <button type="submit" disabled={createGroupMutation.isPending}>
          {createGroupMutation.isPending ? "Oluşturuluyor..." : "Grup oluştur"}
        </button>
      </form>

      <hr />

      <h3>Kullanıcıyı Gruba Ekle</h3>

      <form onSubmit={handleAddUserToGroup}>
        <select
          value={addUserFormData.userId}
          onChange={(event) =>
            setAddUserFormData((current) => ({
              ...current,
              userId: Number(event.target.value),
            }))
          }
        >
          <option value={0}>Kullanıcı seç</option>
          {usersQuery.data?.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>

        <select
          value={addUserFormData.groupId}
          onChange={(event) =>
            setAddUserFormData((current) => ({
              ...current,
              groupId: Number(event.target.value),
            }))
          }
        >
          <option value={0}>Grup seç</option>
          {groupsQuery.data?.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>

        <button type="submit" disabled={addUserToGroupMutation.isPending}>
          {addUserToGroupMutation.isPending ? "Ekleniyor..." : "Gruba ekle"}
        </button>
      </form>

      {groupsQuery.isLoading && <p>Gruplar yükleniyor...</p>}
      {groupsQuery.error && <p>Gruplar alınamadı.</p>}

      <ul>
        {groupsQuery.data?.map((group) => (
          <li key={group.id}>
            #{group.id} - {group.name} - {group.isActive ? "Aktif" : "Pasif"}
          </li>
        ))}
      </ul>
    </section>
  );
}
