import { USER_ROLE_LABELS } from "../../constants/enums";
import type { UserResponse } from "../../types/user.types";

interface UserTableProps {
  users: UserResponse[];
}

export function UserTable({ users }: UserTableProps) {
  if (!users.length) {
    return <p>Kullanıcı bulunamadı.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Kullanıcı Adı</th>
          <th>Rol</th>
          <th>Durum</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{USER_ROLE_LABELS[user.role]}</td>
            <td>{user.isActive ? "Aktif" : "Pasif"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
