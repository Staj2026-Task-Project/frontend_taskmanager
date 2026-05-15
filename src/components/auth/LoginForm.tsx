import { useState } from "react";
import type { FormEvent } from "react";
import type { UserLoginRequest } from "../../types/auth.types";

interface LoginFormProps {
  isSubmitting: boolean;
  errorMessage: string | null;
  onSubmit: (value: UserLoginRequest) => void;
}

export function LoginForm({
  isSubmitting,
  errorMessage,
  onSubmit,
}: LoginFormProps) {
  const [formData, setFormData] = useState<UserLoginRequest>({
    username: "",
    password: "",
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(formData);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
          <p className="mt-2 text-sm text-gray-500">Devam etmek için giriş yapın</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Kullanıcı adı
            </label>
            <input
              id="username"
              type="text"
              value={formData.username}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  username: event.target.value,
                }))
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Kullanıcı adınızı girin"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Şifre
            </label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  password: event.target.value,
                }))
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Şifrenizi girin"
            />
          </div>

          {errorMessage && (
            <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4 text-sm text-red-700">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Giriş yapılıyor..." : "Giriş yap"}
          </button>
        </form>
      </div>
    </div>
  );
}