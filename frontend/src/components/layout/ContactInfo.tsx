import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";

// Datos de contacto (fáciles de cambiar en el futuro)
const contactDetails = {
  address: "Avenida Reforma, Ciudad de Guatemala, Guatemala",
  phone: "+502 1234-5678",
  email: "cotizaciones@ventpro.com",
};

const socialLinks = [
  { icon: <Facebook />, href: "#", name: "Facebook" },
  { icon: <Instagram />, href: "#", name: "Instagram" },
  { icon: <Linkedin />, href: "#", name: "LinkedIn" },
];

export const ContactInfo = () => {
  return (
    <section className="bg-background py-20">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Columna de Información */}
        <div className="flex flex-col gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Visítanos o Contáctanos</h3>
            <div className="flex items-start gap-4 mb-4">
              <MapPin className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
              <p className="text-muted-foreground">{contactDetails.address}</p>
            </div>
            <div className="flex items-start gap-4 mb-4">
              <Phone className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
              <p className="text-muted-foreground">{contactDetails.phone}</p>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
              <p className="text-muted-foreground">{contactDetails.email}</p>
            </div>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Síguenos en Redes</h4>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Columna del Mapa */}
        <div className="w-full h-80 md:h-full rounded-lg overflow-hidden border shadow-sm">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.270921509351!2d-90.5160826851593!3d14.640722289776999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8589a213835e231d%3A0x89c5b7b1e1ab414!2sAvenida%20Reforma!5e0!3m2!1sen!2sgt!4v1668541245001!5m2!1sen!2sgt"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};
