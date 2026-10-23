import { profile } from "../data/profile";

export default function Stack() {
  return (
    <section
      id="stack"
      aria-labelledby="stack-label"
      className="scroll-mt-20 px-6 py-16 mid:px-10 mid:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <p
          id="stack-label"
          className="font-mono text-[0.8125rem] tracking-[0.18em] text-muted uppercase"
        >
          Stack
        </p>

        <dl className="mt-10 grid gap-x-12 gap-y-8 mid:grid-cols-2">
          {profile.stack.map((group) => (
            <div key={group.label} className="border-t border-line pt-5">
              <dt className="font-mono text-[0.8125rem] tracking-[0.02em] text-ink">
                {group.label}
              </dt>
              <dd className="mt-3 max-w-[46ch] text-base leading-[1.7] text-muted">
                {group.items.join(" · ")}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
