import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const SocialLink = ({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-300 transition hover:bg-secondary/20 hover:text-secondary hover:border-secondary/40"
  >
    {children}
  </a>
);

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <li>
    <Link
      to={to}
      className="block py-1.5 text-sm text-slate-400 hover:text-white transition"
    >
      {children}
    </Link>
  </li>
);

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[hsl(213,50%,7%)] text-slate-300">
      <div className="container mx-auto py-14 md:py-16">
        <div className="grid grid-cols-1 gap-10 text-center md:text-left md:grid-cols-2 lg:grid-cols-4 md:gap-10">

          {/* Marca */}
          <div className="flex flex-col items-center md:items-start">
            <Link
              to="/"
              className="font-display text-2xl font-bold text-white tracking-tight"
            >
              Vent<span className="text-secondary">Pro</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-400 max-w-xs">
              Fabricación e instalación de ventanas de aluminio y PVC de alta calidad
              en Guatemala. Más de 200 proyectos entregados.
            </p>
            <div className="mt-6 flex justify-center md:justify-start gap-3">
              <SocialLink href="https://facebook.com" label="Facebook de VentPro">
                <Facebook className="h-4 w-4" />
              </SocialLink>
              <SocialLink href="https://instagram.com" label="Instagram de VentPro">
                <Instagram className="h-4 w-4" />
              </SocialLink>
              <SocialLink href="https://linkedin.com" label="LinkedIn de VentPro">
                <Linkedin className="h-4 w-4" />
              </SocialLink>
            </div>
          </div>

          {/* Navegación */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-white mb-3">
              Navegación
            </h3>
            <ul className="space-y-0.5">
              <FooterLink to="/">Inicio</FooterLink>
              <FooterLink to="/proyectos">Proyectos</FooterLink>
              <FooterLink to="/productos">Productos</FooterLink>
              <FooterLink to="/nosotros">Nosotros</FooterLink>
              <FooterLink to="/contacto">Contacto</FooterLink>
              <FooterLink to="/cotizacion">Cotización</FooterLink>
            </ul>
          </div>

          {/* Servicios */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-white mb-3">
              Servicios
            </h3>
            <ul className="space-y-0.5 text-sm text-slate-400">
              {[
                "Ventanas de aluminio",
                "Ventanas de PVC",
                "Puertas corredizas",
                "Fachadas y muros cortina",
                "Instalación profesional",
              ].map((s) => (
                <li key={s} className="py-1.5">{s}</li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-white mb-3">
              Contacto
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="tel:+50241916647"
                  className="flex items-center justify-center md:justify-start gap-3 py-1.5 hover:text-white transition"
                >
                  <Phone className="h-4 w-4 shrink-0 text-secondary" />
                  <span>(+502) 4191-6647</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:cotizaciones@ventpro.com"
                  className="flex items-center justify-center md:justify-start gap-3 py-1.5 hover:text-white transition"
                >
                  <Mail className="h-4 w-4 shrink-0 text-secondary" />
                  <span>cotizaciones@ventpro.com</span>
                </a>
              </li>
              <li className="flex items-start justify-center md:justify-start gap-3 py-1.5">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-secondary" />
                <span>Ciudad de Guatemala, Guatemala</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-center text-sm text-slate-500">
            &copy; {currentYear} VentPro. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
