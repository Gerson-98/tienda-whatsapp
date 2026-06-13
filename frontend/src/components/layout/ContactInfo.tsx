import { Phone, Mail, MapPin, Clock } from "lucide-react";
import type { ReactNode } from "react";

const ITEMS: {
  icon: typeof Phone;
  label: string;
  value: ReactNode;
  href?: string;
}[] = [
  {
    icon: Phone,
    label: "Teléfono",
    value: "(+502) 4191-6647",
    href: "tel:+50241916647",
  },
  {
    icon: Mail,
    label: "Correo",
    value: "cotizaciones@ventpro.com",
    href: "mailto:cotizaciones@ventpro.com",
  },
  {
    icon: MapPin,
    label: "Dirección",
    value: (
      <>
        Avenida Las Américas 12-34, Zona 14
        <br />
        Ciudad de Guatemala
      </>
    ),
  },
  {
    icon: Clock,
    label: "Horario",
    value: (
      <>
        Lun – Vie · 8:00 – 18:00
        <br />
        Sáb · 9:00 – 13:00
      </>
    ),
  },
];

export const ContactInfo = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-5">
        {ITEMS.map(({ icon: Icon, label, value, href }) => {
          const row = (
            <div className="flex gap-4 items-start">
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
            <a key={label} href={href} className="block hover:opacity-80 transition">
              {row}
            </a>
          ) : (
            <div key={label}>{row}</div>
          );
        })}
      </div>

      <div className="w-full h-56 rounded-2xl overflow-hidden border border-border">
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
  );
};
