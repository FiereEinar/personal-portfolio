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

        <div className="mt-10">
          {profile.experience.map((entry) => (
            <article
              key={`${entry.period}-${entry.title}`}
              className="border-t border-line py-10 first:border-t-0 mid:grid mid:grid-cols-[13rem_1fr] mid:items-baseline mid:gap-12 mid:py-12"
            >
              <p className="font-mono text-[0.8125rem] leading-[1.7] tracking-[0.06em] text-muted">
                {entry.period}
              </p>

              <div className="mt-4 mid:mt-0">
                <h3 className="text-[clamp(1.25rem,1.8vw,1.5rem)] leading-[1.25] tracking-[-0.01em] text-ink">
                  {entry.title}
                </h3>

                <p className="mt-1 text-base leading-[1.65] text-muted">{entry.org}</p>

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
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
