import { Skeleton } from "@/components/ui/skeleton";

export const ProjectCardSkeleton = () => {
  return (
    <div className="rounded-2xl border border-border overflow-hidden bg-card">
      <Skeleton className="aspect-video w-full rounded-none" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-3 w-1/4" />
        <Skeleton className="h-5 w-2/3" />
      </div>
    </div>
  );
};
