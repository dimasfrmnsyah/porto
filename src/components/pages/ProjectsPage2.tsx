"use client";

import { portfolioData } from "@/data/portfolio";

export function ProjectsPage2() {
  const projects = portfolioData.projects.slice(2, 4);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-base md:text-lg text-retro-brick tracking-[0.12em]">
        PROJECTS 2/2
      </h1>

      {projects.map((project) => {
        const hasDemoLink = Boolean(project.demoLink);
        const hasRepoLink = Boolean(project.repoLink);
        const hasLinks = hasDemoLink || hasRepoLink;

        return (
          <div
            key={project.id}
            className="bg-retro-paper border-2 border-retro-ink p-3 shadow-[3px_3px_0_#2b1f1a]"
          >
            <h3 className="text-xs md:text-sm text-retro-teal mb-2">
              {project.title}
            </h3>
            <p className="text-[9px] md:text-[10px] text-retro-ink/80 mb-2">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1 mb-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-[8px] bg-retro-gold border-2 border-retro-ink px-1.5 py-0.5"
                >
                  {tech}
                </span>
              ))}
            </div>
            {hasLinks ? (
              <div className="flex gap-3 text-[9px] md:text-[10px]">
                {hasDemoLink ? (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-retro-brick underline"
                  >
                    DEMO
                  </a>
                ) : null}
                {hasRepoLink ? (
                  <a
                    href={project.repoLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-retro-teal underline"
                  >
                    CODE
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>
        );
      })}

    
    </div>
  );
}
