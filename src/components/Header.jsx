import { useEffect, useState } from "react";
import useScrollSpy from "../hooks/useScrollSpy.js";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeId = useScrollSpy(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <nav className="nav container">
        <a href="#top" className="brand" onClick={closeMenu}>
          Personal&nbsp;Portfolio
        </a>
        <ul className={`nav-links${menuOpen ? " open" : ""}`}>
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={activeId === item.id ? "active" : undefined}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="nav-toggle"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
    </header>
  );
}
