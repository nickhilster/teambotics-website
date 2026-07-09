import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={cn("container", className)} style={style}>
      {children}
    </div>
  );
}
