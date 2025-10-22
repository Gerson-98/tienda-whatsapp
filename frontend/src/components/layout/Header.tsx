import React, { useState, useEffect } from "react";
import { ShoppingCart, Menu, PanelTopClose } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";

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
  const { items } = useCartStore();
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        sticky top-0 z-50 w-full transition-all ease-in-out duration-500
        {/* --- CAMBIO CLAVE AQUÍ: Hemos eliminado 'border-b' de esta línea --- */}
        ${
          isScrolled
            ? "bg-background/40 backdrop-blur-lg"
            : "bg-transparent border-transparent"
        }
      `}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <a
          href="#"
          className={`flex items-center gap-2 font-bold transition-colors ${
            isScrolled ? "text-foreground" : "text-white"
          }`}
        >
          <PanelTopClose className="h-6 w-6" />
          <span>VentPro</span>
        </a>

        <nav className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm">
          <NavLinks
            className={isScrolled ? "text-foreground/80" : "text-white/90"}
          />
        </nav>

        <div className="flex items-center gap-2">
          <div
            className={`hidden sm:flex items-center gap-2 transition-colors ${
              isScrolled ? "text-foreground" : "text-white"
            }`}
          >
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-white/10"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {totalItems}
                </span>
              )}
            </Button>
          </div>

          <div className="sm:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`transition-colors ${
                    isScrolled ? "text-foreground" : "text-white"
                  } hover:bg-white/10`}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="grid gap-6 text-lg font-medium mt-6 px-4">
                  <a
                    href="#"
                    className="flex items-center gap-2 font-bold text-foreground"
                  >
                    <PanelTopClose className="h-6 w-6 text-primary" />
                    <span>VentPro</span>
                  </a>
                  <NavLinks className="flex-col items-start gap-4 text-foreground/80" />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
