import { profile } from "../data/profile";

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-20 px-6 py-16 mid:px-10 mid:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="contact-heading"
          className="border-t border-line pt-5 font-mono text-[0.8125rem] tracking-[0.18em] text-muted uppercase"
        >
          Contact
        </h2>

        <div className="mt-10 mid:mt-14">
          <a
            href={`mailto:${profile.email}`}
            className="inline-block max-w-full text-[clamp(1.375rem,4vw,2.75rem)] leading-[1.15] tracking-[-0.02em] text-accent underline decoration-accent/40 underline-offset-[6px] transition-colors duration-[120ms] [overflow-wrap:anywhere] hover:decoration-accent"
          >
            {profile.email}
          </a>

          <p className="mt-6 max-w-[46ch] text-base leading-[1.65] text-muted">
            If you're hiring for full-stack or backend work, email or call—either
            reaches me directly.
          </p>

          <div className="mt-8 flex flex-col gap-3 text-base sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8">
            <a
              href={`tel:${profile.phone.replace(/\s+/g, "")}`}
              className="inline-block text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-[120ms] hover:decoration-accent"
            >
              {profile.phone}
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-[120ms] hover:decoration-accent"
            >
              github.com/FiereEinar
              <span aria-hidden="true" className="ml-1 font-mono text-xs">
                ↗
              </span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line px-6 py-10 mid:px-10">
      <div className="mx-auto max-w-6xl font-mono text-[0.8125rem] tracking-[0.04em] text-muted">
        <p>
          {profile.name} · {year}
        </p>
      </div>
    </footer>
  );
}
