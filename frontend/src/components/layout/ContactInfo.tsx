import { MapPin, Phone, Mail, Clock } from "lucide-react";

const ITEMS = [
  {
    icon: MapPin,
    label: "Dirección",
    value: "Avenida Reforma, Ciudad de Guatemala",
  },
  { icon: Phone, label: "Teléfono", value: "+502 1234-5678" },
  { icon: Mail, label: "Correo", value: "cotizaciones@ventpro.com" },
  {
    icon: Clock,
    label: "Horario",
    value: "Lun – Vie · 8:00 – 18:00",
  },
];

export const ContactInfo = () => {
  return (
    <section className="bg-background py-24">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
            Visítanos
          </span>
          <h3 className="mt-3 font-display font-black text-3xl md:text-4xl tracking-tighter mb-8">
            Estamos donde nos necesites
          </h3>

          <div className="space-y-5">
            {ITEMS.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex gap-4 items-start">
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
            ))}
          </div>
        </div>

        <div className="w-full h-80 md:h-full min-h-[320px] rounded-2xl overflow-hidden border border-border">
          <iframe
            title="Ubicación VentPro"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.270921509351!2d-90.5160826851593!3d14.640722289776999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8589a213835e231d%3A0x89c5b7b1e1ab414!2sAvenida%20Reforma!5e0!3m2!1sen!2sgt!4v1668541245001!5m2!1sen!2sgt"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};
