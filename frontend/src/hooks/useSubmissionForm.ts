import { useCallback, useMemo, useState } from "react";
import { ApiError } from "@/services/apiClient";
import { createSubmission } from "@/services/api/submissions";
import type { CreateSubmissionPayload, SubmissionType } from "@/types/api";
import {
  combine,
  email as emailV,
  maxLength,
  minLength,
  phone as phoneV,
  required,
} from "@/lib/validators";

export type SubmissionFormShape = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
};

export type SubmissionFormStatus =
  | "idle"
  | "sending"
  | "success"
  | "error";

interface UseSubmissionFormOptions {
  type: SubmissionType;
  /** Si projectType es relevante (cotización). */
  withProjectType?: boolean;
  /** Si el teléfono debe ser obligatorio (cotización suele requerirlo). */
  phoneRequired?: boolean;
  /** Datos extra a concatenar en el `message` antes de enviar (ej. lista de carrito). */
  messagePrefix?: string;
}

const EMPTY: SubmissionFormShape = {
  name: "",
  email: "",
  phone: "",
  projectType: "",
  message: "",
};

export const MAX_MESSAGE = 1000;

export function useSubmissionForm(options: UseSubmissionFormOptions) {
  const { type, withProjectType = false, phoneRequired = false, messagePrefix } =
    options;

  const [values, setValues] = useState<SubmissionFormShape>(EMPTY);
  const [touched, setTouched] = useState<Record<keyof SubmissionFormShape, boolean>>(
    {
      name: false,
      email: false,
      phone: false,
      projectType: false,
      message: false,
    }
  );
  const [status, setStatus] = useState<SubmissionFormStatus>("idle");
  const [submitError, setSubmitError] = useState<ApiError | null>(null);

  const validators = useMemo(
    () => ({
      name: combine(required("El nombre"), minLength(2, "El nombre"), maxLength(80, "El nombre")),
      email: combine(required("El correo"), emailV),
      phone: phoneRequired ? combine(required("El teléfono"), phoneV) : phoneV,
      projectType: withProjectType
        ? combine(required("El tipo de proyecto"), maxLength(120, "El tipo de proyecto"))
        : () => null,
      message: combine(
        required("El mensaje"),
        minLength(10, "El mensaje"),
        maxLength(MAX_MESSAGE, "El mensaje")
      ),
    }),
    [phoneRequired, withProjectType]
  );

  const errors = useMemo(() => {
    return {
      name: validators.name(values.name),
      email: validators.email(values.email),
      phone: validators.phone(values.phone),
      projectType: validators.projectType(values.projectType),
      message: validators.message(values.message),
    } satisfies Record<keyof SubmissionFormShape, string | null>;
  }, [validators, values]);

  const isValid = useMemo(
    () => Object.values(errors).every((e) => e === null),
    [errors]
  );

  const setField = useCallback(
    <K extends keyof SubmissionFormShape>(field: K, value: string) => {
      setValues((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleBlur = useCallback(
    (field: keyof SubmissionFormShape) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
    },
    []
  );

  const reset = useCallback(() => {
    setValues(EMPTY);
    setTouched({
      name: false,
      email: false,
      phone: false,
      projectType: false,
      message: false,
    });
    setStatus("idle");
    setSubmitError(null);
  }, []);

  const buildMailtoFallback = useCallback(
    (to: string) => {
      const subject = encodeURIComponent(
        type === "Cotización"
          ? `Solicitud de cotización — ${values.name || "sin nombre"}`
          : `Mensaje desde el sitio web — ${values.name || "sin nombre"}`
      );
      const lines = [
        `Nombre: ${values.name}`,
        `Correo: ${values.email}`,
        values.phone ? `Teléfono: ${values.phone}` : null,
        withProjectType && values.projectType
          ? `Tipo de proyecto: ${values.projectType}`
          : null,
        "",
        messagePrefix ? messagePrefix : null,
        values.message,
      ]
        .filter(Boolean)
        .join("\n");
      return `mailto:${to}?subject=${subject}&body=${encodeURIComponent(lines)}`;
    },
    [type, values, withProjectType, messagePrefix]
  );

  const submit = useCallback(async () => {
    // Marca todos los campos como tocados para revelar errores
    setTouched({
      name: true,
      email: true,
      phone: true,
      projectType: true,
      message: true,
    });
    if (!isValid) return false;

    setStatus("sending");
    setSubmitError(null);

    const composedMessage = messagePrefix
      ? `${messagePrefix}\n\n${values.message}`
      : values.message;

    const payload: CreateSubmissionPayload = {
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim() || undefined,
      message: composedMessage.trim(),
      type,
      projectType: withProjectType
        ? values.projectType.trim() || undefined
        : undefined,
    };

    try {
      await createSubmission(payload);
      setStatus("success");
      return true;
    } catch (err) {
      const apiErr =
        err instanceof ApiError
          ? err
          : new ApiError("network", "Error desconocido.", { cause: err });
      setSubmitError(apiErr);
      setStatus("error");
      return false;
    }
  }, [isValid, messagePrefix, type, values, withProjectType]);

  // Errores visibles: solo si el campo fue tocado o si ya intentamos enviar.
  const visibleErrors = useMemo(() => {
    const hasAttempted = status === "error" || status === "sending";
    return {
      name: touched.name || hasAttempted ? errors.name : null,
      email: touched.email || hasAttempted ? errors.email : null,
      phone: touched.phone || hasAttempted ? errors.phone : null,
      projectType:
        touched.projectType || hasAttempted ? errors.projectType : null,
      message: touched.message || hasAttempted ? errors.message : null,
    };
  }, [errors, touched, status]);

  return {
    values,
    setField,
    handleBlur,
    visibleErrors,
    isValid,
    status,
    submitError,
    submit,
    reset,
    buildMailtoFallback,
  };
}
