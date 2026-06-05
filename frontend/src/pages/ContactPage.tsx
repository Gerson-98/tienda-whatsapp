// frontend/src/pages/ContactPage.tsx

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Loader2, CheckCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const fieldClass =
  "rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all w-full";

const InfoItem = ({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: React.ReactNode;
  href?: string;
}) => {
  const content = (
    <div className="flex gap-4 items-start mb-6">
      <div className="bg-primary/10 rounded-xl p-3 text-primary shrink-0">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
        <div className="font-medium mt-0.5">{value}</div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block hover:opacity-80 transition">
      {content}
    </a>
  ) : (
    content
  );
};

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error(error);
      const body = encodeURIComponent(
        `Nombre: ${formData.name}\nEmail: ${formData.email}\nTel: ${formData.phone}\n\n${formData.message}`
      );
      window.location.href = `mailto:cotizaciones@ventpro.com?subject=Contacto%20VentPro&body=${body}`;
      setStatus("error");
    }
  };

  return (
    <main className="-mt-20">
      {/* HERO */}
      <div
        className="relative h-[45vh] bg-cover bg-center flex items-center justify-center text-center"
        style={{ backgroundImage: "url('/images/hero/contact-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 text-white container pt-16">
          <h1 className="font-display font-black text-5xl md:text-6xl tracking-tighter">
            Hablemos
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-white/85 text-lg font-light">
            Respondemos tus preguntas y te ayudamos a iniciar tu próximo proyecto.
          </p>
        </div>
      </div>

      <div className="container mx-auto py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* FORM */}
          <div>
            <h2 className="font-display font-bold text-3xl mb-2">
              Envíanos un mensaje
            </h2>
            <p className="text-muted-foreground mb-8">
              Te responderemos en menos de 24 horas hábiles.
            </p>

            {status === "success" ? (
              <div className="bg-card rounded-2xl border border-border p-10 text-center">
                <CheckCircle className="h-14 w-14 text-green-500 mx-auto mb-3" />
                <h3 className="font-display font-bold text-2xl">
                  ¡Mensaje enviado!
                </h3>
                <p className="text-muted-foreground mt-2">
                  Gracias por contactarnos. Te responderemos pronto.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Nombre
                    </Label>
                    <Input
                      id="name"
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
                    value={formData.phone}
                    onChange={handleChange}
                    className={fieldClass}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="message" className="text-sm font-medium">
                    Mensaje
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`${fieldClass} min-h-[140px] resize-none`}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold rounded-xl"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Enviar mensaje
                    </>
                  )}
                </Button>
                {status === "error" && (
                  <p className="text-sm text-center text-destructive">
                    Hubo un error. Abrimos tu cliente de correo como alternativa.
                  </p>
                )}
              </form>
            )}
          </div>

          {/* INFO */}
          <div>
            <h2 className="font-display font-bold text-xl mb-6">
              Información de contacto
            </h2>
            <InfoItem
              icon={Phone}
              label="Teléfono"
              value="(+502) 4191-6647"
              href="tel:+50241916647"
            />
            <InfoItem
              icon={Mail}
              label="Correo"
              value="cotizaciones@ventpro.com"
              href="mailto:cotizaciones@ventpro.com"
            />
            <InfoItem
              icon={MapPin}
              label="Dirección"
              value={
                <>
                  Avenida Las Américas 12-34, Zona 14
                  <br />
                  Ciudad de Guatemala
                </>
              }
            />
            <InfoItem
              icon={Clock}
              label="Horario"
              value={
                <>
                  Lun – Vie · 8:00 – 18:00
                  <br />
                  Sáb · 9:00 – 13:00
                </>
              }
            />

            <div className="rounded-2xl overflow-hidden border border-border mt-6 h-48 md:h-64">
              <iframe
                title="Ubicación VentPro"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6880.597763663834!2d-90.52171027789107!3d14.564572138762381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8589a6ab21508c17%3A0x83eafff435a548b6!2sProtecci%C3%B3n%20Total!5e0!3m2!1ses!2sgt!4v1761241191702!5m2!1ses!2sgt"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
