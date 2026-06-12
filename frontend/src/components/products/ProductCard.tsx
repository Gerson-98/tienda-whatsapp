import { motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore, useIsInCart } from "@/store/cartStore";
import { fadeUp } from "@/lib/animations";
import { formatPrice } from "@/lib/format";
import { urlFor } from "@/sanityClient";
import type { Product } from "@/types/product";

export const ProductCard = ({ product }: { product: Product }) => {
  const addItem = useCartStore((s) => s.addItem);
  const inCart = useIsInCart(product._id);
  const imageSrc = product.imageUrl
    ? urlFor(product.imageUrl).width(500).height(500).auto("format").quality(75).url()
    : "/images/placeholder.png";

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ scale: 1.02 }}
      className="group bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
    >
      <div className="relative">
        <img
          src={imageSrc}
          alt={product.name}
          className="aspect-square object-cover w-full"
          loading="lazy"
          decoding="async"
          width={500}
          height={500}
          onError={(e) => {
            const img = e.currentTarget;
            if (img.src.endsWith("/images/placeholder.png")) return;
            img.src = "/images/placeholder.png";
          }}
        />
        {product.categoryName && (
          <span className="absolute top-3 left-3 bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-xs font-medium">
            {product.categoryName}
          </span>
        )}
      </div>
      <div className="p-5 flex flex-col gap-3 flex-grow">
        <h3 className="font-display font-bold text-lg leading-tight line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description ||
            "Consulta con nuestro equipo para más detalles de este producto."}
        </p>
        <p className="text-xl font-bold text-primary mt-auto">
          {formatPrice(product.price)}
        </p>
        {inCart && (
          <p className="flex items-center gap-1.5 text-sm font-medium text-primary">
            <Check className="h-4 w-4" /> En tu cotización
          </p>
        )}
        <Button
          onClick={() =>
            addItem({ id: product._id, name: product.name, price: product.price })
          }
          variant={inCart ? "outline" : "default"}
          className="w-full rounded-xl mt-1"
          aria-label={
            inCart
              ? `Agregar otra unidad de ${product.name} a tu cotización`
              : `Agregar ${product.name} a tu cotización`
          }
        >
          <Plus className="h-4 w-4" />
          {inCart ? "Agregar otro" : "Agregar a cotización"}
        </Button>
      </div>
    </motion.div>
  );
};
