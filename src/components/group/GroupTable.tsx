import type { GroupResponse } from "../../types/group.types";

interface GroupTableProps {
  groups: GroupResponse[];
}

export function GroupTable({ groups }: GroupTableProps) {
  // Veri olmadığı durumdaki tasarım (Empty State)
  if (!groups.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-12 text-center shadow-sm">
        <svg
          className="mb-4 h-12 w-12 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <h3 className="text-lg font-medium text-gray-900">Grup bulunamadı</h3>
        <p className="mt-1 text-sm text-gray-500">
          Sistemde henüz oluşturulmuş bir grup kaydı bulunmuyor.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-left">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500"
              >
                ID
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500"
              >
                Grup Adı
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500"
              >
                Oluşturan
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500"
              >
                Durum
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {groups.map((group) => (
              <tr
                key={group.id}
                className="transition-colors hover:bg-blue-50/30"
              >
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-400">
                  #{group.id}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-gray-800">
                  {group.name}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-[10px] font-bold text-gray-500">
                      {group.createdBy.charAt(0).toUpperCase()}
                    </div>
                    {group.createdBy}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  {group.isActive ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700 ring-1 ring-inset ring-green-600/20">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                      Aktif
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700 ring-1 ring-inset ring-red-600/20">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
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