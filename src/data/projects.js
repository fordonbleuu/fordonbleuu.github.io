import { asset } from "../lib/asset.js";

export const PROJECTS = [
  {
    id: "tcgc-freshman-guide",
    number: "01",
    title: "TCGC Freshman Guide",
    description:
      "An online brochure guide for freshmen at Tangub City Global College — everything new students need to get started, in one clean and accessible place.",
    tag: "Web",
    image: asset("project-01.png"),
    imageAlt:
      "TCGC Freshman Guide — online brochure for freshmen at Tangub City Global College",
    href: "https://tcgc-froshie-guide.netlify.app/",
    linkLabel: "Visit live site",
  },
  {
    id: "evacuation-routes-research",
    number: "02",
    title:
      "Graph-Theoretic Optimization of Evacuation Routes for Flood-Prone Communities in Lala, Lanao del Norte",
    titleLong: true,
    description:
      "A graph-theoretic study of flood-prone barangay road networks in Lala, Lanao del Norte. It models distance, road capacity, and flood risk to formulate optimal evacuation routes — a decision-support tool for MDRRMO and barangay-level disaster responders.",
    tag: "Research",
    image: asset("project-02.svg"),
    imageAlt:
      "Cover artwork — graph-theoretic optimization of evacuation routes for flood-prone communities in Lala, Lanao del Norte",
    href: "https://drive.google.com/file/d/1890HRriXWTiqGd6cGFprnOyX7NxjNaqN/view?usp=sharing",
    linkLabel: "View study",
  },
  {
    id: "luxedu",
    number: "03",
    title: "LuxEdu",
    description:
      "An offline-first Flutter app built for students — manage your school schedule, study with flashcards, and get notifications, all without needing a connection.",
    tag: "App",
    image: asset("luxedu-cover.jpg"),
    imageAlt:
      "LuxEdu cover artwork — offline-first Flutter app for school schedule management, flashcards, and notifications",
    gallery: "luxedu",
    linkLabel: "View screenshots",
  },
  {
    id: "sarisync",
    number: "04",
    title: "SariSync",
    description:
      "An offline-first point-of-sale system built for sari-sari stores — record sales, manage inventory, and print receipts without an internet connection.",
    tag: "App",
    image: asset("project-04.svg"),
    imageAlt:
      "SariSync cover artwork — offline point-of-sale system for sari-sari stores",
    gallery: "sarisync",
    linkLabel: "View screenshots",
  },
];
