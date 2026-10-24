import { useEffect, useState } from "react";
import { profile } from "../data/profile";

type NavProps = {
  page?: "home" | "projects";
};

const base = import.meta.env.BASE_URL;
const projectsHref = `${base}projects.html`;
const homeHref = base;

export default function Nav({ page = "home" }: NavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const projectsCurrent =
    page === "projects" ? ({ "aria-current": "page" } as const) : {};

  return (
    <nav
      aria-label="Primary"
      data-scrolled={scrolled ? "true" : "false"}
      className="fixed inset-x-0 top-0 z-50 h-14 border-b border-transparent bg-bg transition-colors duration-[120ms] data-[scrolled=true]:border-line"
    >
      <div className="flex h-full items-center justify-between px-6 mid:px-10">
        <a
          href={page === "home" ? "#hero" : homeHref}
          className="inline-flex min-h-11 items-center font-mono text-sm font-medium tracking-[0.18em] text-ink"
        >
          NXM
        </a>

        <div className="flex items-center gap-6 text-sm">
          {page === "projects" ? (
            <a
              href={homeHref}
              data-testid="nav-home-desktop"
              className="hidden min-h-11 items-center text-muted underline decoration-transparent underline-offset-4 transition-colors duration-[120ms] hover:text-ink hover:decoration-line mid:inline-flex"
            >
              Home
            </a>
          ) : null}

          <a
            href={projectsHref}
            {...projectsCurrent}
            data-testid="nav-projects-desktop"
            className="hidden min-h-11 items-center text-muted underline decoration-transparent underline-offset-4 transition-colors duration-[120ms] hover:text-ink hover:decoration-line mid:inline-flex"
          >
            Projects
          </a>

          <a
            href={`mailto:${profile.email}`}
            className="hidden min-h-11 items-center text-muted underline decoration-transparent underline-offset-4 transition-colors duration-[120ms] hover:text-ink hover:decoration-line mid:inline-flex"
          >
            Email
          </a>

          <div className="flex items-center gap-2.5 text-[0.8125rem] mid:hidden">
            <a
              href={page === "home" ? "#work" : homeHref}
              className="inline-flex min-h-11 items-center text-muted underline decoration-transparent underline-offset-4 transition-colors duration-[120ms] hover:text-ink hover:decoration-line"
            >
              {page === "home" ? "Work" : "Home"}
            </a>
            <a
              href={projectsHref}
              {...projectsCurrent}
              data-testid="nav-projects-mobile"
              className="inline-flex min-h-11 items-center text-muted underline decoration-transparent underline-offset-4 transition-colors duration-[120ms] hover:text-ink hover:decoration-line"
            >
              Projects
            </a>
            <a
              href={page === "home" ? "#experience" : `${base}#experience`}
              className="inline-flex min-h-11 items-center text-muted underline decoration-transparent underline-offset-4 transition-colors duration-[120ms] hover:text-ink hover:decoration-line"
            >
              Experience
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-11 items-center text-muted underline decoration-transparent underline-offset-4 transition-colors duration-[120ms] hover:text-ink hover:decoration-line"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
