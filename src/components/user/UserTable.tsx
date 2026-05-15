import { USER_ROLE_LABELS } from "../../constants/enums";
import type { UserResponse } from "../../types/user.types";

interface UserTableProps {
  users: UserResponse[];
}

export function UserTable({ users }: UserTableProps) {
  // Veri bulunmadığı durum (Empty State)
  if (!users.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
        <svg
          className="mb-4 h-10 w-10 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        <h3 className="text-sm font-medium text-gray-900">Kullanıcı Bulunamadı</h3>
        <p className="mt-1 text-sm text-gray-500">
          Sistemde henüz kayıtlı bir kullanıcı yok.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-left text-sm text-gray-700">
          <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
            <tr>
              <th scope="col" className="px-6 py-4">
                ID
              </th>
              <th scope="col" className="px-6 py-4">
                Kullanıcı Adı
              </th>
              <th scope="col" className="px-6 py-4">
                Rol
              </th>
              <th scope="col" className="px-6 py-4">
                Durum
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {users.map((user) => (
              <tr
                key={user.id}
                className="transition-colors hover:bg-gray-50"
              >
                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  #{user.id}
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-semibold text-gray-800">
                  {user.username}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                    {USER_ROLE_LABELS[user.role]}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {user.isActive ? (
                    <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      Aktif
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                      Pasif
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}