// Tipos compartidos entre frontend y los DTOs del backend NestJS.
// Si el backend cambia su esquema, ajusta aquí en un solo lugar.

export type Category = {
  id: string | number;
  name: string;
};

export type Product = {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  price: number;
  category: { name: string };
};

export type SubmissionType = "Contacto" | "Cotización";
export type SubmissionStatus = "NUEVO" | "LEIDO";

export type Submission = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  type: SubmissionType | string;
  status: SubmissionStatus | string;
  createdAt: string;
  projectType?: string;
};

export type SubmissionListResponse = {
  data: Submission[];
  total: number;
  page: number;
  limit: number;
};

export type SubmissionStats = {
  total: number;
  pending: number;
  newToday: number;
};

export type CreateSubmissionPayload = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  type: SubmissionType;
  projectType?: string;
};

export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
};
