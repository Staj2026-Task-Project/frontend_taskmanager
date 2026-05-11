import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth.api";
import { LoginForm } from "../../components/auth/LoginForm";
import { ROUTES } from "../../constants/routes";
import type { UserLoginRequest } from "../../types/auth.types";
import { getCurrentUserRole, setAuthToken } from "../../services/auth.service";

export function LoginPage() {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(formData: UserLoginRequest) {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      const response = await login(formData);
      setAuthToken(response.token);

      const role = getCurrentUserRole();

      if (role === "ROLE_ADMIN") {
        navigate(ROUTES.adminHome);
        return;
      }

      if (role === "ROLE_USER") {
        navigate(ROUTES.userTasks);
        return;
      }

      setErrorMessage("Token içinde kullanıcı rolü bulunamadı.");
    } catch {
      setErrorMessage("Giriş başarısız. Kullanıcı adı veya şifre hatalı olabilir.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main>
      <h1>Task Manager Login</h1>

      <LoginForm
        isSubmitting={isLoading}
        errorMessage={errorMessage}
        onSubmit={handleLogin}
      />
    </main>
  );
}
