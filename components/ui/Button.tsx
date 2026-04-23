import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  icon?: boolean;
  variant?: "primary" | "ghost";
};

export function Button({
  children,
  className,
  href,
  icon = false,
  variant = "primary",
}: ButtonProps) {
  const classes = cn("button", `button--${variant}`, className);

  const content = (
    <>
      <span>{children}</span>
      {icon ? <ArrowRight aria-hidden="true" size={16} strokeWidth={1.5} /> : null}
    </>
  );

  if (href) {
    return (
      <Link className={classes} href={href}>
        {content}
      </Link>
    );
  }

  return <button className={classes} type="button">{content}</button>;
}
