import type { LanguageProficiency, languages, timeline } from "./cv";

type TimelineData = (typeof timeline)[number];

type TimelineTextOf<Item> = Item extends { readonly highlights: infer Highlights }
  ? { readonly highlights: { readonly [Index in keyof Highlights]: string } }
  : { readonly subtitle: string };

export type TimelineTranslation = {
  readonly [Item in TimelineData as Item["id"]]: TimelineTextOf<Item>;
};

export type LanguageName = (typeof languages)[number]["name"];

export const timelineDe = {
  "spiced-academy": {
    highlights: [
      "16-wöchiges Vollzeit-Remote-Programm: 720 Stunden (960 Unterrichtseinheiten) Programmierpraxis mit JavaScript, React, Next.js, Node.js, REST-APIs und Unit-Tests.",
      "Projekte im Pair Programming und in agilen Teams umgesetzt, inklusive KI-gestützter Entwicklung mit Claude Code.",
      "GSAP und Motion parallel zum Programm in eigenen Kursen und Projekten vertieft.",
    ],
  },
  "sanity-certified-content-operator": {
    subtitle: "Sanity",
  },
  orryana: {
    subtitle: "Finanzplattform",
  },
  "meliore-foundation": {
    highlights: [
      "UI/UX-Strategie, Design-System-Architektur und High-Fidelity-Prototyping mit Figma und Adobe XD für komplexe digitale Vorhaben verantwortet.",
      "WordPress-Themes von Grund auf entwickelt und Designs in funktionale Websites für die European Climate Foundation und die Meliore Foundation umgesetzt.",
      "Responsive, pixelgenaue Weboberflächen mit semantischem HTML5, modernem CSS und komponentenbasierten Strukturen browserübergreifend umgesetzt.",
      "Abläufe zwischen visuellem Design und Entwicklung geleitet und Richtlinien für das Design System sowie die Übergabe von Komponenten etabliert.",
    ],
  },
  "european-climate-foundation": {
    highlights: [
      "Digitale Identität, Web-Layouts und interaktive Motion-Assets ganzheitlich verantwortet, mit Adobe Creative Suite (Photoshop, Illustrator, After Effects) und Webtechnologien.",
      "WordPress-Themes von Grund auf entwickelt und Designs in funktionale Websites umgesetzt.",
      "Komplexe digitale Kampagnen und Webauftritte betreut, mit konsequenter Markenkonsistenz und klaren Produktionsabläufen vom Design bis zur Entwicklung.",
      "Eng mit technischen Stakeholdern zusammengearbeitet, um Markenanforderungen in funktionale visuelle Systeme zu übersetzen.",
    ],
  },
  skyscanner: {
    highlights: [
      "WordPress-Blogs für Deutschland, Österreich, die Schweiz, Griechenland und Zypern betreut: Layout und Funktionen definiert, neue Komponenten gebaut und Fehler behoben.",
      "Visuelle Ausrichtung und Content-Strategie für Artikel, Videos und Bilder verantwortet und einen Teil der visuellen Assets selbst erstellt.",
      "Reisetrends mit SQL-gestützter Datenanalyse aufgedeckt und die Erkenntnisse in gezielte visuelle Kommunikation und Tests von UI-Komponenten übertragen.",
      "Ein internationales Team aus über 10 Freelancern bei der Expansion in neue Märkte geführt.",
    ],
  },
  bigpoint: {
    highlights: [
      "Video- und Medieninhalte für Marketingkampagnen erstellt.",
      "UX/UI-Prototypen für In-Game-Oberflächen gestaltet.",
      "Leitfäden, Walkthroughs, Infografiken und Podcasts für die Spieler-Community erstellt.",
      "Ein Team aus 150 externen Freiwilligen in 22 Sprachteams koordiniert.",
    ],
  },
} as const satisfies TimelineTranslation;

export const languageNamesDe = {
  German: "Deutsch",
  Greek: "Griechisch",
  English: "Englisch",
  Dutch: "Niederländisch",
  Spanish: "Spanisch",
  Portuguese: "Portugiesisch",
} as const satisfies Record<LanguageName, string>;

export const proficiencyLabelsDe = {
  native: "Muttersprache",
  "business fluent": "verhandlungssicher",
  intermediate: "gute Kenntnisse",
} as const satisfies Record<LanguageProficiency, string>;
