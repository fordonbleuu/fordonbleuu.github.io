import { Fragment, useEffect, useRef } from "react";
import useMediaQuery from "../hooks/useMediaQuery.js";
import { asset } from "../lib/asset.js";
import { CodeIcon } from "./icons.jsx";

const NAME = "Clifford Probetso";
const NAME_WORDS = NAME.split(" ");
const SUPPORTS_TRANSLATE =
  typeof document !== "undefined" &&
  "translate" in document.documentElement.style;

function AnimatedName({ animate }) {
  if (!animate) {
    return (
      <h1 className="hero-name" id="hero-name">
        {NAME}
      </h1>
    );
  }

  let charIndex = 0;

  return (
    <h1 className="hero-name" id="hero-name">
      {NAME_WORDS.map((word, wordIndex) => {
        const startIndex = charIndex;
        charIndex += word.length + 1;

        return (
          <Fragment key={word}>
            {wordIndex > 0 && " "}
            <span
              className={`name-word${wordIndex === 1 ? " name-gradient" : ""}`}
            >
              {word.split("").map((char, index) => (
                <span
                  key={`${char}-${index}`}
                  className="name-char"
                  style={{ "--i": startIndex + index }}
                >
                  {char}
                </span>
              ))}
            </span>
          </Fragment>
        );
      })}
    </h1>
  );
}

export default function Hero() {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const canHover = useMediaQuery("(hover: hover)");
  const parallaxEnabled = !reduceMotion && canHover && SUPPORTS_TRANSLATE;

  const visualRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleMouseMove = (event) => {
    if (!parallaxEnabled) return;

    const visual = visualRef.current;
    if (!visual) return;

    const rect = visual.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      visual.querySelectorAll("[data-parallax]").forEach((element) => {
        const depth = parseFloat(element.dataset.parallax) || 10;
        element.style.translate = `${nx * depth}px ${ny * depth}px`;
      });

      const frame = visual.querySelector(".photo-frame");
      if (frame) frame.style.translate = `${nx * 8}px ${ny * 8}px`;
    });
  };

  const handleMouseLeave = () => {
    if (!parallaxEnabled) return;

    const visual = visualRef.current;
    if (!visual) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    visual.querySelectorAll("[data-parallax]").forEach((element) => {
      element.style.translate = "";
    });

    const frame = visual.querySelector(".photo-frame");
    if (frame) frame.style.translate = "";
  };

  return (
    <section className="hero">
      <div className="grid-overlay" aria-hidden="true" />
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="hero-eyebrow">Hello, I’m</p>
          <AnimatedName animate={!reduceMotion} />
          <p className="hero-tagline">
            I build clean digital experiences — turning ideas into polished,
            functional websites.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              View Work
            </a>
            <a href="#contact" className="btn btn-ghost">
              Get in Touch
            </a>
          </div>
          <ul className="hero-stats">
            <li>
              <strong>100%</strong>
              <span>Passion</span>
            </li>
            <li>
              <strong>24/7</strong>
              <span>Ideas</span>
            </li>
            <li>
              <strong>∞</strong>
              <span>Detail</span>
            </li>
          </ul>
        </div>

        <div
          className="hero-visual"
          id="hero-visual"
          ref={visualRef}
          onMouseMove={parallaxEnabled ? handleMouseMove : undefined}
          onMouseLeave={parallaxEnabled ? handleMouseLeave : undefined}
        >
          <div className="photo-frame">
            <div className="photo-ring" aria-hidden="true" />
            <img src={asset("clifford.jpg")} alt="Portrait of Clifford Probetso" />
            <div className="photo-shine" aria-hidden="true" />
          </div>
          <div className="photo-badge photo-badge-top" data-parallax="14">
            <CodeIcon />
            Developer
          </div>
          <div className="photo-badge photo-badge-bottom" data-parallax="-22">
            <span className="pulse-dot" aria-hidden="true" />
            Open to work
          </div>
        </div>
      </div>
    </section>
  );
}
