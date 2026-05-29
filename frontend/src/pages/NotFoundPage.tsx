import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export const NotFoundPage = () => {
  useDocumentTitle("Página no encontrada");
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-20">
      <div className="text-center max-w-md">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Error 404
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Página no encontrada
        </h1>
        <p className="mt-4 text-muted-foreground">
          La página que buscas no existe o fue movida. Verifica el enlace o
          vuelve al inicio.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <Link to="/">Volver al inicio</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/contacto">Contactarnos</Link>
          </Button>
        </div>
      </div>
    </main>
  );
};
