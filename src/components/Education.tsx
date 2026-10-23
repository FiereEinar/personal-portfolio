import { profile } from "../data/profile";

export default function Education() {
  return (
    <section
      id="education"
      aria-labelledby="education-label"
      className="scroll-mt-20 px-6 py-16 mid:px-10 mid:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="education-label"
          className="font-mono text-[0.8125rem] tracking-[0.18em] text-muted uppercase"
        >
          Education
        </h2>

        <div className="mt-10">
          {profile.education.map((entry) => (
            <div
              key={entry.school}
              className="border-t border-line py-8 first:border-t-0 mid:grid mid:grid-cols-[1fr_13rem] mid:items-baseline mid:gap-12"
            >
              <div>
                <h3 className="text-[clamp(1.125rem,1.6vw,1.375rem)] leading-[1.3] tracking-[-0.01em] text-ink">
                  {entry.school}
                </h3>
                <p className="mt-1 text-base leading-[1.65] text-muted">{entry.program}</p>
              </div>

              <p className="mt-2 font-mono text-[0.8125rem] tracking-[0.06em] text-muted mid:mt-0 mid:text-right">
                {entry.period}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
