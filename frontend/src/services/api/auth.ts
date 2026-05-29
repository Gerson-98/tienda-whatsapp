import { api } from "@/services/apiClient";
import type { LoginPayload, LoginResponse } from "@/types/api";

export function login(payload: LoginPayload): Promise<LoginResponse> {
  return api.post<LoginResponse>("/auth/login", payload);
}
