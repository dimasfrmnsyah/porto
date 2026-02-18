"use client";

import { portfolioData } from "@/data/portfolio";

export function EducationPage() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-base md:text-lg text-retro-brick tracking-[0.12em]">
        EDUCATION
      </h1>

      <div className="space-y-3">
        {portfolioData.education.map((edu) => (
          <div
            key={edu.id}
            className="bg-retro-paper border-2 border-retro-ink p-3"
          >
            <h3 className="text-[10px] md:text-xs text-retro-ink">
              {edu.degree}
            </h3>
            <p className="text-[9px] md:text-[10px] text-retro-ink/70">
              {edu.institution}
            </p>
            <p className="text-[9px] md:text-[10px] text-retro-ink/60">
              {edu.field} · {edu.year}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
