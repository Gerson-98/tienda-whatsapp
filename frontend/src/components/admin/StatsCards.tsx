import { Clock, MailWarning, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { SubmissionStats } from "@/types/api";

interface StatCardProps {
  label: string;
  value: number | string;
  Icon: LucideIcon;
  className?: string;
  iconClassName?: string;
}

const StatCard = ({
  label,
  value,
  Icon,
  className,
  iconClassName,
}: StatCardProps) => (
  <Card className={className}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{label}</CardTitle>
      <Icon className={cn("h-4 w-4 opacity-70", iconClassName)} aria-hidden />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

interface StatsCardsProps {
  stats: SubmissionStats;
}

export const StatsCards = ({ stats }: StatsCardsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-3 mb-8">
      <StatCard
        label="Total de solicitudes"
        value={stats.total}
        Icon={Users}
        className="bg-primary text-primary-foreground"
      />
      <StatCard
        label="Pendientes de revisión"
        value={stats.pending}
        Icon={MailWarning}
        className="bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-100"
      />
      <StatCard
        label="Nuevas hoy"
        value={`+${stats.newToday}`}
        Icon={Clock}
        className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-100"
      />
    </div>
  );
};
