import { contactContent } from "./contact";
import { heroCtas } from "./hero";
import { privacyContent } from "./legal";
import { footerContent, navContact, navLinks } from "./navigation";
import { notFoundContent } from "./notFound";
import type { UiContent } from "./ui";

const [workCta, resumeCta] = heroCtas;

const heroIntroDe =
  "Vom Senior Visual Creator zum Creative UI Engineer: über 10 Jahre Erfahrung an der Schnittstelle von hochwertigem UI/UX-Design, interaktiver Motion und moderner Frontend-Architektur.";

export const uiContentDe = {
  meta: {
    title: "Greg | Creative Engineer",
    description: heroIntroDe,
  },
  nav: {
    links: [
      { name: "über mich", link: navLinks[0].link },
      { name: "projekte", link: navLinks[1].link },
      { name: "techstack", link: navLinks[2].link },
      { name: "erfahrung", link: navLinks[3].link },
    ],
    contact: { name: "kontakt", link: navContact.link },
    ariaLabel: "Hauptnavigation",
    languageSwitchLabel: "Sprache",
    profileLinkAriaTemplate: "{name}-Profil",
  },
  mobileNav: {
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    menu: "Menü",
  },
  footer: {
    copyright: footerContent.copyright,
    backToTopLabel: "Nach oben",
    privacyLink: { name: "Datenschutz", link: footerContent.privacyLink.link },
  },
  notFound: {
    code: notFoundContent.code,
    title: "Seite nicht gefunden",
    body: "Diese Seite ist aus der Umlaufbahn geraten.",
    homeLabel: "Zur Startseite",
    homeHref: notFoundContent.homeHref,
  },
  hero: {
    greeting: "Moin! Ich bin Greg.",
    intro: heroIntroDe,
    ctas: [
      { ...workCta, label: "Projekte ansehen" },
      { ...resumeCta, label: "Lebenslauf", href: "/greg-telakis-cv-de.pdf" },
    ],
    orbitHint: "zum Drehen ziehen",
    portraitAlt: "Porträt von Greg Telakis",
  },
  contact: {
    title: "Kontakt",
    introLines: [
      "Ich spreche immer gern über neue Rollen und Projekte.",
      "Am besten erreichst du mich per E-Mail.",
    ],
    availability: ["Offen für Festanstellungen", "Ansässig in Deutschland", "Remote weltweit"],
    email: contactContent.email,
    copyLabel: "E-Mail kopieren",
    copiedLabel: "Kopiert",
    copyFailedLabel: "Kopieren fehlgeschlagen",
  },
  clients: {
    title: "Zusammenarbeit mit",
  },
  techStack: {
    title: "Tech-Stack",
  },
  experience: {
    title: "Erfahrung",
    presentLabel: "heute",
    educationTitle: "Ausbildung",
    languagesTitle: "Sprachen",
    alsoTitle: "Weiteres",
    freelanceLabel: "Freiberuflich",
    earlyWorkLabel: "Projection Mapping",
  },
  timelineKindLabels: {
    work: "Beruf",
    training: "Weiterbildung",
    certification: "Zertifikat",
    project: "Projekt",
  },
  publicationKindLabels: {
    "master-thesis": "Masterarbeit",
  },
  lineup: {
    title: "Ausgewählte Projekte",
    linkPendingLabel: "Link folgt",
    githubCtaLabel: "Mehr auf GitHub",
    githubAlsoLabel: "Auch auf GitHub",
    galleryImagesLabel: "Bilder",
    galleryOpenLabel: "Galerie öffnen",
    galleryCloseLabel: "Galerie schließen",
    galleryPreviousLabel: "Vorheriges Bild",
    galleryNextLabel: "Nächstes Bild",
    galleryScrollHint: "Scrollen, um die ganze Seite zu sehen",
  },
  disciplinesAriaLabel: "Disziplinen",
  eraLabels: {
    professional: "Forschung & Politik",
    product: "Produkt & Marke",
    installation: "3D & Projektion",
    engineering: "SPICED & Interaktiv",
  },
  roleLabels: {
    built: "Entwickelt",
    "designed-and-built": "Gestaltet & entwickelt",
    designed: "Gestaltet",
    led: "Geleitet",
    "edited-and-animated": "Geschnitten & animiert",
    "designed-and-animated": "Gestaltet & animiert",
  },
  cvPage: {
    documentTitle: "Lebenslauf | Greg Telakis",
    profileSummary:
      "Vom Senior Visual Creator zum Creative UI Engineer: über 10 Jahre Erfahrung an der Schnittstelle von hochwertigem UI/UX-Design, interaktiver Motion und moderner Frontend-Architektur.",
    experienceTitle: "Berufserfahrung",
    skillsTitle: "Kenntnisse",
    languagesTitle: "Sprachen",
    educationTitle: "Ausbildung",
    freelanceTitle: "Freiberuflich",
    earlyWorkTitle: "Projection Mapping",
    publicationTitle: "Masterarbeit",
    alsoTitle: "Weiteres",
    workedWithTitle: "Tätig für",
    presentLabel: "heute",
    certificationTitle: "Zertifikat",
  },
  privacy: {
    title: "Datenschutzerklärung",
    body: privacyContent.body,
  },
} as const satisfies UiContent;
