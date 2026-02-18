"use client";

import React, {
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Page } from "./Page";

interface BookProps {
  currentPage: number;
  maxPages: number;
  pages: ReactNode[];
  soundEnabled?: boolean;
  isSpread?: boolean;
  onPageChange?: (page: number) => void;
}

type BookSize = {
  width: number;
  height: number;
};

export type BookHandle = {
  next: () => void;
  prev: () => void;
  isReady: () => boolean;
};

export const Book = forwardRef<BookHandle, BookProps>(function Book(
  {
    currentPage,
    maxPages,
    pages,
    soundEnabled = false,
    isSpread = true,
    onPageChange,
  },
  ref
) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const turnRef = useRef<any>(null);
  const [scriptsReady, setScriptsReady] = useState(false);
  const [size, setSize] = useState<BookSize>({ width: 0, height: 0 });
  const [audioAvailable, setAudioAvailable] = useState(true);
  const currentPageRef = useRef(currentPage);
  const onPageChangeRef = useRef(onPageChange);

  const hasTurnInstance = (book: any) =>
    Boolean(book && typeof book.data === "function" && book.data("opts"));

  const playFallbackSound = () => {
    if (typeof window === "undefined") return;
    const AudioContextCtor =
      (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextCtor) return;

    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContextCtor();
    }

    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    const duration = 0.18;
    const sampleRate = ctx.sampleRate;
    const buffer = ctx.createBuffer(
      1,
      Math.max(1, Math.round(sampleRate * duration)),
      sampleRate
    );
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) {
      const t = i / data.length;
      const envelope = (1 - t) * (1 - t);
      data[i] = (Math.random() * 2 - 1) * envelope;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1200;
    filter.Q.value = 0.7;
    const gain = ctx.createGain();
    gain.gain.value = 0.22;

    source.connect(filter).connect(gain).connect(ctx.destination);
    source.start();
  };

  const resolveBook = () => {
    const $ = (window as any).$ as any;
    if (!$ || !$.fn?.turn) return null;
    if (turnRef.current && hasTurnInstance(turnRef.current)) {
      return turnRef.current;
    }
    if (!bookRef.current) return null;
    const $book = $(bookRef.current);
    if (hasTurnInstance($book)) {
      turnRef.current = $book;
      return $book;
    }
    return null;
  };

  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  useEffect(() => {
    onPageChangeRef.current = onPageChange;
  }, [onPageChange]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleError = () => setAudioAvailable(false);
    const handleMetadata = () => {
      if (!Number.isFinite(audio.duration) || audio.duration <= 0) {
        setAudioAvailable(false);
      }
    };

    audio.addEventListener("error", handleError);
    audio.addEventListener("loadedmetadata", handleMetadata);

    return () => {
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("loadedmetadata", handleMetadata);
    };
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      next: () => {
        const $book = resolveBook();
        if ($book) {
          $book.turn("next");
          return;
        }
        if (onPageChangeRef.current) {
          onPageChangeRef.current(Math.min(currentPageRef.current + 1, maxPages));
        }
      },
      prev: () => {
        const $book = resolveBook();
        if ($book) {
          $book.turn("previous");
          return;
        }
        if (onPageChangeRef.current) {
          onPageChangeRef.current(Math.max(currentPageRef.current - 1, 1));
        }
      },
      isReady: () => Boolean(resolveBook()),
    }),
    [maxPages]
  );

  useEffect(() => {
    if (!soundEnabled) return;

    const audio = audioRef.current;
    if (audio && audioAvailable) {
      audio.volume = 0.3;
      audio.currentTime = 0;
      audio.play().catch(() => {
        playFallbackSound();
      });
      return;
    }

    playFallbackSound();
  }, [currentPage, soundEnabled, audioAvailable]);

  useEffect(() => {
    if (!bookRef.current) return;

    const updateSize = () => {
      const rect = bookRef.current?.getBoundingClientRect();
      if (!rect) return;
      setSize({
        width: Math.max(1, Math.round(rect.width)),
        height: Math.max(1, Math.round(rect.height)),
      });
    };

    updateSize();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateSize);
      return () => window.removeEventListener("resize", updateSize);
    }

    const observer = new ResizeObserver(updateSize);
    observer.observe(bookRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let mounted = true;

    const loadScript = (src: string, onLoad: () => void) => {
      const existing = document.querySelector<HTMLScriptElement>(
        `script[src="${src}"]`
      );
      if (existing) {
        if (existing.dataset.loaded === "true") {
          onLoad();
        } else {
          existing.addEventListener("load", onLoad, { once: true });
        }
        return;
      }
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = () => {
        script.dataset.loaded = "true";
        onLoad();
      };
      document.body.appendChild(script);
    };

    const waitForTurn = (attempt = 0) => {
      if (!mounted) return;
      const hasJquery = typeof (window as any).$ !== "undefined";
      const hasTurn = hasJquery && typeof (window as any).$.fn?.turn !== "undefined";
      if (hasTurn) {
        setScriptsReady(true);
        return;
      }
      if (attempt < 40) {
        setTimeout(() => waitForTurn(attempt + 1), 150);
      }
    };

    const setupTurn = () => {
      if (!mounted) return;
      const hasJquery = typeof (window as any).$ !== "undefined";
      const hasTurn = hasJquery && typeof (window as any).$.fn?.turn !== "undefined";
      if (hasTurn) {
        setScriptsReady(true);
        return;
      }

      if (!hasJquery) {
        loadScript("/vendor/jquery.min.js", () => {
          loadScript("/vendor/turn.min.js", () => {
            waitForTurn();
          });
        });
        return;
      }

      loadScript("/vendor/turn.min.js", () => {
        waitForTurn();
      });
    };

    setupTurn();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!scriptsReady || !bookRef.current) return;
    const $ = (window as any).$ as any;
    if (!$.fn?.turn) return;

    const $book = $(bookRef.current);
    turnRef.current = $book;

    if (!hasTurnInstance($book)) {
      const displayMode = isSpread ? "double" : "single";
      $book.turn({
        width: size.width || 960,
        height: size.height || 720,
        autoCenter: true,
        display: displayMode,
        gradients: true,
        acceleration: true,
        elevation: 90,
        duration: 1100,
        page: Math.min(currentPage, maxPages),
        when: {
          turning: () => {
            $book.addClass("is-turning");
          },
          turned: (_event: unknown, page: number) => {
            $book.removeClass("is-turning");
            if (
              onPageChangeRef.current &&
              page !== currentPageRef.current
            ) {
              onPageChangeRef.current(page);
            }
          },
        },
      });
    }

    return () => {
      if (hasTurnInstance($book)) {
        $book.turn("destroy");
      }
    };
  }, [scriptsReady]);

  useEffect(() => {
    const $book = resolveBook();
    if (!$book) return;
    if (size.width && size.height) {
      $book.turn("size", size.width, size.height);
    }
  }, [size]);

  useEffect(() => {
    const $book = resolveBook();
    if (!$book) return;
    const displayMode = isSpread ? "double" : "single";
    $book.turn("display", displayMode);
    const activePage = $book.turn("page");
    if (activePage !== currentPage) {
      $book.turn("page", currentPage);
    }
  }, [isSpread, currentPage]);

  return (
    <div
      className="relative w-full max-w-5xl aspect-[4/5] md:aspect-[3/2] mx-auto"
      style={{
        perspective: "1400px",
        transformStyle: "preserve-3d",
      }}
    >
      <audio
        ref={audioRef}
        src="/sfx/page-flip.mp3"
        preload="auto"
      />

      <div
        className="relative w-full h-full rounded-none border-4 border-retro-ink bg-gradient-to-b from-[#9b5c36] via-[#7e4420] to-[#5f3218] p-3 md:p-4"
        style={{
          transformStyle: "preserve-3d",
          boxShadow:
            "inset -16px 0 28px rgba(0,0,0,0.35), inset 16px 0 24px rgba(255,255,255,0.1), 0 18px 0 #2b1f1a, 0 28px 40px rgba(43,31,26,0.35)",
        }}
      >
        <div
          ref={bookRef}
          className="turn-book relative w-full h-full"
          aria-live="polite"
        >
          {!scriptsReady && (
            <div className="absolute inset-0 flex items-center justify-center text-[10px] text-retro-ink/60">
              LOADING BOOK ENGINE...
            </div>
          )}
          {pages.map((page, index) => {
            const pageNumber = index + 1;
            const isCover = index === 0;
            const isLeftPage = pageNumber % 2 === 0;

            return (
              <Page
                key={`page-${pageNumber}`}
                isLeftPage={isLeftPage}
                showTexture={!isCover}
                className={`turn-page page ${
                  isCover
                    ? "hard bg-retro-gold shadow-[inset_6px_0_0_rgba(0,0,0,0.2)]"
                    : ""
                }`}
              >
                {page}
              </Page>
            );
          })}
        </div>
      </div>
    </div>
  );
});
