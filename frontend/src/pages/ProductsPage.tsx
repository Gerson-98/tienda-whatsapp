// frontend/src/pages/ProductsPage.tsx

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MotionItem, MotionSection } from "@/components/motion/FadeInSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input"; // <-- Para la barra de búsqueda
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // <-- Para ordenar

type Product = {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  price: number;
  category: { name: string };
};

export const ProductsPage = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [isLoading, setIsLoading] = useState(true);

  // --- CAMBIO 1: Nuevos estados para búsqueda y ordenamiento ---
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name_asc");

  // --- CAMBIO 2: El useEffect ahora se ejecuta cuando cambian los filtros ---
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (sortBy) params.append("sortBy", sortBy);

      try {
        const response = await fetch(
          `http://localhost:3000/products?${params.toString()}`
        );
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        const data: Product[] = await response.json();
        setAllProducts(data);

        // Solo actualizamos las categorías la primera vez para que no desaparezcan al buscar
        if (categories.length === 0) {
          const uniqueCategories = [
            "Todos",
            ...new Set(data.map((p) => p.category.name)),
          ];
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [searchTerm, sortBy]); // Se actualiza al buscar u ordenar

  const filteredProducts =
    activeCategory === "Todos"
      ? allProducts
      : allProducts.filter((p) => p.category.name === activeCategory);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-GT", {
      style: "currency",
      currency: "GTQ",
    }).format(price);

  return (
    <main className="-mt-16">
      {/* SECCIÓN HERO (Sin cambios) */}
      <div
        className="relative z-[-1] h-[50vh] bg-cover bg-center flex items-center justify-center text-center"
        style={{ backgroundImage: "url('/images/hero/products-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 text-white container pt-16">
          <h1 className="text-4xl md:text-5xl font-bold">
            Nuestro Catálogo de Productos
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-white/90 text-lg md:text-xl">
            Descubre las soluciones que tenemos para ti, desde ventanas hasta
            puertas de la más alta calidad.
          </p>
        </div>
      </div>

      <div className="container py-20">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Input
            placeholder="Buscar por nombre..."
            className="flex-grow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name_asc">Nombre (A-Z)</SelectItem>
              <SelectItem value="price_asc">Precio (menor a mayor)</SelectItem>
              <SelectItem value="price_desc">Precio (mayor a menor)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="text-center">Cargando productos...</div>
        ) : (
          <MotionSection key={activeCategory} animateOnLoad={true}>
            <AnimatePresence>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <MotionItem key={product.id}>
                    <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col">
                      <CardHeader className="p-0">
                        <img
                          src={product.imageUrl || "/images/placeholder.png"}
                          alt={product.name}
                          className="w-full h-64 object-cover"
                        />
                      </CardHeader>
                      <CardContent className="p-6 flex-grow">
                        <CardTitle>{product.name}</CardTitle>
                        <p className="text-muted-foreground mt-2 text-sm">
                          {product.description}
                        </p>
                        {/* --- Aquí se muestra el precio que viene del backend --- */}
                        <p className="text-2xl font-bold text-primary mt-4">
                          {formatPrice(product.price)}
                        </p>
                      </CardContent>
                      <CardFooter className="p-6 pt-0">
                        <Button asChild className="w-full">
                          <Link to="/contacto">Solicitar Información</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </MotionItem>
                ))}
              </div>
            </AnimatePresence>
          </MotionSection>
        )}
      </div>

      {/* CALL TO ACTION (Sin cambios) */}
      <div className="bg-muted">
        <MotionSection className="container py-20 text-center">
          <MotionItem>
            <h2 className="text-3xl font-bold mb-4">
              ¿No estás seguro de qué ventana elegir?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Nuestro equipo de expertos está listo para asesorarte. Permítenos
              ayudarte a encontrar la solución perfecta para tu hogar y
              presupuesto.
            </p>
          </MotionItem>
          <MotionItem>
            <Button size="lg" asChild>
              <Link to="/contacto">Hablar con un Asesor</Link>
            </Button>
          </MotionItem>
        </MotionSection>
      </div>
    </main>
  );
};
