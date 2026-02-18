"use client";

import Image from "next/image";

import { portfolioData } from "@/data/portfolio";

export function CoverPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
      <div className="relative">
        <div className="bg-retro-paper border-4 border-retro-ink p-2 shadow-[3px_3px_0_#2b1f1a]">
          <div className="bg-retro-paper-deep border-2 border-retro-ink p-1">
            <Image
              src="/pp.png"
              alt={`Foto ${portfolioData.personal.name}`}
              width={160}
              height={160}
              className="block h-24 w-24 md:h-32 md:w-32 object-cover"
              priority
            />
          </div>
        </div>
        <div className="absolute -top-2 -left-2 w-3 h-3 bg-retro-gold border-2 border-retro-ink" />
        <div className="absolute -top-2 -right-2 w-3 h-3 bg-retro-teal border-2 border-retro-ink" />
        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-retro-teal border-2 border-retro-ink" />
        <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-retro-gold border-2 border-retro-ink" />
      </div>

      <div className="space-y-2">
        <div className="text-lg md:text-2xl text-retro-ink tracking-[0.2em]">
          {portfolioData.personal.name}
        </div>
        <div className="text-xs md:text-sm text-retro-brick tracking-[0.1em]">
          {portfolioData.personal.role}
        </div>
        <p className="text-[10px] md:text-xs text-retro-ink/80 max-w-xs mx-auto">
          {portfolioData.personal.tagline}
        </p>
      </div>

      <div className="flex gap-2 justify-center">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 border-2 border-retro-ink ${
              i % 2 === 0 ? "bg-retro-teal" : "bg-retro-gold"
            }`}
          />
        ))}
      </div>

      <div className="text-[9px] md:text-[10px] text-retro-ink/70 animate-pulse">
        OPEN BOOK WITH NEXT
      </div>
    </div>
  );
}
