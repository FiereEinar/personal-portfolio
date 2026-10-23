import { useEffect, useRef, useState } from "react";
import { SECTIONS } from "../data/sections";

const ACTIVE_LINE = 0.4;

type Reading = {
  activeId: string;
  progress: number;
};

function read(): Reading {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress =
    scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;

  const line = window.innerHeight * ACTIVE_LINE;
  let activeId: string = SECTIONS[0].id;

  for (const section of SECTIONS) {
    const element = document.getElementById(section.id);
    if (element && element.getBoundingClientRect().top <= line) {
      activeId = section.id;
    }
  }

  // Short last sections can never cross the 40% line; at the end of the page
  // the final checkpoint is the truthful one.
  if (scrollable > 0 && window.scrollY >= scrollable - 2) {
    activeId = SECTIONS[SECTIONS.length - 1].id;
  }

  return { activeId, progress };
}

export default function CheckpointRail() {
  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id);
  const [progress, setProgress] = useState(0);
  const current = useRef<Reading>({ activeId: SECTIONS[0].id, progress: 0 });

  useEffect(() => {
    let frame: number | null = null;

    const update = () => {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
        frame = null;
      }

      const next = read();
      if (next.progress !== current.current.progress) {
        current.current.progress = next.progress;
        setProgress(next.progress);
      }
      if (next.activeId !== current.current.activeId) {
        current.current.activeId = next.activeId;
        setActiveId(next.activeId);
      }
    };

    const onScroll = () => {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(update);
    };

    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
        frame = null;
      }
    };
  }, []);

  const activeIndex = SECTIONS.findIndex((section) => section.id === activeId);

  return (
    <>
      <nav
        aria-label="Sections"
        data-testid="checkpoint-rail"
        className="fixed top-1/2 left-6 z-40 hidden h-[58vh] w-px -translate-y-1/2 bg-line mid:block"
      >
        <span
          aria-hidden="true"
          data-testid="rail-fill"
          className="absolute inset-0 origin-top bg-accent"
          style={{ transform: `scaleY(${progress})` }}
        />

        {SECTIONS.map((section, index) => {
          const active = section.id === activeId;
          const passed = index <= activeIndex;

          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-current={active ? "true" : undefined}
              className="absolute left-[-5px] flex h-11 -translate-y-1/2 items-center pr-4"
              style={{ top: `${(index / (SECTIONS.length - 1)) * 100}%` }}
            >
              <span
                aria-hidden="true"
                className={`h-[9px] w-[9px] shrink-0 transition-colors duration-[120ms] ${
                  passed ? "bg-accent" : "bg-line"
                }`}
              />
              <span
                className={`ml-4 font-mono text-[0.625rem] tracking-[0.14em] whitespace-nowrap transition-colors duration-[120ms] ${
                  passed ? "text-ink" : "text-muted"
                }`}
              >
                <span className="mr-2">{section.index}</span>
                {section.label}
              </span>
            </a>
          );
        })}
      </nav>

      <div
        aria-hidden="true"
        data-testid="mobile-progress"
        className="fixed inset-x-0 top-14 z-40 h-0.5 mid:hidden"
      >
        <div
          className="h-full origin-left bg-accent"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </>
  );
}
