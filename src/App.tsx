import Education from "./components/Education";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import Reveal from "./components/Reveal";
import Stack from "./components/Stack";
import Work from "./components/Work";

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Reveal>
          <Hero />
        </Reveal>
        <Reveal>
          <Work />
        </Reveal>
        <Reveal>
          <Experience />
        </Reveal>
        <Reveal>
          <Stack />
        </Reveal>
        <Reveal>
          <Education />
        </Reveal>
      </main>
    </>
  );
}
