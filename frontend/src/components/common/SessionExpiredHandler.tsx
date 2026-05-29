import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { onSessionExpired } from "@/services/apiClient";

/**
 * Escucha eventos de sesión expirada emitidos por el apiClient cuando
 * cualquier petición devuelve 401/403, y redirige al login con un toast.
 */
export const SessionExpiredHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    return onSessionExpired(() => {
      toast.error("Tu sesión expiró. Por favor, inicia sesión de nuevo.");
      navigate("/admin/login", { replace: true });
    });
  }, [navigate]);

  return null;
};
