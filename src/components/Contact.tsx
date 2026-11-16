import { useState } from "react";
import { profile } from "../data/profile";

type Field = { name: string; email: string; message: string };
type FormState = "idle" | "submitted";

const inputClass =
  "block w-full border border-line bg-surface px-4 py-3 text-base text-ink " +
  "placeholder:text-muted/40 focus:border-accent/50 focus:outline-none " +
  "focus:ring-1 focus:ring-accent/30 transition-colors duration-[120ms]";

export default function Contact() {
  const [fields, setFields] = useState<Field>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<FormState>("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitted");
  }

  function handleReset() {
    setFields({ name: "", email: "", message: "" });
    setStatus("idle");
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-20 px-6 py-16 mid:px-10 mid:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="contact-heading"
          className="border-t border-line pt-5 font-mono text-[0.8125rem] tracking-[0.18em] text-muted uppercase"
        >
          Contact
        </h2>

        <div className="mt-10 mid:mt-14 mid:grid mid:grid-cols-[1fr_auto] mid:gap-20">
          {/* ── Contact form ── */}
          <div>
            {status === "submitted" ? (
              <div
                role="alert"
                className="border border-accent/25 bg-accent/5 px-6 py-8"
              >
                <p className="font-mono text-[0.8125rem] tracking-[0.06em] text-accent">
                  Message sent
                </p>
                <p className="mt-3 max-w-[42ch] text-base leading-[1.65] text-muted">
                  Thanks for reaching out — I'll get back to you as soon as I can.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-6 font-mono text-[0.8125rem] tracking-[0.06em] text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-[120ms] hover:decoration-accent"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="name"
                    className="block font-mono text-[0.8125rem] tracking-[0.06em] text-muted"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={fields.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={inputClass}
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="block font-mono text-[0.8125rem] tracking-[0.06em] text-muted"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={fields.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="message"
                    className="block font-mono text-[0.8125rem] tracking-[0.06em] text-muted"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={fields.message}
                    onChange={handleChange}
                    placeholder="What's on your mind?"
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="border border-accent/40 px-6 py-2.5 font-mono text-[0.8125rem] tracking-[0.08em] text-accent transition-colors duration-[120ms] hover:border-accent hover:bg-accent/5"
                >
                  Send message
                </button>
              </form>
            )}
          </div>

          {/* ── Direct contact ── */}
          <div className="mt-14 mid:mt-0 mid:min-w-[13rem]">
            <p className="font-mono text-[0.8125rem] tracking-[0.06em] text-muted">
              Or reach me directly
            </p>
            <div className="mt-5 flex flex-col gap-3 text-base">
              <a
                href={`mailto:${profile.email}`}
                className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-[120ms] hover:decoration-accent"
              >
                {profile.email}
              </a>
              <a
                href={`tel:${profile.phone.replace(/\s+/g, "")}`}
                className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-[120ms] hover:decoration-accent"
              >
                {profile.phone}
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-[120ms] hover:decoration-accent"
              >
                github.com/FiereEinar
                <span aria-hidden="true" className="ml-1 font-mono text-xs">
                  ↗
                </span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line px-6 py-10 mid:px-10">
      <div className="mx-auto max-w-6xl font-mono text-[0.8125rem] tracking-[0.04em] text-muted">
        <p>
          {profile.name} · {year}
        </p>
      </div>
    </footer>
  );
}
