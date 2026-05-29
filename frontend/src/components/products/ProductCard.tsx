import { Link } from "react-router-dom";
import { Check, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useIsInCart } from "@/store/cartStore";
import type { Product } from "@/types/api";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("es-GT", {
    style: "currency",
    currency: "GTQ",
  }).format(price);

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const added = useIsInCart(product.id);

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col">
      <CardHeader className="p-0">
        <img
          src={product.imageUrl || "/images/placeholder.png"}
          alt={product.name}
          loading="lazy"
          decoding="async"
          width={400}
          height={256}
          className="w-full h-64 object-cover"
          onError={(e) => {
            const img = e.currentTarget;
            if (img.src.endsWith("/images/placeholder.png")) return;
            img.src = "/images/placeholder.png";
          }}
        />
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle>{product.name}</CardTitle>
        <p className="text-muted-foreground mt-2 text-sm">
          {product.description}
        </p>
        <p className="text-2xl font-bold text-primary mt-4">
          {formatPrice(product.price)}
        </p>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex gap-2">
        <Button
          type="button"
          variant={added ? "secondary" : "default"}
          className="flex-1"
          onClick={() => onAddToCart(product)}
          disabled={added}
          aria-label={
            added
              ? `${product.name} ya está en tu cotización`
              : `Agregar ${product.name} a la cotización`
          }
        >
          {added ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              En cotización
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Cotizar
            </>
          )}
        </Button>
        <Button asChild variant="outline">
          <Link to="/contacto">Info</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
