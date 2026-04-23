import { cn } from "@/lib/utils";

export function Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={cn("tag", className)}>{children}</span>;
}
