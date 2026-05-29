import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale/es";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Submission } from "@/types/api";

interface SubmissionDetailDialogProps {
  submission: Submission | null;
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
}

export const SubmissionDetailDialog = ({
  submission,
  onClose,
  onMarkAsRead,
}: SubmissionDetailDialogProps) => {
  return (
    <Dialog
      open={!!submission}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Detalles de la solicitud</DialogTitle>
          <DialogDescription>
            {submission &&
              `Recibido ${formatDistanceToNow(new Date(submission.createdAt), {
                addSuffix: true,
                locale: es,
              })}.`}
          </DialogDescription>
        </DialogHeader>
        {submission && (
          <div className="grid gap-4 py-4">
            <Row label="Nombre" value={submission.name} />
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-right font-semibold">Contacto:</span>
              <div className="col-span-3 flex flex-col">
                <a
                  href={`mailto:${submission.email}`}
                  className="text-primary hover:underline"
                >
                  {submission.email}
                </a>
                {submission.phone && <span>{submission.phone}</span>}
              </div>
            </div>
            <Row label="Tipo" value={submission.type} />
            {submission.projectType && (
              <Row label="Proyecto" value={submission.projectType} />
            )}
            <div className="grid grid-cols-4 items-start gap-4">
              <span className="text-right font-semibold pt-1">Mensaje:</span>
              <p className="col-span-3 bg-muted p-3 rounded-md text-sm whitespace-pre-wrap">
                {submission.message}
              </p>
            </div>
          </div>
        )}
        <DialogFooter>
          {submission?.status === "NUEVO" && (
            <Button
              onClick={() => {
                onMarkAsRead(submission.id);
                onClose();
              }}
            >
              <Check className="mr-2 h-4 w-4" /> Marcar como leído
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="grid grid-cols-4 items-center gap-4">
    <span className="text-right font-semibold">{label}:</span>
    <span className="col-span-3">{value}</span>
  </div>
);
