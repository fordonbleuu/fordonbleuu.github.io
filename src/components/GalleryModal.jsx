import { useEffect, useRef, useState } from "react";
import { asset } from "../lib/asset.js";

const GALLERIES = {
  luxedu: {
    name: "LuxEdu",
    title: "LuxEdu — App Screenshots",
    note: "Offline-first Flutter app for school schedules, flashcards, and notifications.",
  },
  sarisync: {
    name: "SariSync",
    title: "SariSync — App Screenshots",
    note: "Offline point-of-sale system for sari-sari stores — items, inventory, and receipts.",
  },
};

const SCREENSHOT_COUNT = 8;
const EXTS = ["png", "jpg", "jpeg", "webp"];

export default function GalleryModal({ gallery, onClose }) {
  const [activeGallery, setActiveGallery] = useState(gallery);
  const [screenshots, setScreenshots] = useState([]);
  const [empty, setEmpty] = useState(false);
  const closeButtonRef = useRef(null);
  const previouslyFocusedRef = useRef(null);
  const isOpen = Boolean(gallery);

  useEffect(() => {
    if (gallery) setActiveGallery(gallery);
  }, [gallery]);

  useEffect(() => {
    if (!gallery) return;

    let cancelled = false;
    let settled = 0;
    const loaded = [];

    setScreenshots([]);
    setEmpty(false);

    const settle = () => {
      settled += 1;
      if (settled === SCREENSHOT_COUNT && !cancelled && loaded.length === 0) {
        setEmpty(true);
      }
    };

    const tryLoad = (index, extIndex) => {
      if (cancelled) return;

      if (extIndex >= EXTS.length) {
        settle();
        return;
      }

      const image = new Image();

      image.onload = () => {
        if (cancelled) return;
        loaded.push({ index, src: image.src });
        setScreenshots([...loaded].sort((a, b) => a.index - b.index));
        settle();
      };

      image.onerror = () => tryLoad(index, extIndex + 1);
      image.src = asset(`screenshots/${gallery}-${index}.${EXTS[extIndex]}`);
    };

    for (let index = 1; index <= SCREENSHOT_COUNT; index += 1) {
      tryLoad(index, 0);
    }

    return () => {
      cancelled = true;
    };
  }, [gallery]);

  useEffect(() => {
    if (!gallery) return;

    previouslyFocusedRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocusedRef.current?.focus();
    };
  }, [gallery, onClose]);

  const data = GALLERIES[activeGallery] ?? GALLERIES.luxedu;

  return (
    <div
      className={`gallery-modal${isOpen ? " open" : ""}`}
      id="gallery-modal"
      aria-hidden={!isOpen}
    >
      <div className="gallery-backdrop" onClick={onClose} aria-hidden="true" />
      <div
        className="gallery-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gallery-title"
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="gallery-close"
          onClick={onClose}
          aria-label="Close gallery"
        >
          ×
        </button>
        <h3 className="gallery-title" id="gallery-title">
          {data.title}
        </h3>
        <p className="gallery-note" id="gallery-note">
          {data.note}
        </p>
        <div className="gallery-grid" id="gallery-grid">
          {screenshots.map((screenshot, index) => (
            <figure
              className="gallery-item"
              key={screenshot.src}
              style={{ "--n": String(index) }}
            >
              <img
                src={screenshot.src}
                alt={`${data.name} screenshot ${screenshot.index}`}
              />
            </figure>
          ))}
        </div>
        {empty && (
          <p className="gallery-empty" id="gallery-empty">
            Screenshots are on the way — check back soon.
          </p>
        )}
      </div>
    </div>
  );
}
