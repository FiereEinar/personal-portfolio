import { profile } from "../data/profile";
import { techIcons, type TechIcon } from "../data/techIcons";

const fallbackIcon: TechIcon = {
  path: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16z",
};

export default function Stack() {
  return (
    <section
      id="stack"
      aria-labelledby="stack-label"
      className="scroll-mt-20 px-6 py-16 mid:px-10 mid:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="stack-label"
          className="font-mono text-[0.8125rem] tracking-[0.18em] text-muted uppercase"
        >
          Stack
        </h2>

        <dl className="mt-10 grid gap-x-12 gap-y-8 mid:grid-cols-2">
          {profile.stack.map((group) => (
            <div key={group.label} className="border-t border-line pt-5">
              <dt className="font-mono text-[0.8125rem] tracking-[0.02em] text-ink">
                {group.label}
              </dt>
              <dd className="mt-4">
                <ul className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                  {group.items.map((item) => {
                    const icon = techIcons[item] ?? fallbackIcon;

                    return (
                      <li
                        key={item}
                        className="flex items-center gap-2.5 text-base leading-[1.7] text-muted"
                      >
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          className="h-[1.125rem] w-[1.125rem] shrink-0 fill-current text-ink/70"
                        >
                          <path d={icon.path} />
                        </svg>
                        <span>{item}</span>
                      </li>
                    );
                  })}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
