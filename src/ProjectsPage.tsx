import type { ReactNode } from "react";
import Contact, { Footer } from "./components/Contact";
import HashScroll from "./components/HashScroll";
import Nav from "./components/Nav";
import Reveal from "./components/Reveal";
import { profile } from "./data/profile";
import {
  allProjects,
  caseStudies,
  featuredProject,
  moreProjects,
  type ShowcaseProject,
} from "./data/projects";

const base = import.meta.env.BASE_URL;

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-base text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-[120ms] hover:decoration-accent"
    >
      {children}
      <span aria-hidden="true" className="font-mono text-xs">
        ↗
      </span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function ProjectVisual({ project }: { project: ShowcaseProject }) {
  if (project.image) {
    return (
      <div
        data-testid={`project-cover-${project.id}`}
        className="overflow-hidden border border-line bg-surface"
      >
        <img
          src={`${base}${project.image.src}`}
          alt={project.image.alt}
          width={project.image.width}
          height={project.image.height}
          loading="lazy"
          decoding="async"
          className={`aspect-[16/10] w-full object-cover ${
            project.image.position === "left" ? "object-left-top" : "object-top"
          }`}
        />
      </div>
    );
  }

  return (
    <div
      data-testid={`project-cover-${project.id}`}
      className="relative flex aspect-[16/10] flex-col justify-between overflow-hidden border border-line bg-surface p-6"
    >
      <p className="relative z-10 font-mono text-[0.75rem] tracking-[0.08em] text-muted">
        {project.index} / {project.category}
      </p>
      <div className="relative z-10">
        <p className="font-mono text-[0.75rem] tracking-[0.12em] text-accent uppercase">
          {project.coverLabel ?? project.category}
        </p>
        <p className="mt-2 text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[0.95] tracking-[-0.03em] text-ink">
          {project.name}
        </p>
      </div>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-3 -bottom-8 z-0 font-mono text-[9rem] leading-none text-ink/[0.045]"
      >
        {project.index}
      </span>
    </div>
  );
}

function ProjectLinks({ project }: { project: ShowcaseProject }) {
  const caseStudyHref = project.caseStudy ? `${base}#${project.caseStudy}` : undefined;

  return (
    <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
      {caseStudyHref ? (
        <a
          href={caseStudyHref}
          className="text-base text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-[120ms] hover:decoration-accent"
        >
          Read case study
        </a>
      ) : null}
      {project.live ? <ExternalLink href={project.live}>Live demo</ExternalLink> : null}
      <ExternalLink href={project.repo}>Source</ExternalLink>
    </div>
  );
}

