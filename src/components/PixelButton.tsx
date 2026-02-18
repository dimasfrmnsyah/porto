"use client";

import React from "react";

interface PixelButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  type?: "button" | "submit" | "reset";
}

export function PixelButton({
  onClick,
  disabled = false,
  children,
  variant = "primary",
  className = "",
  type = "button",
}: PixelButtonProps) {
  const baseClasses =
    "px-5 py-3 text-[10px] md:text-xs font-bold border-4 uppercase tracking-[0.12em] transition-all duration-75 active:translate-x-1 active:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary:
      "border-retro-ink bg-retro-gold text-retro-ink hover:bg-[#f4c76a] active:shadow-none",
    secondary:
      "border-retro-ink bg-retro-mint text-retro-ink hover:bg-[#97dfd0] active:shadow-none",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{
        textShadow: "2px 2px 0 rgba(0,0,0,0.25)",
        boxShadow: disabled ? "none" : "4px 4px 0 rgba(43,31,26,0.5)",
      }}
    >
      {children}
    </button>
  );
}
