import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore, useCartTotal, type CartItem } from "@/store/cartStore";
import { formatPrice } from "@/lib/format";

/**
 * Resumen de productos seleccionados desde el catálogo. Se inserta encima
 * del formulario de cotización. Si no hay productos, no renderiza nada y
 * el formulario funciona normalmente.
 */
export const QuoteCartSummary = () => {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
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
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3"
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate">{item.name}</p>
              <p className="text-xs text-muted-foreground">
                {formatPrice(item.price)} c/u
              </p>
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-3">
              <div className="flex items-center gap-1.5 rounded-full border border-border">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  aria-label={`Disminuir cantidad de ${item.name}`}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-6 text-center text-sm tabular-nums">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  aria-label={`Aumentar cantidad de ${item.name}`}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <span className="text-sm font-medium tabular-nums w-20 text-right">
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
            </div>
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
