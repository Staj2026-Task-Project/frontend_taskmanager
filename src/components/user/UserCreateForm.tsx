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
    <div className="mx-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl sm:p-8">
      {/* Form Başlık Alanı */}
      <div className="mb-6 border-b border-gray-100 pb-4">
        <h2 className="text-xl font-bold text-gray-800">Yeni Kullanıcı Oluştur</h2>
        <p className="mt-1 text-sm text-gray-500">
          Sisteme yeni bir kullanıcı veya yönetici ekleyin.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Kullanıcı Adı Input */}
        <div>
          <label
            htmlFor="username"
            className="mb-1.5 block text-sm font-semibold text-gray-700"
          >
            Kullanıcı Adı
          </label>
          <input
            id="username"
            type="text"
            placeholder="Kullanıcı adını girin"
            value={value.username}
            onChange={(event) =>
              onChange({
                ...value,
                username: event.target.value,
              })
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Şifre Input */}
        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-sm font-semibold text-gray-700"
          >
            Şifre
          </label>
          <input
            id="password"
            type="password"
            placeholder="Şifre belirleyin"
            value={value.password}
            onChange={(event) =>
              onChange({
                ...value,
                password: event.target.value,
              })
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Rol Seçimi */}
        <div>
          <label
            htmlFor="role"
            className="mb-1.5 block text-sm font-semibold text-gray-700"
          >
            Kullanıcı Rolü
          </label>
          <select
            id="role"
            value={value.role}
            onChange={(event) =>
              onChange({
                ...value,
                role: event.target.value as UserRole,
              })
            }
            className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="USER">Kullanıcı</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        {/* Buton Alanı */}
        <div className="mt-8 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="mr-2 h-4 w-4 animate-spin text-white"
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
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Oluşturuluyor...
              </>
            ) : (
              "Kullanıcı oluştur"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}