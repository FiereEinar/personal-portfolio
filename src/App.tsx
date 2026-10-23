import Hero from "./components/Hero";
import Nav from "./components/Nav";
import Reveal from "./components/Reveal";

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
      </main>
    </>
  );
}
