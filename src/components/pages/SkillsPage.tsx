"use client";

import { portfolioData } from "@/data/portfolio";

export function SkillsPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-base md:text-lg text-retro-teal tracking-[0.12em]">
          SKILLS
        </h1>
      </div>

      {portfolioData.skills.map((category, index) => (
        <div key={category.category}>
          <h2
            className={`text-xs md:text-sm mb-2 tracking-[0.08em] ${
              index % 2 === 0 ? "text-retro-brick" : "text-retro-ink"
            }`}
          >
            {category.category.toUpperCase()}
          </h2>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill) => (
              <div
                key={skill}
                className="bg-retro-paper-deep text-retro-ink px-2 py-1 border-2 border-retro-ink text-[9px] md:text-[10px]"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      ))}

     
    </div>
  );
}
