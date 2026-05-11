import { useState } from "react";
import { AddUserToGroupForm } from "../components/group/AddUserToGroupForm";
import { GroupCreateForm } from "../components/group/GroupCreateForm";
import { GroupTable } from "../components/group/GroupTable";
import { useAddUserToGroup, useCreateGroup, useGroups } from "../hooks/useGroups";
import { useUsers } from "../hooks/useUsers";
import type { GroupCreateRequest, UserGroupAddRequest } from "../types/group.types";

export function AdminGroupsContainer() {
  const groupsQuery = useGroups();
  const usersQuery = useUsers();

  const createGroupMutation = useCreateGroup();
  const addUserToGroupMutation = useAddUserToGroup();

  const initialGroupFormData: GroupCreateRequest = {
    name: "",
  };

  const initialAddUserFormData: UserGroupAddRequest = {
    userId: 0,
    groupId: 0,
  };

  const [groupFormData, setGroupFormData] =
    useState<GroupCreateRequest>(initialGroupFormData);

  const [addUserFormData, setAddUserFormData] =
    useState<UserGroupAddRequest>(initialAddUserFormData);

  function handleCreateGroup() {
    createGroupMutation.mutate(groupFormData, {
      onSuccess: () => {
        setGroupFormData(initialGroupFormData);
      },
    });
  }

  function handleAddUserToGroup() {
    if (!addUserFormData.userId || !addUserFormData.groupId) {
      return;
    }

    addUserToGroupMutation.mutate(addUserFormData, {
      onSuccess: () => {
        setAddUserFormData(initialAddUserFormData);
      },
    });
  }

  return (
    <section>
      <h2>Grup Yönetimi</h2>

      <GroupCreateForm
        value={groupFormData}
        isSubmitting={createGroupMutation.isPending}
        onChange={setGroupFormData}
        onSubmit={handleCreateGroup}
      />

      <hr />

      <h3>Kullanıcıyı Gruba Ekle</h3>

      <AddUserToGroupForm
        value={addUserFormData}
        users={usersQuery.data ?? []}
        groups={groupsQuery.data ?? []}
        isSubmitting={addUserToGroupMutation.isPending}
        onChange={setAddUserFormData}
        onSubmit={handleAddUserToGroup}
      />

      {groupsQuery.isLoading && <p>Gruplar yükleniyor...</p>}
      {groupsQuery.error && <p>Gruplar alınamadı.</p>}

      <GroupTable groups={groupsQuery.data ?? []} />
    </section>
  );
}
