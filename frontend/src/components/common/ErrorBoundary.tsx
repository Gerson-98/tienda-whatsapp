import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { logger } from "@/lib/logger";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

/**
 * Captura errores no manejados en el árbol de componentes y muestra una UI
 * amigable en lugar de una pantalla en blanco. Útil como red de seguridad
 * global y opcionalmente alrededor de rutas/secciones específicas.
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  override state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    // TODO: integrar reporter remoto (Sentry, LogRocket, etc.).
    logger.error("ErrorBoundary capturó:", error, info);
  }

  private reset = () => this.setState({ error: null });

  override render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    if (this.props.fallback) return this.props.fallback(error, this.reset);

    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="text-center max-w-md">
          <div className="mx-auto mb-4 rounded-full bg-destructive/10 p-4 w-fit">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold">Algo salió mal</h1>
          <p className="mt-2 text-muted-foreground">
            Ocurrió un error inesperado. Puedes intentar recargar la página o
            volver al inicio.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button onClick={() => window.location.reload()}>
              Recargar página
            </Button>
            <Button variant="outline" onClick={this.reset}>
              Reintentar
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
