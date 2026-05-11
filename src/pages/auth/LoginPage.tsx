import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth.api";
import type { UserLoginRequest } from "../../types/auth.types";
import { getCurrentUserRole, setAuthToken } from "../../services/auth.service";

export function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<UserLoginRequest>({
    username: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsLoading(true);
      setError(null);

      const response = await login(formData);
      setAuthToken(response.token);

      const role = getCurrentUserRole();

      if (role === "ROLE_ADMIN") {
        navigate("/admin");
        return;
      }

      if (role === "ROLE_USER") {
        navigate("/user/tasks");
        return;
      }

      setError("Token içinde kullanıcı rolü bulunamadı.");
    } catch {
      setError("Giriş başarısız. Kullanıcı adı veya şifre hatalı olabilir.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main>
      <h1>Task Manager Login</h1>

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

        {error && <p>{error}</p>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Giriş yapılıyor..." : "Giriş yap"}
        </button>
      </form>
    </main>
  );
}
