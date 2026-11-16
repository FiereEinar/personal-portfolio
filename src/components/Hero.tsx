import { profile } from "../data/profile";

export default function Hero() {
  return (
    <section
      id="hero"
      data-testid="hero"
      className="scroll-mt-20 flex min-h-[80svh] flex-col justify-center px-6 py-20 mid:pr-16"
    >
      {/* Contained portrait */}
      <div className="mb-8 h-44 w-44 overflow-hidden rounded-full ring-1 ring-line">
        <img
          src={`${import.meta.env.BASE_URL}profile-pic.png`}
          width={900}
          height={1200}
          alt="Nick Xylan Melloria"
          fetchPriority="high"
          className="h-full w-full object-cover object-[50%_20%] saturate-[.82] contrast-[1.03]"
        />
      </div>

      <h1 className="max-w-[12ch] text-[clamp(2.75rem,6vw,5rem)] leading-[1.02] tracking-[-0.03em] text-ink">
        {profile.name}
      </h1>

      <p className="mt-6 max-w-[46ch] text-base leading-[1.65] text-muted">{profile.role}</p>

      <p className="mt-4 font-mono text-[0.8125rem] tracking-[0.06em] text-muted">
        {profile.degree}
      </p>

      <div className="mt-8 flex items-center gap-6 text-base">
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-[120ms] hover:decoration-accent"
        >
          GitHub
          <span aria-hidden="true" className="ml-1 font-mono text-xs">
            ↗
          </span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        <a
          href={`mailto:${profile.email}`}
          className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-[120ms] hover:decoration-accent"
        >
          Email
        </a>
      </div>

      <p className="mt-8 font-mono text-[0.8125rem] tracking-[0.06em] text-muted">
        {profile.status}
      </p>
    </section>
  );
}
