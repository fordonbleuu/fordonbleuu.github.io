import Section from "./Section.jsx";

const ABOUT_POINTS = [
  "Focused on clean, maintainable code",
  "Attention to detail in every pixel",
  "Fast, responsive, accessible sites",
];

export default function About() {
  return (
    <Section id="about" label="About" title="A little about me">
      <p className="section-text">
        I’m a developer passionate about creating simple, elegant, and
        functional digital products. I care about clean design, thoughtful
        details, and experiences that feel effortless.
      </p>
      <ul className="about-points">
        {ABOUT_POINTS.map((point) => (
          <li key={point}>
            <span className="check" aria-hidden="true">
              ✓
            </span>{" "}
            {point}
          </li>
        ))}
      </ul>
    </Section>
  );
}
