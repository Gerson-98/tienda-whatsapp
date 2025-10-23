// src/components/layout/Header.tsx

import { useState, useEffect } from "react"; // <-- 1. Importamos los hooks de React
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
    <Link to="/nosotros" className="transition-opacity hover:opacity-80">
      Nosotros
    </Link>
    <Link to="/contacto" className="transition-opacity hover:opacity-80">
      Contacto
    </Link>
  </div>
);

export const Header = () => {
  // --- 2. Lógica para detectar el scroll ---
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Si el scroll vertical es mayor a 10px, cambiamos el estado
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Añadimos el listener cuando el componente se monta
    window.addEventListener("scroll", handleScroll);

    // Limpiamos el listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // El array vacío asegura que esto se ejecute solo una vez

  return (
    // --- 3. Aplicamos clases condicionales para el efecto cristal ---
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-sm shadow-lg text-foreground"
          : "bg-transparent text-white"
      }`}
    >
      {/* --- 4. Hacemos el contenedor relativo para centrar la navegación --- */}
      <div className="container mx-auto flex h-16 items-center justify-between relative">
        <Link to="/" className="text-2xl font-bold">
          Vent<span className="text-primary">Pro</span>
        </Link>

        {/* --- 5. Centramos la navegación de escritorio de forma absoluta --- */}
        <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
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
