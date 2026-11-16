import { useState } from 'react';
import { Footer } from '../components/Contact';
import HashScroll from '../components/HashScroll';
import Nav from '../components/Nav';
import Reveal from '../components/Reveal';
import { profile } from '../data/profile';

type Field = { name: string; email: string; subject: string; message: string };
type FormState = 'idle' | 'submitted';

const inputClass =
  'block w-full border border-line bg-surface px-4 py-3 text-base text-ink ' +
  'placeholder:text-muted/40 focus:border-accent/50 focus:outline-none ' +
  'focus:ring-1 focus:ring-accent/30 transition-colors duration-[120ms]';

export default function ContactPage() {
  const [fields, setFields] = useState<Field>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<FormState>('idle');

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitted');
  }

  function handleReset() {
    setFields({ name: '', email: '', subject: '', message: '' });
    setStatus('idle');
  }

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <HashScroll />

      <main id="main" tabIndex={-1}>
        <Reveal>
          <header className="px-6 pt-28 pb-12 mid:px-10 mid:pt-36 mid:pb-16">
            <div className="mx-auto max-w-6xl">
              <p className="font-mono text-[0.8125rem] tracking-[0.18em] text-muted uppercase">
                Contact / Get in Touch
              </p>
              <h1 className="mt-4 max-w-[14ch] text-[clamp(2.75rem,6vw,5rem)] leading-[1.02] tracking-[-0.03em] text-ink">
                Let's talk.
              </h1>
              <p className="mt-6 max-w-[56ch] text-base leading-[1.65] text-muted">
                Whether you're looking to collaborate on a system, hiring for a
                software engineering position, or just want to say hi—drop a
                message below or contact me directly.
              </p>
            </div>
          </header>
        </Reveal>

        <Reveal>
          <section className="px-6 pb-20 mid:px-10 mid:pb-32">
            <div className="mx-auto max-w-6xl mid:grid mid:grid-cols-[1fr_22rem] mid:gap-20">
              {/* ── Contact Form ── */}
              <div>
                {status === 'submitted' ? (
                  <div
                    role="alert"
                    className="border border-accent/25 bg-accent/5 p-8"
                  >
                    <p className="font-mono text-[0.8125rem] tracking-[0.06em] text-accent">
                      ✓ Message received
                    </p>
                    <h2 className="mt-2 text-2xl font-medium tracking-tight text-ink">
                      Thank you for reaching out!
                    </h2>
                    <p className="mt-3 max-w-[46ch] text-base leading-[1.65] text-muted">
                      Your message has been recorded. I'll get back to you at{' '}
                      <span className="text-ink">
                        {fields.email || 'your email'}
                      </span>{' '}
                      as soon as possible.
                    </p>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="mt-6 border border-accent/40 px-5 py-2 font-mono text-[0.8125rem] tracking-[0.08em] text-accent transition-colors duration-[120ms] hover:border-accent hover:bg-accent/5"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-6"
                  >
                    <div className="grid gap-6 sm:grid-cols-2">
                      {/* Name */}
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="block font-mono text-[0.8125rem] tracking-[0.06em] text-muted"
                        >
                          Name <span className="text-accent">*</span>
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
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="block font-mono text-[0.8125rem] tracking-[0.06em] text-muted"
                        >
                          Email <span className="text-accent">*</span>
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
                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                      <label
                        htmlFor="subject"
                        className="block font-mono text-[0.8125rem] tracking-[0.06em] text-muted"
                      >
                        Subject
                      </label>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        value={fields.subject}
                        onChange={handleChange}
                        placeholder="Inquiry / Project proposal / Role"
                        className={inputClass}
                      />
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="block font-mono text-[0.8125rem] tracking-[0.06em] text-muted"
                      >
                        Message <span className="text-accent">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={fields.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project, timeline, or question..."
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    <button
                      type="submit"
                      className="border border-accent/40 bg-accent/5 px-7 py-3 font-mono text-[0.8125rem] tracking-[0.08em] text-accent transition-colors duration-[120ms] hover:border-accent hover:bg-accent/15"
                    >
                      Send message →
                    </button>
                  </form>
                )}
              </div>

              {/* ── Direct Details / Availability ── */}
              <div className="mt-14 space-y-10 border-t border-line pt-10 mid:mt-0 mid:border-t-0 mid:pt-0">
                {/* Status card */}
                <div className="border border-line bg-surface p-6">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                    </span>
                    <p className="font-mono text-xs tracking-[0.08em] text-accent uppercase">
                      Availability
                    </p>
                  </div>
                  <p className="mt-3 text-base leading-relaxed text-ink">
                    {profile.status}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    Based in {profile.location}, Philippines (UTC+8).
                  </p>
                </div>

                {/* Direct info list */}
                <div className="space-y-6">
                  <div>
                    <p className="font-mono text-[0.75rem] tracking-[0.14em] text-muted uppercase">
                      Email
                    </p>
                    <a
                      href={`mailto:${profile.email}`}
                      className="mt-1.5 inline-block text-base text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-[120ms] hover:decoration-accent"
                    >
                      {profile.email}
                    </a>
                  </div>

                  <div>
                    <p className="font-mono text-[0.75rem] tracking-[0.14em] text-muted uppercase">
                      Phone / Mobile
                    </p>
                    <a
                      href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                      className="mt-1.5 inline-block text-base text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-[120ms] hover:decoration-accent"
                    >
                      {profile.phone}
                    </a>
                  </div>

                  <div>
                    <p className="font-mono text-[0.75rem] tracking-[0.14em] text-muted uppercase">
                      GitHub
                    </p>
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 inline-flex items-center gap-1.5 text-base text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-[120ms] hover:decoration-accent"
                    >
                      github.com/FiereEinar
                      <span aria-hidden="true" className="font-mono text-xs">
                        ↗
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Reveal>
      </main>

      <Footer />
    </>
  );
}
