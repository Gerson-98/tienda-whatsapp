import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const STATUS_FILTERS: Array<{ value: string; label: string }> = [
  { value: "TODOS", label: "Todos" },
  { value: "NUEVO", label: "Nuevos" },
  { value: "LEIDO", label: "Leídos" },
];

interface SubmissionsFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  activeStatus: string;
  onStatusChange: (value: string) => void;
}

export const SubmissionsFilterBar = ({
  searchTerm,
  onSearchChange,
  activeStatus,
  onStatusChange,
}: SubmissionsFilterBarProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
      <div className="relative flex-grow w-full">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
          aria-hidden
        />
        <Input
          placeholder="Buscar por nombre o correo…"
          className="pl-9"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Buscar solicitudes"
        />
      </div>
      <div className="flex gap-2" role="group" aria-label="Filtrar por estado">
        {STATUS_FILTERS.map((f) => (
          <Button
            key={f.value}
            variant={activeStatus === f.value ? "default" : "outline"}
            onClick={() => onStatusChange(f.value)}
            aria-pressed={activeStatus === f.value}
          >
            {f.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
