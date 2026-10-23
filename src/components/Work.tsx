import { profile, type Project } from "../data/profile";
import SystemDiagram from "./SystemDiagram";

function ProjectEntry({ project }: { project: Project }) {
  const reversed = project.id === "lapsync";
  const diagram = project.diagram;
  const hasVisual = Boolean(diagram);

  return (
    <article
      id={project.id}
      className={`border-t border-line first:border-t-0 ${
        hasVisual
          ? "py-12 mid:grid mid:grid-cols-2 mid:items-start mid:gap-14 mid:py-16"
          : "py-12 mid:py-14"
      }`}
    >
      <div className={reversed ? "mid:order-2" : undefined}>
        <p className="font-mono text-[0.8125rem] tracking-[0.06em] text-muted">
          {project.index}
        </p>

        <h3 className="mt-3 text-[clamp(1.625rem,2.6vw,2.25rem)] leading-[1.15] tracking-[-0.02em] text-ink">
          {project.name}
        </h3>

        <p className="mt-4 max-w-[52ch] text-base leading-[1.65] text-ink">
          {project.summary}
        </p>

        <p className="mt-4 max-w-[58ch] text-base leading-[1.65] text-muted">
          {project.context}
        </p>

        <ul className="mt-6 max-w-[58ch] space-y-2 text-base leading-[1.65] text-muted">
          {project.build.map((item) => (
            <li
              key={item}
              className="relative pl-4 before:absolute before:top-[0.7em] before:left-0 before:h-px before:w-2 before:bg-line before:content-['']"
            >
              {item}
            </li>
          ))}
        </ul>

        <p className="mt-6 font-mono text-[0.8125rem] leading-[1.7] tracking-[0.04em] text-muted">
          <span className="text-ink">Stack</span>
          <span aria-hidden="true"> · </span>
          {project.stack.join(" · ")}
        </p>

        {project.source ? (
          <a
            href={project.source}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-base text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-[120ms] hover:decoration-accent"
          >
            View source
            <span aria-hidden="true" className="font-mono text-xs">
              ↗
            </span>
          </a>
        ) : null}
      </div>

      {diagram ? (
        <div
          data-testid={`visual-${project.id}`}
          className={`mt-10 min-h-[16rem] border-t border-line pt-8 mid:mt-0 mid:min-h-[20rem] mid:border-t-0 mid:pt-0 ${
            reversed ? "mid:order-1" : ""
          }`}
        >
          <SystemDiagram id={diagram} />
        </div>
      ) : null}
    </article>
  );
}

export default function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-label"
      className="px-6 py-20 mid:px-10 mid:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="work-label"
          className="font-mono text-[0.8125rem] tracking-[0.18em] text-muted uppercase"
        >
          Selected work
        </h2>

        <div className="mt-10">
          {profile.projects.map((project) => (
            <ProjectEntry key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
