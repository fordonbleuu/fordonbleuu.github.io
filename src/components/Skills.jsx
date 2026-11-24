import Section from "./Section.jsx";
import { SKILLS } from "../data/skills.js";

export default function Skills() {
  return (
    <Section id="skills" alt label="Skills" title="What I work with">
      <ul className="skill-list">
        {SKILLS.map((skill, index) => (
          <li key={skill}>
            <span className="skill-index">
              {String(index + 1).padStart(2, "0")}
            </span>
            {skill}
          </li>
        ))}
      </ul>
    </Section>
  );
}
