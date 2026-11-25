import type { projects } from "./projects";

type ProjectData = (typeof projects)[number];

type MediaTextOf<Media> = Media extends { readonly link: object }
  ? { readonly alt: string; readonly linkLabel: string }
  : { readonly alt: string };

type NoteTextOf<Item> = Item extends { readonly note: string }
  ? { readonly note: string }
  : unknown;

type LabelsOf<Links> = { readonly [Index in keyof Links]: string };

type MediaTextsOf<Media> = { readonly [Index in keyof Media]: MediaTextOf<Media[Index]> };

type ProjectTextOf<Item extends ProjectData> = {
  readonly summary: string;
  readonly links: LabelsOf<Item["links"]>;
  readonly media: MediaTextsOf<Item["media"]>;
} & NoteTextOf<Item>;

export type ProjectTranslation = {
  readonly [Item in ProjectData as Item["id"]]: ProjectTextOf<Item>;
};

export interface ProjectMediaText {
  readonly alt: string;
  readonly linkLabel?: string;
}

export interface ProjectText {
  readonly summary: string;
  readonly note?: string;
  readonly links: readonly string[];
  readonly media: readonly ProjectMediaText[];
}

const liveSite = "Live-Website";
const archivedSite = "Archivierte Website";
const watchFilm = "Film ansehen";
const github = "GitHub";
const builtIn2026 =
  "Gebaut 2026. Die Live-Website kann sich seit diesen Screenshots verändert haben.";
const designedIn2025 =
  "Gestaltet 2025. Die Live-Website kann sich seit dem Launch verändert haben.";
const watchVenusFilm = "Venus-Film ansehen";
const watchSecretTemple = "Main Hall Teil 4 ansehen: The Secret Temple";

