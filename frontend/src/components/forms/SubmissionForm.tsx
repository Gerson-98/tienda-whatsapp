import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Loader2, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useSubmissionForm,
  type SubmissionFormShape,
  MAX_MESSAGE,
} from "@/hooks/useSubmissionForm";
import type { SubmissionType } from "@/types/api";

interface SubmissionFormProps {
  type: SubmissionType;
  /** Muestra y exige el campo "Tipo de proyecto" (cotizaciones). */
  withProjectType?: boolean;
  phoneRequired?: boolean;
  submitLabel?: string;
  successTitle?: string;
  successMessage?: string;
  /** Email para el fallback `mailto:` si el backend no responde. */
  fallbackEmail?: string;
  /** Contenido extra que se prepondrá al mensaje (ej. resumen de carrito). */
  messagePrefix?: string;
  /** Slot opcional para renderizar contenido sobre el formulario (ej. lista). */
  beforeFields?: React.ReactNode;
  /** Se ejecuta una sola vez cuando el envío es exitoso. */
  onSuccess?: () => void;
  className?: string;
}

const DEFAULT_FALLBACK_EMAIL = "cotizaciones@ventpro.com";

const FieldError = ({ id, message }: { id: string; message: string | null }) =>
  message ? (
    <p id={id} role="alert" className="text-xs text-red-600 mt-1">
      {message}
    </p>
  ) : null;

export const SubmissionForm = ({
  type,
  withProjectType = false,
  phoneRequired = false,
  submitLabel,
  successTitle,
  successMessage,
  fallbackEmail = DEFAULT_FALLBACK_EMAIL,
  messagePrefix,
  beforeFields,
  onSuccess,
  className,
}: SubmissionFormProps) => {
  const {
    values,
    setField,
    handleBlur,
    visibleErrors,
    status,
    submitError,
    submit,
    reset,
    buildMailtoFallback,
  } = useSubmissionForm({
    type,
    withProjectType,
    phoneRequired,
    messagePrefix,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit();
  };

  const onSuccessRef = useRef(onSuccess);
  useEffect(() => {
    onSuccessRef.current = onSuccess;
  }, [onSuccess]);
  useEffect(() => {
    if (status === "success") onSuccessRef.current?.();
  }, [status]);

  const handleChange =
    (field: keyof SubmissionFormShape) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setField(field, e.target.value);

  if (status === "success") {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center text-center py-10",
          className
        )}
      >
        <CheckCircle className="h-14 w-14 text-green-500 mb-4" aria-hidden />
        <h3 className="text-2xl font-bold">
          {successTitle ?? "¡Mensaje enviado!"}
        </h3>
        <p className="text-muted-foreground mt-2 max-w-md">
          {successMessage ??
            "Gracias por contactarnos. Te responderemos lo antes posible."}
        </p>
        <Button variant="outline" className="mt-6" onClick={reset}>
          Enviar otro mensaje
        </Button>
      </div>
    );
  }

  const isSending = status === "sending";
  const isBackendDown =
    status === "error" &&
    (submitError?.kind === "network" || submitError?.kind === "timeout");

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn("space-y-5", className)}
    >
      {beforeFields}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <Label htmlFor="sf-name">Nombre completo</Label>
          <Input
            id="sf-name"
            autoComplete="name"
            placeholder="Tu nombre"
            value={values.name}
            onChange={handleChange("name")}
            onBlur={() => handleBlur("name")}
            aria-invalid={!!visibleErrors.name}
            aria-describedby={visibleErrors.name ? "sf-name-err" : undefined}
            disabled={isSending}
            required
          />
          <FieldError id="sf-name-err" message={visibleErrors.name} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="sf-email">Correo electrónico</Label>
          <Input
            id="sf-email"
            type="email"
            autoComplete="email"
            placeholder="tu@correo.com"
            value={values.email}
            onChange={handleChange("email")}
            onBlur={() => handleBlur("email")}
            aria-invalid={!!visibleErrors.email}
            aria-describedby={visibleErrors.email ? "sf-email-err" : undefined}
            disabled={isSending}
            required
          />
          <FieldError id="sf-email-err" message={visibleErrors.email} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="sf-phone">
          Teléfono{phoneRequired ? "" : " (opcional)"}
        </Label>
        <Input
          id="sf-phone"
          type="tel"
          autoComplete="tel"
          placeholder="(+502) 1234-5678"
          value={values.phone}
          onChange={handleChange("phone")}
          onBlur={() => handleBlur("phone")}
          aria-invalid={!!visibleErrors.phone}
          aria-describedby={visibleErrors.phone ? "sf-phone-err" : undefined}
          disabled={isSending}
        />
        <FieldError id="sf-phone-err" message={visibleErrors.phone} />
      </div>

      {withProjectType && (
        <div className="space-y-1.5">
          <Label htmlFor="sf-projectType">Tipo de proyecto</Label>
          <Input
            id="sf-projectType"
            placeholder="Ej: Casa particular, Edificio, Renovación…"
            value={values.projectType}
            onChange={handleChange("projectType")}
            onBlur={() => handleBlur("projectType")}
            aria-invalid={!!visibleErrors.projectType}
            aria-describedby={
              visibleErrors.projectType ? "sf-projectType-err" : undefined
            }
            disabled={isSending}
            required
          />
          <FieldError
            id="sf-projectType-err"
            message={visibleErrors.projectType}
          />
        </div>
      )}

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="sf-message">Mensaje</Label>
          <span
            className={cn(
              "text-xs tabular-nums",
              values.message.length > MAX_MESSAGE
                ? "text-red-600"
                : "text-muted-foreground"
            )}
            aria-live="polite"
          >
            {values.message.length}/{MAX_MESSAGE}
          </span>
        </div>
        <Textarea
          id="sf-message"
          placeholder={
            type === "Cotización"
              ? "Cuéntanos sobre tu proyecto: cantidad de ventanas, medidas, estilo…"
              : "¿En qué podemos ayudarte?"
          }
          rows={type === "Cotización" ? 6 : 4}
          value={values.message}
          onChange={handleChange("message")}
          onBlur={() => handleBlur("message")}
          aria-invalid={!!visibleErrors.message}
          aria-describedby={visibleErrors.message ? "sf-message-err" : undefined}
          disabled={isSending}
          required
        />
        <FieldError id="sf-message-err" message={visibleErrors.message} />
      </div>

      {status === "error" && submitError && (
        <div
          role="alert"
          className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm"
        >
          <p className="font-medium text-destructive">
            {isBackendDown
              ? "No pudimos enviar tu mensaje en este momento."
              : "Hubo un problema al enviar tu mensaje."}
          </p>
          <p className="text-destructive/80 mt-1">{submitError.userMessage}</p>
          {isBackendDown && (
            <div className="mt-3 flex flex-wrap gap-2">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => submit()}
              >
                Reintentar envío
              </Button>
              <Button type="button" size="sm" variant="secondary" asChild>
                <a href={buildMailtoFallback(fallbackEmail)}>
                  <Mail className="mr-1.5 h-3.5 w-3.5" />
                  Enviar por correo
                </a>
              </Button>
            </div>
          )}
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSending}
      >
        {isSending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enviando…
          </>
        ) : (
          submitLabel ??
          (type === "Cotización" ? "Enviar solicitud" : "Enviar mensaje")
        )}
      </Button>
    </form>
  );
};
