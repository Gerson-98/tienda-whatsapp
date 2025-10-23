import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

const NavLinks = ({ className }: { className?: string }) => (
  <div className={`flex items-center gap-6 font-bold ${className}`}>
    <Link to="/" className="transition-opacity hover:opacity-80">
      Inicio
    </Link>
    <Link to="/proyectos" className="transition-opacity hover:opacity-80">
      Proyectos
    </Link>
    <Link to="/productos" className="transition-opacity hover:opacity-80">
      Productos
    </Link>
    {/* --- CAMBIA ESTA LÍNEA --- */}
    <Link to="/nosotros" className="transition-opacity hover:opacity-80">
      Nosotros
    </Link>
    <Link to="/contacto" className="transition-opacity hover:opacity-80">
      Contacto
    </Link>
  </div>
);

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent text-white transition-all duration-300">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          Vent<span className="text-primary">Pro</span>
        </Link>
        <nav className="hidden md:flex">
          <NavLinks />
        </nav>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <NavLinks className="flex-col text-lg" />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
