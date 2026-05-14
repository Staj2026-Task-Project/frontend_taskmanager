import { useNavigate } from "react-router-dom";
import {
  clearAuthToken,
  getAuthToken,
  getCurrentUserId,
  getCurrentUserPayload,
  getCurrentUserRole,
  isAuthenticated,
} from "../services/auth.service";

export function useAuth() {
  const navigate = useNavigate();

  function logout() {
    clearAuthToken();
    navigate("/login", { replace: true });
  }

  return {
    token: getAuthToken(),
    payload: getCurrentUserPayload(),
    userId: getCurrentUserId(),
    role: getCurrentUserRole(),
    isAuthenticated: isAuthenticated(),
    logout,
  };
}
