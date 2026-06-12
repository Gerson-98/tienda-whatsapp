// frontend/src/pages/ProductsPage.tsx

import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Search, ArrowRight, PackageSearch, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { client } from "@/sanityClient";
import { logger } from "@/lib/logger";
import { ErrorState } from "@/components/common/ErrorState";
import { EmptyState } from "@/components/common/EmptyState";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductCardSkeleton } from "@/components/products/ProductCardSkeleton";
import { useHeroImage } from "@/lib/siteSettings";
import type { Product } from "@/types/product";

export const ProductsPage = () => {
  const heroImage = useHeroImage("heroProductsImage", "/images/hero/products-hero.jpg");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name_asc");
  const [retryCount, setRetryCount] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const productsQuery = `*[_type == "product"]{_id, name, description, price, imageUrl, "categoryName": category->name} | order(name asc)`;
        const categoriesQuery = `*[_type == "productCategory"]{name} | order(name asc)`;
        const [products, productCategories] = await Promise.all([
          client.fetch<Product[]>(productsQuery),
          client.fetch<{ name: string }[]>(categoriesQuery),
        ]);
        setAllProducts(products);
        setCategories(productCategories.map((c) => c.name));
      } catch (error) {
        logger.error("Error al obtener los productos:", error);
        setAllProducts([]);
        setErrorMessage(
          "Los productos no están disponibles en este momento. Contáctanos directamente."
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllData();
  }, [retryCount]);

  const filteredProducts = useMemo(() => {
    let result = allProducts;

    if (activeCategories.length > 0) {
      result = result.filter(
        (p) => p.categoryName !== null && activeCategories.includes(p.categoryName)
      );
    }

    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(term));
    }

    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case "price_asc":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return result;
  }, [allProducts, activeCategories, searchTerm, sortBy]);

  const toggleCategory = (category: string) => {
    setActiveCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const hasActiveFilters = activeCategories.length > 0 || searchTerm.trim() !== "";

  const clearFilters = () => {
    setActiveCategories([]);
    setSearchTerm("");
  };

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
            Nuestro <span className="text-secondary">catálogo</span>
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

          {categories.length > 0 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              <button
                onClick={() => setActiveCategories([])}
                aria-pressed={activeCategories.length === 0}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium cursor-pointer transition-colors whitespace-nowrap",
                  activeCategories.length === 0
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80 text-foreground"
                )}
              >
                Todos
              </button>
              {categories.map((category) => {
                const isActive = activeCategories.includes(category);
                return (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    aria-pressed={isActive}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-medium cursor-pointer transition-colors whitespace-nowrap",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/80 text-foreground"
                    )}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          )}

          <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground">
            <span>
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "producto encontrado" : "productos encontrados"}
            </span>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 font-medium text-foreground hover:text-primary transition-colors"
              >
                <X className="h-3.5 w-3.5" />
                Limpiar filtros
              </button>
            )}
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
            description={errorMessage}
            onRetry={() => setRetryCount((c) => c + 1)}
          />
        ) : filteredProducts.length === 0 ? (
          <EmptyState
            icon={PackageSearch}
            title="No encontramos productos"
            description="Prueba con otra búsqueda o categoría."
            action={
              hasActiveFilters ? (
                <Button variant="outline" className="rounded-full" onClick={clearFilters}>
                  <X className="h-4 w-4" />
                  Limpiar filtros
                </Button>
              ) : undefined
            }
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
                <ProductCard key={product._id} product={product} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* CTA */}
      <div className="container mx-auto pb-20">
        <div className="bg-muted/50 rounded-2xl border border-border p-12 text-center">
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
