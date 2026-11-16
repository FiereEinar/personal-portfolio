import { profile } from "../data/profile";

export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-label"
      className="scroll-mt-20 px-6 py-16 mid:px-10 mid:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="experience-label"
          className="font-mono text-[0.8125rem] tracking-[0.18em] text-muted uppercase"
        >
          Experience
        </h2>

        <div className="mt-12 ml-3 mid:ml-36">
          {profile.experience.map((entry) => (
            <article
              key={`${entry.period}-${entry.title}`}
              className="relative border-l border-line pb-12 pl-6 last:border-l-transparent last:pb-0 mid:pl-8"
            >
              {/* ── Timeline Node ── */}
              <span
                aria-hidden="true"
                className="absolute -left-[7px] top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-line bg-surface"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              </span>

              {/* ── Desktop Period (Left of Timeline) ── */}
              <p className="hidden font-mono text-[0.8125rem] tracking-[0.06em] text-muted mid:absolute mid:-left-36 mid:top-1 mid:block mid:w-28 mid:text-right">
                {entry.period}
              </p>

              {/* ── Mobile Period (Above Title) ── */}
              <p className="mb-1 font-mono text-[0.8125rem] tracking-[0.06em] text-accent mid:hidden">
                {entry.period}
              </p>

              {/* ── Role & Organization ── */}
              <h3 className="text-[clamp(1.25rem,1.8vw,1.5rem)] leading-[1.25] tracking-[-0.01em] text-ink">
                {entry.title}
              </h3>

              <p className="mt-1 text-base leading-[1.65] text-muted">{entry.org}</p>

              {/* ── Key Highlights ── */}
              <ul className="mt-5 max-w-[58ch] space-y-2 text-base leading-[1.65] text-muted">
                {entry.points.map((point) => (
                  <li
                    key={point}
                    className="relative pl-4 before:absolute before:top-[0.7em] before:left-0 before:h-px before:w-2 before:bg-line before:content-['']"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
