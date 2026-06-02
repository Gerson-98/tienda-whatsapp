// src/components/layout/Header.tsx

import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { ThemeToggle } from "./ThemeToggle";
import { CartBadge } from "./CartBadge";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { to: "/", label: "Inicio" },
  { to: "/proyectos", label: "Proyectos" },
  { to: "/productos", label: "Productos" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/contacto", label: "Contacto" },
];

const NavLinks = ({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) => (
  <div className={cn("flex items-center gap-8", className)}>
    {NAV_ITEMS.map((item) => (
      <NavLink
        key={item.to}
        to={item.to}
        end={item.to === "/"}
        onClick={onNavigate}
        className={({ isActive }) =>
          cn(
            "nav-underline text-sm font-medium uppercase tracking-wider transition-colors hover:text-primary",
            isActive && "active text-primary"
          )
        }
      >
        {item.label}
      </NavLink>
    ))}
  </div>
);

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/85 backdrop-blur-md shadow-sm border-b border-border text-foreground"
          : "bg-transparent text-white"
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between">
        <Link
          to="/"
          className="font-display font-bold text-xl tracking-tight"
        >
          Vent<span className="text-secondary">Pro</span>
        </Link>

        <nav className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <NavLinks />
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Button
            asChild
            className="rounded-full px-6 py-2.5 font-medium"
          >
            <Link to="/cotizacion">Cotizar ahora</Link>
          </Button>
          <div className="h-6 w-px bg-current/30" aria-hidden />
          <CartBadge />
          <ThemeToggle />
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <CartBadge />
          <ThemeToggle />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Abrir menú">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background">
              <nav className="flex flex-col gap-6 mt-12">
                <NavLinks
                  className="flex-col items-start text-lg gap-6"
                  onNavigate={() => setMobileOpen(false)}
                />
                <Button
                  asChild
                  className="rounded-full mt-4 w-full"
                  onClick={() => setMobileOpen(false)}
                >
                  <Link to="/cotizacion">Cotizar ahora</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
