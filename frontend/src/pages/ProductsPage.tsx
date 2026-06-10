// frontend/src/pages/ProductsPage.tsx

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Search, ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCartStore, useIsInCart } from "@/store/cartStore";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { api, ApiError } from "@/services/apiClient";
import { logger } from "@/lib/logger";
import { ErrorState } from "@/components/common/ErrorState";
import { EmptyState } from "@/components/common/EmptyState";
import { ProductCardSkeleton } from "@/components/products/ProductCardSkeleton";
import { PackageSearch } from "lucide-react";
import { useHeroImage } from "@/lib/siteSettings";

type Product = {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  price: number;
  category: { name: string };
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("es-GT", {
    style: "currency",
    currency: "GTQ",
  }).format(price);

const ProductCard = ({ product }: { product: Product }) => {
  const addItem = useCartStore((s) => s.addItem);
  const inCart = useIsInCart(product.id);
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ scale: 1.02 }}
      className="group bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
    >
      <div className="relative">
        <img
          src={product.imageUrl || "/images/placeholder.png"}
          alt={product.name}
          className="aspect-square object-cover w-full"
        />
        <span className="absolute top-3 left-3 bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-xs font-medium">
          {product.category.name}
        </span>
      </div>
      <div className="p-5 flex flex-col gap-3 flex-grow">
        <h3 className="font-display font-bold text-lg leading-tight">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <p className="text-xl font-bold text-primary mt-auto">
          {formatPrice(product.price)}
        </p>
        <Button
          onClick={() =>
            addItem({ id: product.id, name: product.name, price: product.price })
          }
          className="w-full rounded-xl mt-1"
          aria-label={`Agregar ${product.name} al carrito`}
        >
          <ShoppingCart className="h-4 w-4" />
          {inCart ? "Agregar otro" : "Agregar al carrito"}
        </Button>
      </div>
    </motion.div>
  );
};

export const ProductsPage = () => {
  const heroImage = useHeroImage("heroProductsImage", "/images/hero/products-hero.jpg");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name_asc");
  const [retryCount, setRetryCount] = useState(0);
  const reduce = useReducedMotion();

  logger.debug("API URL:", import.meta.env.VITE_API_URL);

  useEffect(() => {
    const debounceTimer = setTimeout(async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const data = await api.get<Product[]>("/products", {
          query: { search: searchTerm || undefined, sortBy },
        });
        setAllProducts(data);
        if (categories.length <= 1) {
          setCategories([
            "Todos",
            ...new Set(data.map((p) => p.category.name)),
          ]);
        }
      } catch (error) {
        logger.error("Error al obtener los productos:", error);
        setAllProducts([]);
        setErrorMessage(
          error instanceof ApiError
            ? error.userMessage
            : "Los productos no están disponibles en este momento. Contáctanos directamente."
        );
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, sortBy, retryCount]);

  const filteredProducts =
    activeCategory === "Todos"
      ? allProducts
      : allProducts.filter((p) => p.category.name === activeCategory);

  return (
    <main className="-mt-20">
      {/* HERO */}
      <div
        className="relative h-[50vh] bg-cover bg-center flex items-center justify-center text-center"
        style={{ backgroundImage: `url('${heroImage}')` }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 text-white container pt-16">
          <h1 className="font-display font-black text-5xl md:text-6xl tracking-tighter">
            Nuestro <span className="text-gradient">catálogo</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-white/85 text-lg font-light">
            Soluciones premium en ventanas, puertas y sistemas de PVC y aluminio.
          </p>
        </div>
      </div>

      {/* Barra sticky */}
      <div className="sticky top-20 bg-background/95 backdrop-blur-sm z-10 py-4 border-b border-border">
        <div className="container mx-auto flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar producto..."
                className="rounded-xl border-input pl-10 h-11"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[220px] rounded-xl h-11">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name_asc">Nombre (A-Z)</SelectItem>
                <SelectItem value="price_asc">Precio (menor a mayor)</SelectItem>
                <SelectItem value="price_desc">Precio (mayor a menor)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium cursor-pointer transition-colors whitespace-nowrap",
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80 text-foreground"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="container mx-auto py-16">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : errorMessage ? (
          <ErrorState
            title="Los productos no están disponibles en este momento"
            description={`${errorMessage} Contáctanos directamente.`}
            onRetry={() => setRetryCount((c) => c + 1)}
          />
        ) : filteredProducts.length === 0 ? (
          <EmptyState
            icon={PackageSearch}
            title="No encontramos productos"
            description="Prueba con otra búsqueda o categoría."
          />
        ) : (
          <motion.div
            variants={reduce ? undefined : staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* CTA */}
      <div className="container mx-auto pb-20">
        <div className="bg-muted/50 rounded-3xl border border-border p-12 text-center">
          <h2 className="font-display font-black text-3xl md:text-4xl tracking-tighter mb-4">
            ¿No estás seguro de qué elegir?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Nuestro equipo te asesora para encontrar la solución perfecta.
          </p>
          <Button asChild size="lg" className="rounded-full">
            <Link to="/contacto">
              Hablar con un asesor <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
};
