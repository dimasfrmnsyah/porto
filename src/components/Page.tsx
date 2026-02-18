"use client";

import React from "react";

interface PageProps {
  isLeftPage?: boolean;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  showTexture?: boolean;
}

export function Page({
  isLeftPage = false,
  children,
  className = "",
  contentClassName = "",
  showTexture = true,
}: PageProps) {
  return (
    <div
      className={`relative w-full h-full bg-retro-paper overflow-hidden ${className}`}
    >
      {showTexture && (
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0,0,0,0.04) 2px,
              rgba(0,0,0,0.04) 4px
            )`,
          }}
        />
      )}

      <div
        className={`absolute inset-0 pointer-events-none ${
          isLeftPage
            ? "bg-gradient-to-l from-black/10 via-transparent to-transparent"
            : "bg-gradient-to-r from-black/10 via-transparent to-transparent"
        }`}
      />

      <div
        className={`relative w-full h-full flex flex-col overflow-y-auto p-5 md:p-7 text-[10px] md:text-xs leading-relaxed text-retro-ink ${contentClassName}`}
      >
        {children}
      </div>

      <div className="absolute inset-0 border-4 border-retro-ink pointer-events-none" />
    </div>
  );
}
