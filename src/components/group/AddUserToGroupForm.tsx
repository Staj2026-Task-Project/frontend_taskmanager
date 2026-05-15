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
    <div className="mx-auto w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-900/5">
      {/* Kart Başlık Alanı */}
      <div className="bg-gray-50 px-6 py-5 border-b border-gray-100 sm:px-8">
        <h2 className="text-xl font-bold text-gray-800 tracking-tight">Kullanıcıyı Gruba Ekle</h2>
        <p className="mt-1.5 text-sm text-gray-500">
          Sistemdeki mevcut bir kullanıcıyı yetkilendirmek için hedef bir gruba dahil edin.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="px-6 py-6 sm:px-8 sm:py-8 space-y-6">
        {/* Kullanıcı Seçimi Select */}
        <div>
          <label htmlFor="userId" className="mb-2 block text-sm font-semibold text-gray-700">
            Kullanıcı
          </label>
          <div className="relative">
            <select
              id="userId"
              value={value.userId ?? ""}
              onChange={(event) =>
                onChange({
                  ...value,
                  userId: Number(event.target.value),
                })
              }
              className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 pr-10 text-gray-900 transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/15 hover:border-gray-400"
            >
              <option value="" disabled>
                Kullanıcı seçiniz...
              </option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </select>
            {/* Custom Select Dropdown Arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Grup Seçimi Select */}
        <div>
          <label htmlFor="groupId" className="mb-2 block text-sm font-semibold text-gray-700">
            Hedef Grup
          </label>
          <div className="relative">
            <select
              id="groupId"
              value={value.groupId ?? ""}
              onChange={(event) =>
                onChange({
                  ...value,
                  groupId: Number(event.target.value),
                })
              }
              className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 pr-10 text-gray-900 transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/15 hover:border-gray-400"
            >
              <option value="" disabled>
                Grup seçiniz...
              </option>
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
             {/* Custom Select Dropdown Arrow */}
             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Aksiyon Butonu */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-bold tracking-wide text-white transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-600/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:bg-blue-400 active:scale-[0.98]"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Ekleniyor...</span>
              </div>
            ) : (
              <span>Gruba Ekle</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}