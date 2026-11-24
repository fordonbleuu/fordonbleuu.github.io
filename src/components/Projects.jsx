import { useRef } from "react";
import Section from "./Section.jsx";
import useMediaQuery from "../hooks/useMediaQuery.js";
import { PROJECTS } from "../data/projects.js";

function ProjectCard({ project, tiltEnabled, onOpenGallery }) {
  const cardRef = useRef(null);

  const handleMouseMove = (event) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    card.style.setProperty("--my", `${event.clientY - rect.top}px`);

    if (!tiltEnabled) return;

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${
      -y * 7
    }deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    if (tiltEnabled && cardRef.current) {
      cardRef.current.style.transform = "";
    }
  };

  return (
    <article
      ref={cardRef}
      className="project-card tilt"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="project-art project-art-img">
        <span className="art-number">{project.number}</span>
        <img src={project.image} alt={project.imageAlt} />
      </div>
      <h3
        className={`project-title${
          project.titleLong ? " project-title-long" : ""
        }`}
      >
        {project.title}
      </h3>
      <p className="project-desc">{project.description}</p>
      <span className="project-tag">{project.tag}</span>
      {project.gallery ? (
        <a
          className="project-link"
          href={`#${project.gallery}`}
          onClick={(event) => {
            event.preventDefault();
            onOpenGallery(project.gallery);
          }}
        >
          {project.linkLabel} <span aria-hidden="true">→</span>
        </a>
      ) : (
        <a
          className="project-link"
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {project.linkLabel} <span aria-hidden="true">→</span>
        </a>
      )}
    </article>
  );
}

export default function Projects({ onOpenGallery }) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const canHover = useMediaQuery("(hover: hover)");
  const tiltEnabled = !reduceMotion && canHover;

  return (
    <Section id="projects" label="Projects" title="Selected work">
      <div className="project-grid">
        {PROJECTS.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            tiltEnabled={tiltEnabled}
            onOpenGallery={onOpenGallery}
          />
        ))}
      </div>
    </Section>
  );
}
