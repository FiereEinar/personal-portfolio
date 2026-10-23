import { useEffect, useState } from "react";
import { profile } from "../data/profile";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Primary"
      data-scrolled={scrolled ? "true" : "false"}
      className="fixed inset-x-0 top-0 z-50 h-14 border-b border-transparent bg-bg transition-colors duration-[120ms] data-[scrolled=true]:border-line"
    >
      <div className="flex h-full items-center justify-between px-6 mid:px-10">
        <a
          href="#hero"
          className="font-mono text-sm font-medium tracking-[0.18em] text-ink"
        >
          NXM
        </a>

        <div className="flex items-center gap-6 text-sm">
          <a
            href={`mailto:${profile.email}`}
            className="hidden text-muted underline decoration-transparent underline-offset-4 transition-colors duration-[120ms] hover:text-ink hover:decoration-line mid:inline"
          >
            Email
          </a>

          <div className="flex items-center gap-5 mid:hidden">
            <a
              href="#work"
              className="text-muted underline decoration-transparent underline-offset-4 transition-colors duration-[120ms] hover:text-ink hover:decoration-line"
            >
              Work
            </a>
            <a
              href="#experience"
              className="text-muted underline decoration-transparent underline-offset-4 transition-colors duration-[120ms] hover:text-ink hover:decoration-line"
            >
              Experience
            </a>
            <a
              href="#contact"
              className="text-muted underline decoration-transparent underline-offset-4 transition-colors duration-[120ms] hover:text-ink hover:decoration-line"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
