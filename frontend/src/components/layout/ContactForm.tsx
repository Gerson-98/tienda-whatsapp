import { useState } from "react";
import { Loader2, CheckCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ContactInfo } from "@/components/layout/ContactInfo";

const PROJECT_TYPES = [
  { value: "residencial", label: "Residencial" },
  { value: "comercial", label: "Comercial / desarrollo" },
  { value: "otro", label: "Otro" },
];

const fieldClass =
  "rounded-md border border-input bg-background px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all w-full";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "residencial",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/submissions`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, type: "Contacto" }),
        }
      );
      if (!response.ok) throw new Error("Falló el envío");
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectType: "residencial",
        message: "",
      });
    } catch {
      const projectTypeLabel =
        PROJECT_TYPES.find((t) => t.value === formData.projectType)?.label ??
        formData.projectType;
      const body = encodeURIComponent(
        `Nombre: ${formData.name}\nEmail: ${formData.email}\nTel: ${formData.phone}\nTipo de proyecto: ${projectTypeLabel}\n\n${formData.message}`
      );
      window.location.href = `mailto:cotizaciones@ventpro.com?subject=Contacto%20VentPro&body=${body}`;
      setStatus("error");
    }
  };

  return (
    <section className="bg-muted/40 py-24 border-y border-border">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="lg:sticky lg:top-24 flex flex-col gap-10">
          <div>
            <h2 className="font-display font-black text-4xl md:text-5xl tracking-tighter">
              Hablemos de tu <span className="text-secondary">proyecto</span>
            </h2>
            <p className="text-muted-foreground mt-4 text-lg font-light">
              ¿Listo para transformar tu espacio? Escríbenos sin compromiso y
              te respondemos en menos de 24 horas con una propuesta a tu medida.
            </p>
          </div>

          <ContactInfo />
        </div>

        <div>
          {status === "success" ? (
            <div
              role="status"
              aria-live="polite"
              className="bg-card rounded-2xl border border-border p-10 text-center"
            >
              <CheckCircle className="h-14 w-14 text-green-500 mx-auto mb-3" />
              <h3 className="font-display font-bold text-xl">
                ¡Mensaje enviado!
              </h3>
              <p className="text-muted-foreground mt-2">
                Te responderemos pronto.
              </p>
              <Button
                variant="outline"
                className="mt-6 rounded-full"
                onClick={() => setStatus("idle")}
              >
                Enviar otro mensaje
              </Button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="grid gap-5 bg-card rounded-2xl border border-border p-6 md:p-8"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Nombre
                  </Label>
                  <Input
                    id="name"
                    placeholder="Tu nombre completo"
                    value={formData.name}
                    onChange={handleChange}
                    className={fieldClass}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Correo
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ejemplo@correo.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={fieldClass}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Teléfono (opcional)
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Tu número"
                  value={formData.phone}
                  onChange={handleChange}
                  className={fieldClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="projectType" className="text-sm font-medium">
                  Tipo de proyecto
                </Label>
                <Select
                  value={formData.projectType}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, projectType: value }))
                  }
                >
                  <SelectTrigger id="projectType" className={fieldClass}>
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROJECT_TYPES.map(({ value, label }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="message" className="text-sm font-medium">
                  Mensaje
                </Label>
                <Textarea
                  id="message"
                  placeholder="Cuéntanos sobre tu proyecto..."
                  value={formData.message}
                  onChange={handleChange}
                  className={`${fieldClass} min-h-[120px] resize-none`}
                  required
                />
              </div>
              <Button
                type="submit"
                className="h-12 text-base font-semibold rounded-xl w-full"
                disabled={status === "sending"}
              >
                {status === "sending" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Enviar mensaje
                  </>
                )}
              </Button>
              {status === "error" && (
                <p role="alert" className="text-destructive text-sm text-center">
                  Hubo un error. Abrimos tu cliente de correo como alternativa.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
