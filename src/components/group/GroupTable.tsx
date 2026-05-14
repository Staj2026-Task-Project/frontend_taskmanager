import type { GroupResponse } from "../../types/group.types";

interface GroupTableProps {
  groups: GroupResponse[];
}

export function GroupTable({ groups }: GroupTableProps) {
  if (!groups.length) {
    return <p>Grup bulunamadı.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Grup Adı</th>
          <th>Oluşturan</th>
          <th>Durum</th>
        </tr>
      </thead>

      <tbody>
        {groups.map((group) => (
          <tr key={group.id}>
            <td>{group.id}</td>
            <td>{group.name}</td>
            <td>{group.createdBy}</td>
            <td>{group.isActive ? "Aktif" : "Pasif"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
