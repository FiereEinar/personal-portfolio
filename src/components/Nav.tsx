import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Nav({ page: _page }: { page?: string } = {}) {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const isProjects = pathname === '/projects';
  const isContact = pathname === '/contact';

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkBase =
    'inline-flex min-h-11 items-center text-muted underline decoration-transparent underline-offset-4 transition-colors duration-[120ms] hover:text-ink hover:decoration-line';
  const activeLink = 'text-ink decoration-line';

  return (
    <nav
      aria-label="Primary"
      data-scrolled={scrolled ? 'true' : 'false'}
      className="fixed inset-x-0 top-0 z-50 h-14 border-b border-transparent bg-bg/90 backdrop-blur-sm transition-colors duration-[120ms] data-[scrolled=true]:border-line"
    >
      <div className="flex h-full items-center justify-between px-6 mid:px-10">
        {/* Logo */}
        {isHome ? (
          <a
            href="#hero"
            className="inline-flex min-h-11 items-center font-mono text-sm font-medium tracking-[0.18em] text-ink"
          >
            NXM
          </a>
        ) : (
          <Link
            to="/"
            className="inline-flex min-h-11 items-center font-mono text-sm font-medium tracking-[0.18em] text-ink"
          >
            NXM
          </Link>
        )}

        {/* Desktop links (visible only on mid screens and up) */}
        <div className="hidden items-center gap-6 text-sm mid:flex">
          <Link to="/" data-testid="nav-home-desktop" className={linkBase}>
            Home
          </Link>

          <Link
            to="/projects"
            aria-current={isProjects ? 'page' : undefined}
            data-testid="nav-projects-desktop"
            className={`${linkBase} ${isProjects ? activeLink : ''}`}
          >
            Projects
          </Link>

          <Link
            to="/contact"
            aria-current={isContact ? 'page' : undefined}
            data-testid="nav-contact-desktop"
            className={`${linkBase} ${isContact ? activeLink : ''}`}
          >
            Contact
          </Link>

          {/* Theme Switcher */}
          <div className="flex items-center pl-2">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile links (visible only on small screens) */}
        <div className="flex items-center gap-3 text-[0.8125rem] mid:hidden">
          <Link to="/" className={linkBase}>
            Home
          </Link>

          <Link
            to="/projects"
            aria-current={isProjects ? 'page' : undefined}
            data-testid="nav-projects-mobile"
            className={`${linkBase} ${isProjects ? activeLink : ''}`}
          >
            Projects
          </Link>

          <Link
            to="/contact"
            aria-current={isContact ? 'page' : undefined}
            data-testid="nav-contact-mobile"
            className={`${linkBase} ${isContact ? activeLink : ''}`}
          >
            Contact
          </Link>

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
