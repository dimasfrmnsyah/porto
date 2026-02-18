"use client";

import { portfolioData } from "@/data/portfolio";

export function AboutPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-base md:text-lg text-retro-brick mb-3 tracking-[0.12em]">
          ABOUT ME
        </h1>
        <p className="text-[10px] md:text-xs text-retro-ink/80 leading-relaxed">
          {portfolioData.personal.bio}
        </p>
      </div>

      <div>
        <h2 className="text-xs md:text-sm text-retro-teal mb-2 tracking-[0.1em]">
          CORE STACK
        </h2>
        <div className="flex flex-wrap gap-2">
          {portfolioData.personal.coreStack.map((tech) => (
            <div
              key={tech}
              className="bg-retro-mint text-retro-ink px-2 py-1 border-2 border-retro-ink text-[9px] md:text-[10px]"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>

     
    </div>
  );
}
