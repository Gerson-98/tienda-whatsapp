import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore, useCartTotal, type CartItem } from "@/store/cartStore";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("es-GT", {
    style: "currency",
    currency: "GTQ",
  }).format(price);

/**
 * Resumen de productos seleccionados desde el catálogo. Se inserta encima
 * del formulario de cotización. Si no hay productos, no renderiza nada y
 * el formulario funciona normalmente.
 */
export const QuoteCartSummary = () => {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);
  const total = useCartTotal();

  if (items.length === 0) return null;

  return (
    <div className="rounded-lg border bg-muted/40 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">
          Productos en tu cotización ({items.length})
        </h3>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={clearCart}
          className="text-muted-foreground hover:text-destructive"
        >
          Vaciar
        </Button>
      </div>
      <ul className="divide-y divide-border">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between py-2 gap-3"
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate">{item.name}</p>
              <p className="text-xs text-muted-foreground">
                {item.quantity} × {formatPrice(item.price)}
              </p>
            </div>
            <span className="text-sm font-medium tabular-nums">
              {formatPrice(item.price * item.quantity)}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeItem(item.id)}
              aria-label={`Quitar ${item.name}`}
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </li>
        ))}
      </ul>
      <div className="mt-3 pt-3 border-t flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Subtotal estimado</span>
        <span className="font-bold tabular-nums">{formatPrice(total)}</span>
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        Estos productos se incluirán automáticamente en el mensaje de tu
        cotización.
      </p>
    </div>
  );
};

/** Construye un bloque de texto con la lista del carrito para anexar al mensaje. */
export function buildCartMessagePrefix(items: CartItem[]): string | undefined {
  if (items.length === 0) return undefined;
  const lines = [
    "Productos seleccionados desde el catálogo:",
    ...items.map(
      (it) =>
        `- ${it.name} × ${it.quantity}  (${formatPrice(it.price)} c/u  =  ${formatPrice(
          it.price * it.quantity
        )})`
    ),
    `Subtotal estimado: ${formatPrice(
      items.reduce((sum, it) => sum + it.price * it.quantity, 0)
    )}`,
  ];
  return lines.join("\n");
}
