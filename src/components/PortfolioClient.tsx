"use client";

import { usePageNavigation } from "@/hooks/usePageNavigation";
import { useEffect, useRef, useState } from "react";
import { Book, type BookHandle } from "@/components/Book";
import { PixelButton } from "@/components/PixelButton";
import { CoverPage } from "@/components/pages/CoverPage";
import { AboutPage } from "@/components/pages/AboutPage";
import { SkillsPage } from "@/components/pages/SkillsPage";
import { ProjectsPage1 } from "@/components/pages/ProjectsPage1";
import { ProjectsPage2 } from "@/components/pages/ProjectsPage2";
import { ExperiencePage } from "@/components/pages/ExperiencePage";
import { EducationPage } from "@/components/pages/EducationPage";
import { ContactPage } from "@/components/pages/ContactPage";

const PAGES = [
  <CoverPage key="cover" />,
  <AboutPage key="about" />,
  <SkillsPage key="skills" />,
  <ProjectsPage1 key="projects1" />,
  <ProjectsPage2 key="projects2" />,
  <ExperiencePage key="experience" />,
  <EducationPage key="education" />,
  <ContactPage key="contact" />,
];

const MAX_PAGES = PAGES.length;

export function PortfolioClient() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const { currentPage, isMounted, goToPage } =
    usePageNavigation(MAX_PAGES);
  const [isSpread, setIsSpread] = useState(true);
  const bookRef = useRef<BookHandle>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(min-width: 768px)");
    const handleChange = () => setIsSpread(media.matches);
    handleChange();
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  const handleNext = () => {
    if (bookRef.current?.isReady()) {
      bookRef.current.next();
      return;
    }
    goToPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (bookRef.current?.isReady()) {
      bookRef.current.prev();
      return;
    }
    goToPage(currentPage - 1);
  };

  useEffect(() => {
    if (!isMounted) return;
  }, [isMounted]);

  const pageLabel =
    isSpread && currentPage > 1
      ? `${currentPage}-${Math.min(currentPage + 1, MAX_PAGES)}`
      : `${currentPage}`;

  const canNext = currentPage < MAX_PAGES;
  const canPrev = currentPage > 1;

  useEffect(() => {
    if (!isMounted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        if (canNext) handleNext();
      } else if (e.key === "ArrowLeft") {
        if (canPrev) handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMounted, canNext, canPrev, handleNext, handlePrev]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-6 md:py-10 bg-gradient-to-br from-retro-sky via-[#f6e6c6] to-retro-mint relative overflow-hidden">
      <div className="absolute inset-0 pixel-grid opacity-25 pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center gap-6 md:gap-8">
        <div className="flex items-center justify-between w-full flex-wrap gap-3">
          <div className="text-[10px] md:text-xs text-retro-ink bg-retro-paper px-3 py-2 border-2 border-retro-ink shadow-[3px_3px_0_#2b1f1a]">
            WEB DEV LOGBOOK
          </div>
          <button
            onClick={() => setSoundEnabled((prev) => !prev)}
            className={`px-3 py-2 border-2 text-[9px] md:text-[10px] font-bold transition-all ${
              soundEnabled
                ? "border-retro-ink bg-retro-gold text-retro-ink shadow-[3px_3px_0_#2b1f1a]"
                : "border-retro-ink/60 bg-retro-paper text-retro-ink/70"
            }`}
          >
            SOUND: {soundEnabled ? "ON" : "OFF"}
          </button>
        </div>

        <Book
          ref={bookRef}
          currentPage={currentPage}
          maxPages={MAX_PAGES}
          pages={PAGES}
          soundEnabled={soundEnabled}
          isSpread={isSpread}
          onPageChange={goToPage}
        />

        <div className="flex items-center justify-center gap-4 md:gap-6 w-full flex-wrap">
          <PixelButton
            onClick={handlePrev}
            disabled={!canPrev}
            variant="secondary"
          >
            PREV
          </PixelButton>

          <div className="text-[10px] md:text-xs text-retro-ink bg-retro-paper px-3 py-2 border-2 border-retro-ink shadow-[3px_3px_0_#2b1f1a]">
            PAGE {pageLabel} / {MAX_PAGES}
          </div>

          <PixelButton
            onClick={handleNext}
            disabled={!canNext}
            variant="primary"
          >
            NEXT
          </PixelButton>
        </div>

        <div className="text-[9px] md:text-[10px] text-retro-ink/70 text-center">
          USE ARROW KEYS TO TURN PAGES
        </div>
      </div>
    </div>
  );
}
