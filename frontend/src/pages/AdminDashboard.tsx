import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale/es";
import { Check, Users, Clock, MailWarning, ExternalLink } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

// ... (El resto de tu código, incluyendo el tipo Submission y la lógica de la página, se queda exactamente igual) ...
type Submission = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  type: string;
  status: string;
  createdAt: string;
  projectType?: string;
};

type Stats = {
  total: number;
  pending: number;
  newToday: number;
};

export const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    pending: 0,
    newToday: 0,
  }); // <-- 3. Nuevo estado para las stats
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ status: "TODOS", type: "TODOS" });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  const [selectedSubmission, setSelectedSubmission] =
    useState<Submission | null>(null);
  // --- 3. USEEFFECT MEJORADO PARA REACCIONAR A LOS CAMBIOS ---
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    const debounceTimer = setTimeout(() => {
      const fetchAllData = async () => {
        setIsLoading(true);
        const params = new URLSearchParams({
          page: pagination.page.toString(),
          limit: pagination.limit.toString(),
          search: searchTerm,
          status: filters.status,
          type: filters.type,
        });

        try {
          const [submissionsRes, statsRes] = await Promise.all([
            fetch(
              `${
                import.meta.env.VITE_API_URL
              }/submissions?${params.toString()}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            ),
            fetch(`${import.meta.env.VITE_API_URL}/submissions/stats`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);

          if (!submissionsRes.ok || !statsRes.ok)
            throw new Error("No autorizado");

          const submissionsData = await submissionsRes.json();
          const statsData = await statsRes.json();

          // --- CAMBIO CLAVE: Accedemos a .data para obtener el array ---
          setSubmissions(submissionsData.data);
          setPagination((prev) => ({
            ...prev,
            total: submissionsData.total,
            page: submissionsData.page,
          }));
          setStats(statsData);
        } catch (error) {
          console.error(error);
          localStorage.removeItem("access_token");
          navigate("/admin/login");
        } finally {
          setIsLoading(false);
        }
      };
      fetchAllData();
    }, 300); // Debounce de 300ms

    return () => clearTimeout(debounceTimer);
  }, [navigate, searchTerm, filters, pagination.page]);

  const totalPages = Math.ceil(pagination.total / pagination.limit) || 1;
  const handleMarkAsRead = async (id: string) => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/submissions/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: "LEIDO" }),
        }
      );

      if (!response.ok) throw new Error("Falló la actualización");

      const updatedSubmission = await response.json();

      setSubmissions((prevSubmissions) =>
        prevSubmissions.map((sub) =>
          sub.id === id ? { ...sub, status: updatedSubmission.status } : sub
        )
      );
    } catch (error) {
      console.error("No se pudo marcar como leído:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/admin/login");
  };

  return (
    <main className="min-h-screen bg-muted p-4 md:p-8">
      {/* --- 1. NUEVO ENCABEZADO DEL PANEL --- */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
        <div className="flex items-center gap-4">
          <Button asChild>
            <a
              href="URL_DE_SANITY_STUDIO_AQUI"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gestionar Contenido
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </div>
      </div>

      {/* --- 2. TARJETAS DE ESTADÍSTICAS CON COLOR --- */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card className="bg-primary text-primary-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Solicitudes
            </CardTitle>
            <Users className="h-4 w-4 text-primary-foreground/70" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card className="bg-amber-100 dark:bg-amber-900/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-900 dark:text-amber-200">
              Pendientes de Revisión
            </CardTitle>
            <MailWarning className="h-4 w-4 text-amber-900/70 dark:text-amber-200/70" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-900 dark:text-amber-100">
              {stats.pending}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-emerald-100 dark:bg-emerald-900/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-emerald-900 dark:text-emerald-200">
              Nuevas Hoy
            </CardTitle>
            <Clock className="h-4 w-4 text-emerald-900/70 dark:text-emerald-200/70" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">
              +{stats.newToday}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bandeja de Entrada</CardTitle>
          <CardDescription>
            Selecciona una solicitud para ver los detalles.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* --- Filtros y búsqueda ahora dentro de CardContent para mejor estructura --- */}
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
            <Input
              placeholder="Buscar por nombre o correo..."
              className="flex-grow"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPagination((p) => ({ ...p, page: 1 }));
              }} // Reinicia a la pág 1 al buscar
            />
            <div className="flex gap-2">
              <Button
                variant={filters.status === "TODOS" ? "default" : "outline"}
                onClick={() => {
                  setFilters((f) => ({ ...f, status: "TODOS" }));
                  setPagination((p) => ({ ...p, page: 1 }));
                }}
              >
                Todos
              </Button>
              <Button
                variant={filters.status === "NUEVO" ? "default" : "outline"}
                onClick={() => {
                  setFilters((f) => ({ ...f, status: "NUEVO" }));
                  setPagination((p) => ({ ...p, page: 1 }));
                }}
              >
                Nuevos
              </Button>
              <Button
                variant={filters.status === "LEIDO" ? "default" : "outline"}
                onClick={() => {
                  setFilters((f) => ({ ...f, status: "LEIDO" }));
                  setPagination((p) => ({ ...p, page: 1 }));
                }}
              >
                Leídos
              </Button>
            </div>
          </div>
          <div className="border rounded-md">
            <Table>
              {/* --- CAMBIO CLAVE: ESTRUCTURA CORRECTA DE TABLEHEADER --- */}
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Fecha</TableHead>
                  <TableHead className="w-[120px]">Estado</TableHead>
                  <TableHead className="w-[120px]">Tipo</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Mensaje</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      Cargando...
                    </TableCell>
                  </TableRow>
                ) : submissions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No hay solicitudes.
                    </TableCell>
                  </TableRow>
                ) : (
                  submissions.map((sub) => (
                    <TableRow
                      key={sub.id}
                      onClick={() => setSelectedSubmission(sub)}
                      className={`cursor-pointer transition-colors hover:bg-muted/80 ${
                        sub.status === "LEIDO"
                          ? "bg-muted/50 text-muted-foreground"
                          : ""
                      }`}
                    >
                      <TableCell className="text-xs">
                        {formatDistanceToNow(new Date(sub.createdAt), {
                          addSuffix: true,
                          locale: es,
                        })}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            sub.status === "NUEVO" ? "destructive" : "secondary"
                          }
                        >
                          {sub.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            sub.type === "Cotización" ? "default" : "outline"
                          }
                        >
                          {sub.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{sub.name}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <a
                            href={`mailto:${sub.email}`}
                            className="text-primary hover:underline text-sm"
                          >
                            {sub.email}
                          </a>
                          {sub.phone && (
                            <span className="text-xs">{sub.phone}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[300px] truncate">
                        {sub.message}
                      </TableCell>
                      <TableCell className="text-right">
                        {sub.status === "NUEVO" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation(); // Evita que el modal se abra al hacer clic en el botón
                              handleMarkAsRead(sub.id);
                            }}
                            title="Marcar como leído"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            <div className="flex items-center justify-end space-x-2 py-4">
              <span className="text-sm text-muted-foreground">
                Página {pagination.page} de {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setPagination((p) => ({ ...p, page: p.page - 1 }))
                }
                disabled={pagination.page <= 1}
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setPagination((p) => ({ ...p, page: p.page + 1 }))
                }
                disabled={pagination.page >= totalPages}
              >
                Siguiente
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Dialog
        open={!!selectedSubmission} // El modal se abre si hay una submission seleccionada
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setSelectedSubmission(null); // Al cerrar, limpia el estado
          }
        }}
      >
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Detalles de la Solicitud</DialogTitle>
            <DialogDescription>
              Recibido{" "}
              {selectedSubmission &&
                formatDistanceToNow(new Date(selectedSubmission.createdAt), {
                  addSuffix: true,
                  locale: es,
                })}
              .
            </DialogDescription>
          </DialogHeader>
          {selectedSubmission && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-semibold">Nombre:</span>
                <span className="col-span-3">{selectedSubmission.name}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-semibold">Contacto:</span>
                <div className="col-span-3 flex flex-col">
                  <a
                    href={`mailto:${selectedSubmission.email}`}
                    className="text-primary hover:underline"
                  >
                    {selectedSubmission.email}
                  </a>
                  {selectedSubmission.phone && (
                    <span>{selectedSubmission.phone}</span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-semibold">Tipo:</span>
                <span className="col-span-3">{selectedSubmission.type}</span>
              </div>
              {selectedSubmission.projectType && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-right font-semibold">Proyecto:</span>
                  <span className="col-span-3">
                    {selectedSubmission.projectType}
                  </span>
                </div>
              )}
              <div className="grid grid-cols-4 items-start gap-4">
                <span className="text-right font-semibold pt-1">Mensaje:</span>
                <p className="col-span-3 bg-muted p-3 rounded-md text-sm whitespace-pre-wrap">
                  {selectedSubmission.message}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            {selectedSubmission?.status === "NUEVO" && (
              <Button
                onClick={() => {
                  handleMarkAsRead(selectedSubmission.id);
                  setSelectedSubmission(null);
                }}
              >
                <Check className="mr-2 h-4 w-4" /> Marcar como Leído
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
};