export const projectsDe = {
  "zero-carbon-analytics-original": {
    summary:
      "Zero Carbon Analytics startete als Spin-off der European Climate Foundation und veröffentlicht Klimaforschung. Ich habe Marke und UI von Grund auf gestaltet und das individuelle WordPress-Theme für Briefings und Erklärstücke gebaut.",
    links: [archivedSite],
    media: [
      {
        alt: "Themenseite Climate Science & Impact von Zero Carbon Analytics mit gelbem Banner und Briefing-Karten",
      },
      {
        alt: "Komplette Startseite von 2024 mit Wald-Hero zur Klimafinanzierung, aktuellen Inhalten und Themenkacheln",
      },
      { alt: "Komplette Themenseite Climate Science & Impact mit Briefing-Karten" },
      { alt: "Komplette Themenseite Food, Nature & Land mit Briefing-Karten" },
      { alt: "Mobile Ansicht des Climate Change Glossary mit A–Z-Buchstabenraster" },
      { alt: "Komplettes El-Niño-Briefing mit Waldbrandfoto, Kernpunkten und Langtext" },
      { alt: "Komplette Themenseite Economics & Finance mit Briefing-Karten" },
      { alt: "Briefing-Seite zum Sechsten Sachstandsbericht des IPCC" },
    ],
    note: "Gestaltet 2021. Die Website wurde inzwischen neu gestaltet; der Archiv-Link zeigt das Original.",
  },
  steelwatch: {
    summary:
      "Marke und UI für eine unabhängige Organisation, die den Weg der Stahlindustrie zur Dekarbonisierung analysiert, veröffentlicht auf Englisch, Japanisch und Koreanisch. Ich habe beides gestaltet und den externen Entwickler geführt, der die Website gebaut hat.",
    links: [liveSite],
    media: [
      {
        alt: "SteelWatch-Startseite mit einem Leitartikel zur Dekarbonisierung von Stahl im Jahr 2025",
      },
      {
        alt: "Komplettes Unternehmensprofil von Nippon Steel mit Berichtscover und Unternehmensbiografie",
      },
      { alt: "Komplettes japanisches Berichtsarchiv mit Berichtscovern und Tags" },
      {
        alt: "Komplette Pressemitteilung zu Nippon Steels Gary Works mit Anmerkungen und verwandten Publikationen",
      },
      { alt: "Japanische Teamprofilseite mit Porträt und Biografie" },
      { alt: "Komplette japanische Startseite mit roter Stahlskulptur im Hero" },
      { alt: "Komplette Teamseite mit Porträtfotos des SteelWatch-Teams" },
      { alt: "Kontaktseite mit Pressekontakt-Karte und Kontaktformular" },
    ],
    note: "Gestaltet 2023. Der Kunde hat die Live-Website seitdem bearbeitet, sie entspricht daher nicht mehr ganz dem ursprünglichen Design.",
  },
  "can-big-tech-stop-flying": {
    summary:
      "Warum fliegen, wenn man sich einloggen kann? Ein animierter Appell an Big Tech, unnötige Geschäftsreisen zu streichen. Ich habe ihn von der Idee bis zum finalen Schnitt umgesetzt: Skript, Regie, Design, Schnitt, Motion Graphics, Sprecherauswahl und Sound.",
    links: [watchFilm],
    media: [
      {
        alt: "Animierte Titelkarte mit der Frage Can Big Tech stop flying so much, ein Flugzeug fliegt über eine Karte",
      },
      {
        alt: "Smartphone mit der Aussage, dass die sieben größten Tech-Konzerne 2020 um 3,4 Billionen Dollar an Wert zulegten",
      },
      { alt: "Animiertes Liniendiagramm zum Einbruch des weltweiten Flugverkehrs 2020" },
      {
        alt: "Illustriertes Videocall-Raster mit lächelnden Kolleginnen und Kollegen und der Bildunterschrift and their employees are happier",
      },
      {
        alt: "Pilotenmütze und Sonnenbrille mit der Aufschrift Captain Obvious und der Bildunterschrift it’s really a no-brainer",
      },
      {
        alt: "Echter Videocall auf einem Laptop mit der Bildunterschrift Making video calls the norm for all business meetings",
      },
      { alt: "Die größten Firmenreise-Budgets 2019 mit den Logos von fünf Tech-Konzernen" },
    ],
  },
  "hydrogen-science-coalition": {
    summary:
      "Eine Datenbank weltweiter Wasserstoffprojekte, gestrichene eingeschlossen, die zeigt, welche Rolle Wasserstoff in der Energiewende wirklich spielt. Ich habe die UI für das gesamte Tracker-System gestaltet, von Suche und Filtern bis zu den Datentabellen.",
    links: [liveSite],
    media: [
      {
        alt: "Tracker zur Wasserstoffproduktion mit Suche, Filter-Chips und sortierbarer Projekttabelle",
      },
      {
        alt: "Komplette Tracker-Seite der Hydrogen Science Coalition, vom Offshore-Wind-Hero und den Zahlen zur Wasserstoffproduktion bis zu den Tabs der Projektdatenbank und der Tracker-Tabelle",
      },
      { alt: "Mobiles Design der Startseite der Hydrogen Science Coalition" },
    ],
    note: designedIn2025,
  },
  "interactive-calculator": {
    summary:
      "Zinseszins zum Ausprobieren: Schieberegler, Diagramme in Echtzeit und gespeicherte Szenarien zum Vergleichen. Ich habe Interest-ing gestaltet und gebaut, um Sparziele und langfristiges Wachstum greifbar zu machen.",
    links: [liveSite, github],
    media: [
      {
        alt: "Zinseszinsrechner mit Schiebereglern, Ergebniskarten und einem Wachstumsdiagramm, das zwei Szenarien vergleicht",
      },
      {
        alt: "Rechner mit einem gespeicherten Szenario 5-Year Wealth Builder und Wachstumsdiagramm",
      },
      { alt: "Mobile Ansicht des Sparzielrechners" },
    ],
    note: builtIn2026,
  },
  "atmosphere-hellboy": {
    summary:
      "Projection Mapping für die Hellboy-Vorführungen des Edinburgh International Film Festival: 21 Effekte und digitale Landschaften, die sich über 65 Szenen mit dem Film veränderten. Ich habe die 3D-Inhalte in Blender erstellt; Ami Bogin verantwortete das 2D.",
    links: [watchFilm],
    media: [
      {
        alt: "Cyanfarbener Feuereffekt, während einer Hellboy-Vorführung über die Kinowände projiziert, mit eingeblendeter digitaler Vorschau",
      },
      { alt: "Logo des Edinburgh International Film Festival, über das Publikum projiziert" },
      { alt: "Hellboy-Vorführung mit projizierten Lichtsäulen entlang der Kinowände" },
      {
        alt: "Portfolio-Tafel mit drei Projektionsszenen, beschriftet mit Filmsets, dezenten Effekten und Wettereffekten",
      },
      { alt: "Röntgenartige Filmset-Projektionen an den Wänden neben der Leinwand" },
      { alt: "Nahaufnahme projizierter Steampunk-Zahnräder und -Ketten an der Wand" },
      { alt: "Projizierter Wassereffekt, der sich über den Kinoboden ergießt" },
    ],
    note: "Eventfotos von Jonathan Pang.",
  },
  "zero-carbon-analytics-rebrand": {
    summary:
      "Vier Jahre nach dem Launch bekam Zero Carbon Analytics ein komplettes Redesign. Als Mitgestalter des Originals habe ich das Projekt geleitet, die Design- und Entwicklungsagenturen koordiniert und die technische Umsetzung unterstützt.",
    links: [liveSite],
    media: [
      {
        alt: "Themenseite Nature des neu gestalteten Zero Carbon Analytics mit lavendelfarbenem Hero und Research-Karten",
      },
      {
        alt: "Komplette Startseite des neu gestalteten Zero Carbon Analytics mit aktueller Forschung, Medienlogos und Testimonials",
      },
      { alt: "Komplette Über-uns-Seite mit dem Team in Schwarz-Weiß-Porträts" },
      { alt: "Komplettes Briefing zum Kongobecken mit Kernpunkten, Diagrammen und Datentabellen" },
      {
        alt: "Artikel-Footer mit Autorenkarte, Teilen-Buttons, weiterführender Lektüre und Kontaktformular",
      },
    ],
    note: "Gelauncht 2025. Die Live-Website kann sich seit dem Launch verändert haben.",
  },
  gasoutlook: {
    summary:
      "Ausführlicher Journalismus über die globalen Gasmärkte. Beim ursprünglichen Aufbau habe ich UI-Design und Entwicklung angeleitet und später den Sprachumschalter, interaktive UI-Elemente und redaktionelle Grafiken gestaltet.",
    links: [liveSite],
    media: [
      { alt: "Gas-Outlook-Karte des Schiffsverkehrs im Blue Corridor des Golfs von Kalifornien" },
      { alt: "Longread über LNG in Mexiko mit dem Foto eines Wals im Meer" },
      { alt: "Mobile Ansicht einer Infografik zu Meeresarten in einem Gas-Outlook-Artikel" },
      { alt: "Mobile Ansicht eines Diagramms zur Gasversorgung Mexikos" },
      {
        alt: "Kompletter Longread über organisierte Kriminalität und Investorenrisiken bei Mexikos LNG-Ausbau, mit Karten und Diagrammen",
      },
      { alt: "Desktop-Artikelansicht mit der Infografik zu Meeresarten und Teilen-Buttons" },
    ],
    note: designedIn2025,
  },
  "skyscanner-app": {
    summary:
      "Ein Erklärvideo für Skyscanners deutschsprachigen Markt, das die wichtigsten Funktionen der App animiert, von der Monatsansicht mit Preisbalken bis zu Preisalarmen. Konzept, Animation und Sounddesign von mir, als Teil einer Reihe von Feature-Videos.",
    links: [watchFilm],
    media: [
      {
        alt: "Animiertes iPhone-Mockup der Skyscanner-App mit der Monatsansicht und Preisbalken neben der Headline Flüge im günstigsten Monat finden",
      },
      { alt: "Titelkarte Die Skyscanner-App mit einem iPhone-Mockup an einem tropischen Strand" },
      { alt: "Suchbildschirm Alle Orte mit Globus-Symbol und animierter Headline" },
      {
        alt: "Top-Deals-Bildschirm mit Städtekacheln neben der Headline Mit einem Klick Top-Deals finden",
      },
      {
        alt: "Monatsansicht mit Preisbalken neben der Headline Überblick behalten mit der Monatsansicht",
      },
      { alt: "Teilen-Menü auf dem iPhone neben der Headline Per Screenshot mit Freunden teilen" },
      { alt: "Abspann Die Reisesuchmaschine mit App-Store- und Google-Play-Badges" },
    ],
  },
  core: {
    summary:
      "Meinungsforschung zu Klima und Energie, erkundbar gemacht. Ich habe einen schnellen ersten Prototyp gestaltet und programmiert und danach das aktuelle WordPress-Theme nach dem Entwurf eines UX/UI-Designers gebaut.",
    links: [liveSite],
    media: [
      { alt: "CORE-Startseite mit Einleitungstext und den neuesten Publikationen" },
      { alt: "Komplette Seite About CORE mit dem Forschungsteam und FAQs" },
      { alt: "Kompletter Data Explorer mit Länderfiltern, Balkendiagramm und Datentabelle" },
      { alt: "CORE-Startseite mit Publikationen zu Trackingstudien und Investorenumfragen" },
      { alt: "Komplette Übersicht Our Research mit Publikationskarten" },
      { alt: "Kompletter Forschungsartikel zu einer Pilotstudie in Belgien und Frankreich" },
      { alt: "Mobile Ansicht einer Pressemitteilung zur öffentlichen Meinung in Polen" },
    ],
    note: "Gebaut 2025. Die Live-Website kann sich seit dem Launch verändert haben.",
  },
  "lancet-countdown": {
    summary:
      "Eine Miniserie, in der Beschäftigte im Gesundheitswesen an der Front extremer Hitze erzählen, wie sie ihre Patientinnen und Patienten und ihre Arbeit beeinflusst. Ich habe sie geschnitten, das Sounddesign gemacht und die Motion Graphics erstellt.",
    links: [watchFilm],
    media: [
      {
        alt: "Patient mit Sauerstoff im Krankenhausbett mit dem Untertitel Climate change is a health crisis",
      },
      { alt: "Dr. Kim Loo in ihrer Praxis mit petrolfarbener Namenseinblendung" },
      { alt: "Feuerwehrmann Zac Unger mit seiner Namenseinblendung" },
      {
        alt: "Schlusskarte mit dem Lancet-Countdown-Logo über den vier Stimmen aus dem Gesundheitswesen",
      },
      { alt: "Medizinstudent Shashank Timalsina in Kathmandu mit seiner Namenseinblendung" },
      {
        alt: "Patient im Bett mit dem Untertitel Threats to human health are multiplying and intensifying due to climate change",
      },
      {
        alt: "Silhouette eines Feuerwehrmanns vor einem brennenden Gebäude mit einem Untertitel über die wachsende Gefahr",
      },
    ],
  },
  "project-lifehouse": {
    summary:
      "Projection Mapping im Anatomischen Museum Edinburgh: Anatomie, projiziert auf Statuen, Wände und Skelette, mit Kinect-Zonen, die zufällige Clips und Sounds auslösten, während sich die Besucher durch die Räume bewegten. Zusammen mit Ami Bogin und Ana Roman habe ich die 3D-Inhalte in Blender erstellt.",
    links: ["Trailer ansehen", "Venus-Film"],
    media: [
      { alt: "Leuchtend blaue Adern, im Dunkeln auf eine Statue der Venus von Milo projiziert" },
      {
        alt: "Von mir gestaltetes Plakat für Project:Lifehouse: a journey within, mit einem Torso der Venus von Milo",
      },
      {
        alt: "Mein Foto der Büste der Venus von Milo in magentafarbenem Licht im Anatomischen Museum",
        linkLabel: watchVenusFilm,
      },
      {
        alt: "Leuchtend blaue Adern, auf die Venus von Milo unter Museumsgemälden projiziert",
        linkLabel: watchVenusFilm,
      },
      {
        alt: "Anatomische Zeichnung von Herz und Gefäßen, auf die Statue projiziert",
        linkLabel: watchVenusFilm,
      },
      {
        alt: "Main Hall Teil 2: regenbogenfarbene Konturen rund um den Museumseingang",
        linkLabel: "Main Hall Teil 2 ansehen: The Welcoming",
      },
      {
        alt: "Main Hall Teil 3: Ein Glühwürmchen lässt das Emblem über dem Eingang leuchten",
        linkLabel: "Main Hall Teil 3 ansehen: The Firefly",
      },
      {
        alt: "Main Hall Teil 4: Säulen und Ranken, rund um den Museumseingang projiziert",
        linkLabel: watchSecretTemple,
      },
      {
        alt: "3D-Rendering des Eingangs mit Säulen, Ranken sowie roten und weißen Rosen",
        linkLabel: watchSecretTemple,
      },
      {
        alt: "Main Hall Teil 5: Eine projizierte Figur greift durch das runde Fenster über der Tür",
        linkLabel: "Main Hall Teil 5 ansehen: The Senses",
      },
    ],
  },
  "action-fc": {
    summary:
      "Eine Kampagne, die Fans des Frauenfußballs gegen Greenwashing in ihrem Sport mobilisiert. Ich habe die Website gestaltet und programmiert und die Geschichte mit Lottie und weiteren Animationen erzählt.",
    links: [archivedSite],
    media: [
      {
        alt: "Abschnitt The Problem von Action FC mit der Illustration einer Frau, die einen Fußball hält",
      },
      { alt: "Kampagnenseite von Action FC mit drei Kampagnenkarten auf dunkelblauem Hintergrund" },
      { alt: "Hero von Action FC mit der Headline Women’s football fans can change the game" },
    ],
    note: "Gestaltet 2024. Die Live-Website kann sich seit dem Launch verändert haben.",
  },
  "inspiration-burns": {
    summary:
      "Projection Mapping am Burns Monument in Edinburgh: Ich habe den Innenraum in Blender als „virtuelles Mobiliar“ nachgebaut und ein 3D-Buch auf dem Marmorpult animiert, den Ausgangspunkt jeder Sequenz. Entstanden mit Ami Bogin und Ana Roman.",
    links: [watchFilm],
    media: [
      {
        alt: "3D-Animation eines Buchs, das sich auf dem Marmorpult unter einem Steinbogen aufschlägt",
      },
      {
        alt: "Von mir gestaltetes Plakat für Inspiration:Burns mit der Silhouette von Robert Burns in fließenden Farben",
      },
      {
        alt: "3D-Buch, aufgeschlagen auf dem Marmorpult in der Steinnische",
        linkLabel: "Handsome Nell Teil 1 ansehen",
      },
      {
        alt: "3D-Rendering der mit Ranken überwucherten Steinnische über dem Marmorsockel",
        linkLabel: "Handsome Nell Teil 2 ansehen",
      },
      { alt: "Riesiges allsehendes Auge, gerendert für die torusförmige Decke des Monuments" },
      { alt: "3D-Statuen, gerahmt von Eichenlaub und Bäumen, für die Nischen des Monuments" },
      { alt: "Violettes Dornengitter, animiert über die Fensterrahmen des Monuments" },
      {
        alt: "Prozessseite aus der Masterarbeit: Oberflächenfotos, 3D-Drahtgittermodelle und texturiertes virtuelles Mobiliar",
      },
    ],
  },
  orryana: {
    summary:
      "Orryana, ein Finanz-Creator mit über 30.000 Followern, zieht von WordPress auf eine Headless-React-Plattform um. Ich gestalte und entwickle sie, von Finanzratgebern bis zu Rechnern; der Launch läuft.",
    links: [github],
    media: [
      { alt: "Hero der Orryana-Startseite mit Porträt und Rechner-Shortcuts" },
      { alt: "Komplette Artikelseite, die eine Spar-Challenge erklärt, mit Tipps und Diagramm" },
      { alt: "Komplette Übersicht der Finanzratgeber mit Themenfiltern und Artikelkarten" },
    ],
  },
  "apple-3d-showcase": {
    summary:
      "Eine MacBook-Pro-Seite im Apple-Stil, auf der ein interaktives 3D-Modell Funktionen und Farben zeigt. Gebaut, um GSAP, Three.js und React Three Fiber zu erkunden.",
    links: [liveSite, github],
    media: [
      {
        alt: "MacBook-Pro-Hero mit leuchtendem Laptop und der Headline Built for Apple Intelligence",
      },
      {
        alt: "Komplette MacBook-Pro-Showcase-Seite mit 3D-Modell, Farboptionen und Feature-Abschnitten",
      },
      {
        alt: "Abschnitt Take a closer look mit 3D-MacBook-Modell und Umschaltern für Farbe und Größe",
      },
      { alt: "3D-MacBook-Modell, schräg neben Feature-Texten" },
    ],
    note: builtIn2026,
  },
  "gsap-cocktail-website": {
    summary:
      "Eine Cocktailkarte, als Geschichte erzählt, mit hochwertigen Bildern, immersiven Layouts und animierten Übergängen. Ich habe sie gebaut, die Bewegung steuert GSAP.",
    links: [liveSite, github],
    media: [
      { alt: "Cocktail-Hero mit einem spritzenden grünen Drink und zwei Getränkekarten" },
      { alt: "About-Abschnitt mit einer Fotocollage aus Barkeepern und Cocktails" },
      { alt: "Cocktail-Slider mit einem Rezept für einen Raspberry Mojito" },
    ],
    note: builtIn2026,
  },
  "plant-pal": {
    summary:
      "Im Team entstanden: Plant-Pal hilft, die eigene Pflanzensammlung im Blick zu behalten, mit eigenen SVG-Statusanzeigen, Licht- und Wasserfiltern und responsiven Komponenten. Ich habe die App mitgestaltet und mitentwickelt.",
    links: [liveSite, github],
    media: [
      {
        alt: "Raster Explore all plants mit Suche und Pflanzenkarten auf dunkelgrünem Hintergrund",
      },
      { alt: "Detailkarte der Strelitzie (Bird of Paradise)" },
      { alt: "Formular zum Bearbeiten einer Pflanze mit Bild-Upload" },
    ],
  },
} as const satisfies ProjectTranslation;
