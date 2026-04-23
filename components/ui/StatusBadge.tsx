import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  className?: string;
  label: string;
  variant: "live" | "pilot";
};

export function StatusBadge({ className, label, variant }: StatusBadgeProps) {
  return (
    <span className={cn("status-badge", `status-badge--${variant}`, className)}>
      <span className="status-badge__dot" />
      {label}
    </span>
  );
}
