import { api } from "@/services/apiClient";
import type {
  CreateSubmissionPayload,
  Submission,
  SubmissionListResponse,
  SubmissionStats,
} from "@/types/api";

export function createSubmission(
  payload: CreateSubmissionPayload
): Promise<Submission> {
  return api.post<Submission>("/submissions", payload);
}

export type ListSubmissionsParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  type?: string;
  signal?: AbortSignal;
};

export function listSubmissions(
  params: ListSubmissionsParams = {}
): Promise<SubmissionListResponse> {
  const { signal, ...rest } = params;
  return api.get<SubmissionListResponse>("/submissions", {
    auth: true,
    signal,
    query: rest,
  });
}

export function fetchSubmissionStats(
  signal?: AbortSignal
): Promise<SubmissionStats> {
  return api.get<SubmissionStats>("/submissions/stats", {
    auth: true,
    signal,
  });
}

export function markSubmissionStatus(
  id: string,
  status: "NUEVO" | "LEIDO"
): Promise<Submission> {
  return api.patch<Submission>(`/submissions/${id}/status`, { status }, {
    auth: true,
  });
}
