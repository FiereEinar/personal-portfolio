import { Route, Routes } from "react-router-dom";
import ProjectsPage from "./ProjectsPage";
import CheckpointRail from "./components/CheckpointRail";
import Contact, { Footer } from "./components/Contact";
import Education from "./components/Education";
import Experience from "./components/Experience";
import HashScroll from "./components/HashScroll";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import Reveal from "./components/Reveal";
import Stack from "./components/Stack";
import Work from "./components/Work";

function HomePage() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav page="home" />
      <HashScroll />
      <CheckpointRail />
      <main id="main" data-rail="true" tabIndex={-1}>
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
        <Reveal>
          <Contact />
        </Reveal>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects" element={<ProjectsPage />} />
    </Routes>
  );
}
