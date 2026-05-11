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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Kullanıcı adı</label>
        <input
          id="username"
          value={formData.username}
          onChange={(event) =>
            setFormData((current) => ({
              ...current,
              username: event.target.value,
            }))
          }
        />
      </div>

      <div>
        <label htmlFor="password">Şifre</label>
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
        />
      </div>

      {errorMessage && <p>{errorMessage}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Giriş yapılıyor..." : "Giriş yap"}
      </button>
    </form>
  );
}
