import { FOOTER_LINKS } from "../data/contacts.js";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p className="footer-brand">Personal&nbsp;Portfolio</p>
        <ul className="footer-links">
          {FOOTER_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="footer-copy">
          © 2026 Clifford Probetso. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
