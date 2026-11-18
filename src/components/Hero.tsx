import type { ReactNode } from 'react';
import { profile } from '../data/profile';

function CodeIcon() {
  return (
    <svg
      className="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg
      className="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg
      className="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg
      className="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function Chip({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-[0.22rem] align-middle font-mono text-[0.8rem] leading-none whitespace-nowrap text-ink">
      <span aria-hidden="true" className="flex items-center">
        {icon}
      </span>
      <span className="font-medium tracking-[-0.01em]">{children}</span>
    </span>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      data-testid="hero"
      className="scroll-mt-20 px-6 pt-20 pb-16 mid:px-10 mid:pt-32 mid:pb-24"
    >
      <div className="mx-auto max-w-6xl mid:grid mid:grid-cols-[auto_1fr] mid:items-center mid:gap-14">
        {/* ── Portrait ── */}
        <div className="mb-10 aspect-square w-full max-w-[240px] shrink-0 overflow-hidden rounded-full border border-line mid:mb-0 mid:max-w-[320px]">
          <img
            src={`${import.meta.env.BASE_URL}profile-pic2.jpg`}
            width={900}
            height={1200}
            alt="Nick Xylan Melloria"
            fetchPriority="high"
            className="h-full w-full object-cover object-[50%_20%]"
          />
        </div>

        {/* ── Content ── */}
        <div>
          <h1 className="max-w-[14ch] text-[clamp(2.75rem,5.5vw,4.5rem)] leading-[1.02] tracking-[-0.03em] text-ink">
            {profile.name}
          </h1>

          <div className="mt-7 max-w-[56ch] space-y-4 text-[1.05rem] leading-[1.95] text-muted">
            <p>
              I'm a <Chip icon={<CodeIcon />}>full-stack</Chip> developer. I
              build <Chip icon={<ZapIcon />}>real-time systems</Chip>,{' '}
              <Chip icon={<LayersIcon />}>multi-tenant platforms</Chip>, and the
              APIs behind them.
            </p>
            <p>
              These days I'm <Chip icon={<BriefcaseIcon />}>open to roles</Chip>{' '}
              in software engineering.
            </p>
          </div>

          <p className="mt-4 font-mono text-[0.8125rem] tracking-[0.06em] text-muted">
            {profile.degree}
          </p>

          {/* ── Restored Social links ── */}
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
        </div>
      </div>
    </section>
  );
}
