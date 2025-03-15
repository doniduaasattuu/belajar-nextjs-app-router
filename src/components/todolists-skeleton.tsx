import { Skeleton } from "./ui/skeleton";

export default function TodolistsSekeleton() {
  return (
    <div className="space-y-5">
      <Skeleton className="w-full h-3" />
      <Skeleton className="w-full h-3" />
      <Skeleton className="w-full h-3" />
    </div>
  );
}
