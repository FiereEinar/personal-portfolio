import { Route, Routes } from 'react-router-dom';
import ContactPage from './pages/ContactPage';
import ProjectsPage from './pages/ProjectsPage';
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
}
