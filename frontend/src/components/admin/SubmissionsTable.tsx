import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale/es";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Submission } from "@/types/api";

interface SubmissionsTableProps {
  submissions: Submission[];
  isLoading: boolean;
  onSelect: (submission: Submission) => void;
  onMarkAsRead: (id: string) => void;
}

const COLUMNS = 7;

export const SubmissionsTable = ({
  submissions,
  isLoading,
  onSelect,
  onMarkAsRead,
}: SubmissionsTableProps) => {
  return (
    <Table>
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
            <TableCell colSpan={COLUMNS} className="h-24 text-center">
              Cargando…
            </TableCell>
          </TableRow>
        ) : submissions.length === 0 ? (
          <TableRow>
            <TableCell colSpan={COLUMNS} className="h-24 text-center">
              No hay solicitudes.
            </TableCell>
          </TableRow>
        ) : (
          submissions.map((sub) => (
            <TableRow
              key={sub.id}
              onClick={() => onSelect(sub)}
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
                  variant={sub.status === "NUEVO" ? "destructive" : "secondary"}
                >
                  {sub.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={sub.type === "Cotización" ? "default" : "outline"}
                >
                  {sub.type}
                </Badge>
              </TableCell>
              <TableCell className="font-medium">{sub.name}</TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <a
                    href={`mailto:${sub.email}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-primary hover:underline text-sm"
                  >
                    {sub.email}
                  </a>
                  {sub.phone && <span className="text-xs">{sub.phone}</span>}
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
                      e.stopPropagation();
                      onMarkAsRead(sub.id);
                    }}
                    title="Marcar como leído"
                    aria-label={`Marcar la solicitud de ${sub.name} como leída`}
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
  );
};
