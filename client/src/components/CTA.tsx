import { ReactNode } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CTAProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  onClick?: () => void;
  external?: boolean;
}

export default function CTA({
  children,
  href,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  className = "",
  onClick,
  external = false,
}: CTAProps) {
  const buttonContent = (
    <>
      {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </>
  );

  const buttonProps = {
    variant: variant as any,
    size: size as any,
    className: cn("focus-visible transform hover:scale-105 transition-all", className),
    onClick,
    "data-testid": "cta-button",
  };

  if (href) {
    if (external || href.startsWith("http")) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          <Button {...buttonProps}>{buttonContent}</Button>
        </a>
      );
    }

    return (
      <Link href={href}>
        <Button {...buttonProps}>{buttonContent}</Button>
      </Link>
    );
  }

  return <Button {...buttonProps}>{buttonContent}</Button>;
}
