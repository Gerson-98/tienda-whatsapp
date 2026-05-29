// Validadores puros, sin dependencias. Devuelven `null` si el valor es válido
// o un string con el mensaje de error si no lo es. Mantenerlos pequeños y
// declarativos para que sean fáciles de componer.

export type FieldValidator = (value: string) => string | null;

export const required =
  (label = "Este campo"): FieldValidator =>
  (v) =>
    v.trim().length === 0 ? `${label} es obligatorio.` : null;

export const minLength =
  (min: number, label = "Este campo"): FieldValidator =>
  (v) =>
    v.trim().length < min
      ? `${label} debe tener al menos ${min} caracteres.`
      : null;

export const maxLength =
  (max: number, label = "Este campo"): FieldValidator =>
  (v) =>
    v.length > max
      ? `${label} no puede exceder ${max} caracteres.`
      : null;

// RFC-lite: suficiente para feedback inmediato; el backend valida la fuente de verdad.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const email: FieldValidator = (v) =>
  EMAIL_RE.test(v.trim()) ? null : "Ingresa un correo electrónico válido.";

// Acepta dígitos, espacios, paréntesis, guiones y un + inicial. 7-15 dígitos.
const PHONE_DIGITS_RE = /^\+?[\d\s()-]{7,20}$/;
export const phone: FieldValidator = (v) => {
  const trimmed = v.trim();
  if (!trimmed) return null; // teléfono opcional
  if (!PHONE_DIGITS_RE.test(trimmed))
    return "Ingresa un teléfono válido (solo dígitos, espacios, +, - o paréntesis).";
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length < 7) return "El teléfono parece muy corto.";
  if (digits.length > 15) return "El teléfono parece muy largo.";
  return null;
};

export function combine(...validators: FieldValidator[]): FieldValidator {
  return (value) => {
    for (const v of validators) {
      const err = v(value);
      if (err) return err;
    }
    return null;
  };
}
