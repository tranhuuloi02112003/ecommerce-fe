import clsx from "clsx";
import { Link } from "react-router-dom";
import React from "react";

type ButtonProps = {
  to?: string;
  href?: string;
  variant?: "primary" | "outline" | "text";
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

const Button = ({
  to,
  href,
  variant = "primary",
  disabled = false,
  className,
  children,
  onClick,
  ...rest
}: ButtonProps) => {
  let Comp: React.ElementType = "button";
  const props: Record<string, unknown> = { onClick, ...rest };

  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith("on") && typeof props[key] === "function") {
        delete props[key];
      }
    });
  }

  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = "a";
  }

  const baseClasses =
    "inline-flex items-center justify-center h-[56px] font-medium text-[1.6rem] leading-normal";

  const variantClasses = {
    // primary: "bg-red",
    // outline: "",
    primary: "bg-[var(--primary)] text-white rounded-[4px]",
    outline: "border border-black/40 rounded-[4px]",
    text: "bg-transparent text-[var(--primary)] font-normal",
  };

  const classes = clsx(
    baseClasses,
    variantClasses[variant],
    disabled && "opacity-50 pointer-events-none",
    className
  );

  return (
    <Comp className={classes} {...props}>
      {children}
    </Comp>
  );
};

export default Button;
