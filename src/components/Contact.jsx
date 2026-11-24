import Section from "./Section.jsx";
import { CONTACTS } from "../data/contacts.js";
import { ICONS } from "./icons.jsx";

export default function Contact() {
  return (
    <Section id="contact" alt label="Contact" title="Let’s work together">
      <p className="section-text">
        I’m always open to new opportunities, collaborations, or just a hello.
        Reach out through any of the channels below.
      </p>
      <ul className="contact-list">
        {CONTACTS.map((contact) => {
          const Icon = ICONS[contact.icon];

          return (
            <li key={contact.id}>
              <a
                className="contact-item"
                href={contact.href}
                {...(contact.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <span className="contact-icon" aria-hidden="true">
                  <Icon />
                </span>
                <span className="contact-text">
                  <span className="contact-label">{contact.label}</span>
                  <span className="contact-value">{contact.value}</span>
                </span>
                <span className="contact-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
