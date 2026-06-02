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
    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-300 transition hover:bg-white/10 hover:text-white"
  >
    {children}
  </a>
);

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              to="/"
              className="font-display text-2xl font-bold text-white tracking-tight"
            >
              Vent<span className="text-secondary">Pro</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Fabricación e instalación de ventanas de aluminio y PVC de alta calidad
              en Guatemala. Más de 200 proyectos entregados.
            </p>
            <div className="mt-6 flex gap-3">
              <SocialLink href="https://facebook.com" label="Facebook">
                <Facebook className="h-4 w-4" />
              </SocialLink>
              <SocialLink href="https://instagram.com" label="Instagram">
                <Instagram className="h-4 w-4" />
              </SocialLink>
              <SocialLink href="https://linkedin.com" label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </SocialLink>
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-white">
              Navegación
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link to="/" className="hover:text-white transition">Inicio</Link></li>
              <li><Link to="/proyectos" className="hover:text-white transition">Proyectos</Link></li>
              <li><Link to="/productos" className="hover:text-white transition">Productos</Link></li>
              <li><Link to="/nosotros" className="hover:text-white transition">Nosotros</Link></li>
              <li><Link to="/contacto" className="hover:text-white transition">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-white">
              Servicios
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>Ventanas de aluminio</li>
              <li>Ventanas de PVC</li>
              <li>Puertas corredizas</li>
              <li>Fachadas y muros cortina</li>
              <li>Instalación profesional</li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-white">
              Contacto
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-0.5 text-secondary" />
                <span>+502 0000-0000</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-0.5 text-secondary" />
                <span>contacto@ventpro.com.gt</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-secondary" />
                <span>Ciudad de Guatemala, Guatemala</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-6">
          <p className="text-center text-sm text-slate-500">
            &copy; {currentYear} VentPro. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
