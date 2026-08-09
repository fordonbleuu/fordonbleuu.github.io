(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Split name into animated chars ---------- */

  const nameEl = document.getElementById("hero-name");
  if (nameEl) {
    const text = nameEl.textContent.trim();
    const words = text.split(/\s+/);

    if (reduceMotion) {
      nameEl.textContent = text;
    } else {
      const inner = words
        .map((word, wi) => {
          const chars = word
            .split("")
            .map((ch) => `<span class="name-char">${ch}</span>`)
            .join("");
          return `<span class="name-word${wi === 1 ? " name-gradient" : ""}">${chars}</span>`;
        })
        .join(" ");

      nameEl.innerHTML = inner;

      let total = 0;
      nameEl.querySelectorAll(".name-word").forEach((word) => {
        let i = 0;
        word.querySelectorAll(".name-char").forEach((ch) => {
          ch.style.setProperty("--i", total + i);
          i++;
        });
        total += i + 1;
      });
    }
  }

  /* ---------- Header scroll state ---------- */

  const headerEl = document.querySelector(".site-header");
  const onScroll = () => {
    headerEl.classList.toggle("scrolled", window.scrollY > 30);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Scroll progress bar ---------- */

  const progressBar = document.getElementById("progress-bar");
  const onProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  };
  window.addEventListener("scroll", onProgress, { passive: true });
  onProgress();

  /* ---------- Mobile nav ---------- */

  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    navLinks.classList.toggle("open", !open);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      navLinks.classList.remove("open");
    });
  });

  /* ---------- Scrollspy ---------- */

  const navAnchors = [...document.querySelectorAll(".nav-links a")];
  const spyMap = new Map(
    navAnchors.map((a) => [a.getAttribute("href").slice(1), a])
  );

  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navAnchors.forEach((a) => a.classList.remove("active"));
        const link = spyMap.get(entry.target.id);
        if (link) link.classList.add("active");
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  spyMap.forEach((_, id) => {
    const section = document.getElementById(id);
    if (section) spyObserver.observe(section);
  });

  /* ---------- Scroll reveal with stagger ---------- */

  const revealEls = document.querySelectorAll(".reveal");
  const ITEM_SELECTOR =
    ".section-label, .section-title, .section-text, .about-points li, .skill-list li, .project-card, .contact-list li";

  if ("IntersectionObserver" in window && !reduceMotion) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target;
            section.querySelectorAll(ITEM_SELECTOR).forEach((item, i) => {
              item.style.setProperty("--i", i);
            });
            section.classList.add("visible", "animate");
            observer.unobserve(section);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => {
      el.classList.add("visible", "animate");
      el.querySelectorAll(ITEM_SELECTOR).forEach((item, i) => {
        item.style.setProperty("--i", i);
      });
    });
  }

  /* ---------- Card spotlight (cursor glow) ---------- */

  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    });
  });

  /* ---------- 3D tilt on cards ---------- */

  if (!reduceMotion && matchMedia("(hover: hover)").matches) {
    document.querySelectorAll(".tilt").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${
          -y * 7
        }deg) translateY(-4px)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  /* ---------- Hero photo mouse parallax ---------- */

  const heroVisual = document.getElementById("hero-visual");
  if (
    heroVisual &&
    !reduceMotion &&
    "translate" in document.documentElement.style &&
    matchMedia("(hover: hover)").matches
  ) {
    const targets = [...heroVisual.querySelectorAll("[data-parallax]")];
    const frame = heroVisual.querySelector(".photo-frame");
    let rafId = null;

    heroVisual.addEventListener("mousemove", (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        targets.forEach((el) => {
          const depth = parseFloat(el.dataset.parallax) || 10;
          el.style.translate = `${nx * depth}px ${ny * depth}px`;
        });
        frame.style.translate = `${nx * 8}px ${ny * 8}px`;
      });
    });

    heroVisual.addEventListener("mouseleave", () => {
      if (rafId) cancelAnimationFrame(rafId);
      targets.forEach((el) => (el.style.translate = ""));
      frame.style.translate = "";
    });
  }
/* ---------- Screenshot gallery modal ---------- */

  const modal = document.getElementById("gallery-modal");
  const grid = document.getElementById("gallery-grid");
  const emptyNote = document.getElementById("gallery-empty");
  const galleryTitle = document.getElementById("gallery-title");
  const galleryNote = document.getElementById("gallery-note");

  const GALLERIES = {
    luxedu: {
      title: "LuxEdu &mdash; App Screenshots",
      note: "Offline-first Flutter app for school schedules, flashcards, and notifications.",
    },
    sarisync: {
      title: "SariSync &mdash; App Screenshots",
      note: "Offline point-of-sale system for sari-sari stores &mdash; items, inventory, and receipts.",
    },
  };

  const SCREENSHOT_COUNT = 8;
  const EXTS = ["png", "jpg", "jpeg", "webp"];

  const loadScreenshots = (name) => {
    grid.innerHTML = "";
    emptyNote.hidden = true;
    let loaded = 0;

    const tryLoad = (index, extIdx) => {
      if (extIdx >= EXTS.length) return;
      const img = new Image();
      img.onload = () => {
        const item = document.createElement("figure");
        item.className = "gallery-item";
        item.style.setProperty("--n", loaded);
        item.appendChild(img);
        grid.appendChild(item);
        loaded++;
      };
      img.onerror = () => tryLoad(index, extIdx + 1);
      img.src = `screenshots/${name}-${index}.${EXTS[extIdx]}`;
    };

    for (let i = 1; i <= SCREENSHOT_COUNT; i++) tryLoad(i, 0);

    setTimeout(() => {
      if (grid.children.length === 0) emptyNote.hidden = false;
    }, 1200);
  };

  const openModal = (galleryName) => {
    const gallery = GALLERIES[galleryName] || GALLERIES.luxedu;
    galleryTitle.innerHTML = gallery.title;
    galleryNote.textContent = gallery.note;
    loadScreenshots(galleryName);
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  document.querySelectorAll(".js-gallery-open").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(link.dataset.gallery || "luxedu");
    });
  });

  modal.querySelectorAll("[data-modal-close]").forEach((el) => {
    el.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });
})();