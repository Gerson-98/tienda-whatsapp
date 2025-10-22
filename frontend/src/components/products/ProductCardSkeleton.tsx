import { Skeleton } from "@/components/ui/skeleton";

export const ProductCardSkeleton = () => {
  return (
    <div className="border rounded-lg flex flex-col text-center overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="p-4 flex flex-col flex-grow">
        <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
        <Skeleton className="h-4 w-1/2 mx-auto mb-4" />
        <div className="mt-auto mb-4">
          <Skeleton className="h-8 w-1/3 mx-auto" />
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
};
