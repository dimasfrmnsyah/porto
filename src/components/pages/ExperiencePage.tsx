"use client";

import { portfolioData } from "@/data/portfolio";

export function ExperiencePage() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-base md:text-lg text-retro-teal tracking-[0.12em]">
        EXPERIENCE
      </h1>

      <div className="space-y-4">
        {portfolioData.experience.map((exp) => (
          <div
            key={exp.id}
            className="relative pl-4 border-l-4 border-retro-brick"
          >
            <div className="absolute -left-3 w-4 h-4 bg-retro-brick border-2 border-retro-ink" />
            <h3 className="text-xs md:text-sm text-retro-ink">
              {exp.title}
            </h3>
            <p className="text-[9px] md:text-[10px] text-retro-ink/70">
              {exp.company}
            </p>
            <p className="text-[9px] md:text-[10px] text-retro-ink/60 mb-1">
              {exp.period}
            </p>
            <p className="text-[9px] md:text-[10px] text-retro-ink/80">
              {exp.description}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
