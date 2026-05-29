import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCartCount } from "@/store/cartStore";
import { cn } from "@/lib/utils";

interface CartBadgeProps {
  className?: string;
}

/**
 * Botón flotante de carrito en el Header. Se oculta si está vacío para
 * no añadir ruido visual cuando no hay nada que mostrar.
 */
export const CartBadge = ({ className }: CartBadgeProps) => {
  const count = useCartCount();
  if (count === 0) return null;

  const label =
    count === 1
      ? "1 producto en tu cotización"
      : `${count} productos en tu cotización`;

  return (
    <Button
      asChild
      variant="ghost"
      size="icon"
      className={cn("relative", className)}
    >
      <Link to="/cotizacion" aria-label={`Ir a la cotización: ${label}`}>
        <ShoppingCart className="h-5 w-5" aria-hidden />
        <span
          className="absolute -top-1 -right-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold leading-none text-primary-foreground shadow-sm"
          aria-hidden
        >
          {count > 99 ? "99+" : count}
        </span>
        <span className="sr-only">{label}</span>
      </Link>
    </Button>
  );
};
