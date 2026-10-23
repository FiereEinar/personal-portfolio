import { useEffect, useRef, useState } from "react";
import { diagrams } from "../data/diagrams";

type SystemDiagramProps = {
  id: "sims" | "lapsync";
};

export default function SystemDiagram({ id }: SystemDiagramProps) {
  const diagram = diagrams[id];
  const frameRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [drawn, setDrawn] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const activeId = hoveredId ?? focusedId;

  useEffect(() => {
    if (drawn) return;
    const frame = frameRef.current;
    if (!frame) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(frame);
    return () => observer.disconnect();
  }, [drawn]);

  const active = diagram.nodes.find((node) => node.id === activeId) ?? null;

  const activeIds = new Set<string>();
  if (activeId) {
    const queue = [activeId];
    while (queue.length > 0) {
      const current = queue.shift() as string;
      if (activeIds.has(current)) continue;
      activeIds.add(current);
      for (const edge of diagram.edges) {
        if (edge.from === current) queue.push(edge.to);
      }
    }
  }

  const captionId = `diagram-caption-${id}`;

  return (
    <div
      data-testid={`diagram-${id}`}
      className="py-2"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setFocusedId(null);
          setHoveredId(null);
        }
      }}
    >
      <div
        ref={frameRef}
        data-drawn={drawn ? "true" : "false"}
        className="relative aspect-[5/3] w-full"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 100 60"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          {diagram.edges.map((edge) => {
            const isActive = activeIds.has(edge.from);
            return (
              <path
                key={`${edge.from}-${edge.to}`}
                d={edge.d}
                pathLength={1}
                data-edge={`${edge.from}->${edge.to}`}
                data-active={isActive ? "true" : undefined}
                className={`diagram-path ${isActive ? "text-accent" : "text-connector"}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.25}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>

        {diagram.nodes.map((node) => {
          const isActive = activeIds.has(node.id);
          return (
            <button
              key={node.id}
              type="button"
              data-node={node.id}
              data-active={isActive ? "true" : undefined}
              aria-describedby={captionId}
              onFocus={() => setFocusedId(node.id)}
              onMouseEnter={() => setHoveredId(node.id)}
              onMouseLeave={() =>
                setHoveredId((current) => (current === node.id ? null : current))
              }
              onBlur={() =>
                setFocusedId((current) => (current === node.id ? null : current))
              }
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 border bg-surface px-2 py-1.5 font-mono text-[0.6875rem] leading-none tracking-[0.02em] whitespace-nowrap transition-colors duration-[120ms] ${
                isActive
                  ? "border-ink text-ink"
                  : "border-line text-muted hover:border-muted hover:text-ink"
              }`}
            >
              {node.label}
            </button>
          );
        })}
      </div>

      <p
        id={captionId}
        data-testid="diagram-caption"
        aria-live="polite"
        className="mt-5 min-h-[3rem] max-w-[48ch] text-sm leading-[1.6] text-muted"
      >
        {active ? (
          <>
            <span className="font-mono text-[0.75rem] tracking-[0.04em] text-ink uppercase">
              {active.label}
            </span>
            <span className="mt-1 block">{active.caption}</span>
          </>
        ) : (
          "Hover or tab a component"
        )}
      </p>
    </div>
  );
}
