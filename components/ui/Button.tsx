import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  href?: string;
  icon?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  variant?: "primary" | "ghost";
};

export function Button({
  children,
  className,
  disabled,
  href,
  icon = false,
  onClick,
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
      <Link className={classes} href={href} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} type="button" onClick={onClick} disabled={disabled}>
      {content}
    </button>
  );
}