function ProjectDetails({ project }: { project: ShowcaseProject }) {
  return (
    <ul className="mt-4 max-w-[52ch] space-y-2 text-sm leading-[1.6] text-muted">
      {project.details.map((item) => (
        <li
          key={item}
          className="relative pl-4 before:absolute before:top-[0.65em] before:left-0 before:h-px before:w-2 before:bg-line before:content-['']"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function ProjectStack({ project }: { project: ShowcaseProject }) {
  return (
    <p className="mt-5 font-mono text-[0.75rem] leading-[1.7] tracking-[0.04em] text-muted">
      <span className="text-ink">Stack</span>
      <span aria-hidden="true"> · </span>
      {project.stack.join(" · ")}
    </p>
  );
}

function FeaturedProject({ project }: { project: ShowcaseProject }) {
  return (
    <article
      id={project.id}
      data-testid="project-card"
      className="border-t border-line pt-8 mid:grid mid:grid-cols-[1fr_1.05fr] mid:items-start mid:gap-14 mid:pt-12"
    >
      <div>
        <p className="font-mono text-[0.75rem] tracking-[0.08em] text-muted">
          {project.index} / {project.category}
        </p>
        {project.note ? (
          <p className="mt-1 font-mono text-[0.75rem] tracking-[0.04em] text-muted">
            {project.note}
          </p>
        ) : null}

        <h3 className="mt-3 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] tracking-[-0.02em] text-ink">
          {project.name}
        </h3>

        <p className="mt-4 max-w-[52ch] text-base leading-[1.65] text-ink">
          {project.summary}
        </p>

        <ProjectDetails project={project} />
        <ProjectStack project={project} />
        <ProjectLinks project={project} />
      </div>

      <div className="mt-8 mid:mt-0">
        <ProjectVisual project={project} />
      </div>
    </article>
  );
}

function ProjectCard({ project }: { project: ShowcaseProject }) {
  return (
    <article id={project.id} data-testid="project-card" className="border-t border-line pt-5">
      <p className="font-mono text-[0.75rem] tracking-[0.08em] text-muted">
        {project.index} / {project.category}
      </p>

      <div className="mt-4">
        <ProjectVisual project={project} />
      </div>

      <h3 className="mt-5 text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.15] tracking-[-0.02em] text-ink">
        {project.name}
      </h3>

      <p className="mt-3 max-w-[52ch] text-base leading-[1.65] text-ink">
        {project.summary}
      </p>

      <ProjectDetails project={project} />
      <ProjectStack project={project} />
      <ProjectLinks project={project} />
    </article>
  );
}

function CaseStudyCard({ project }: { project: ShowcaseProject }) {
  return (
    <article id={project.id} data-testid="project-card" className="border-t border-line pt-6">
      <p className="font-mono text-[0.75rem] tracking-[0.08em] text-muted">
        {project.index} / {project.category}
      </p>

      <h3 className="mt-3 text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.15] tracking-[-0.02em] text-ink">
        {project.name}
      </h3>

      <p className="mt-3 max-w-[52ch] text-base leading-[1.65] text-ink">
        {project.summary}
      </p>

      <ProjectDetails project={project} />
      <ProjectStack project={project} />
      <ProjectLinks project={project} />
    </article>
  );
}

export default function ProjectsPage() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav page="projects" />
      <HashScroll />
      <main id="main" tabIndex={-1}>
        <Reveal>
          <header
            data-testid="projects-header"
            className="px-6 pt-28 pb-12 mid:px-10 mid:pt-36 mid:pb-16"
          >
            <div className="mx-auto max-w-6xl">
              <p className="font-mono text-[0.8125rem] tracking-[0.18em] text-muted uppercase">
                Projects / {String(allProjects.length).padStart(2, "0")}
              </p>
              <h1 className="mt-4 max-w-[16ch] text-[clamp(2.75rem,6vw,5rem)] leading-[1.02] tracking-[-0.03em] text-ink">
                Projects
              </h1>
              <p className="mt-6 max-w-[58ch] text-base leading-[1.65] text-muted">
                Seven projects across SaaS, games, learning tools, social apps, and a C CLI.
                SIMS and LapSync have full case studies on the home page.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
                <ExternalLink href={profile.github}>GitHub profile</ExternalLink>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-base text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-[120ms] hover:decoration-accent"
                >
                  Email
                </a>
              </div>
            </div>
          </header>
        </Reveal>

        <Reveal>
          <section
            aria-labelledby="featured-heading"
            className="px-6 py-12 mid:px-10 mid:py-16"
          >
            <div className="mx-auto max-w-6xl">
              <h2
                id="featured-heading"
                className="font-mono text-[0.8125rem] tracking-[0.18em] text-muted uppercase"
              >
                Featured build
              </h2>
              <div className="mt-8">
                <FeaturedProject project={featuredProject} />
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section
            aria-labelledby="more-projects-heading"
            className="px-6 py-16 mid:px-10 mid:py-20"
          >
            <div className="mx-auto max-w-6xl">
              <h2
                id="more-projects-heading"
                className="font-mono text-[0.8125rem] tracking-[0.18em] text-muted uppercase"
              >
                More projects
              </h2>
              <div className="mt-10 grid gap-x-10 gap-y-14 mid:grid-cols-2">
                {moreProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section
            aria-labelledby="case-studies-heading"
            className="px-6 py-16 mid:px-10 mid:py-20"
          >
            <div className="mx-auto max-w-6xl">
              <h2
                id="case-studies-heading"
                className="font-mono text-[0.8125rem] tracking-[0.18em] text-muted uppercase"
              >
                Case studies
              </h2>
              <div className="mt-10 grid gap-x-10 gap-y-12 mid:grid-cols-2">
                {caseStudies.map((project) => (
                  <CaseStudyCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <Contact />
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
