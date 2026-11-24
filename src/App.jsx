import { useCallback, useState } from "react";
import ScrollProgress from "./components/ScrollProgress.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import GalleryModal from "./components/GalleryModal.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const [gallery, setGallery] = useState(null);

  const openGallery = useCallback((name) => setGallery(name), []);
  const closeGallery = useCallback(() => setGallery(null), []);

  return (
    <>
      <ScrollProgress />
      <div className="bg-glow" aria-hidden="true" />
      <Header />
      <main id="top">
        <Hero />
        <About />
        <Skills />
        <Projects onOpenGallery={openGallery} />
        <Contact />
      </main>
      <GalleryModal gallery={gallery} onClose={closeGallery} />
      <Footer />
    </>
  );
}
