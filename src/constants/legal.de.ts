import type { PrivacyContent } from "./legal";

export const privacyContentDe = {
  title: "Datenschutzerklärung",
  updated: "Stand: 25. November 2026",
  sections: [
    {
      heading: "Verantwortlicher",
      paragraphs: [
        "Diese Website ist das persönliche Portfolio von Greg Telakis. Ich nutze sie ausschließlich, um potenziellen Arbeitgebern im Rahmen von Bewerbungen meine Arbeit zu zeigen. Sie wird von Suchmaschinen nicht indexiert.",
        "Verantwortlicher für die Verarbeitung personenbezogener Daten im Sinne der Datenschutz-Grundverordnung (DSGVO) ist Greg Telakis, erreichbar per E-Mail unter gtelakis@duck.com.",
      ],
    },
    {
      heading: "Was diese Website nicht tut",
      paragraphs: [
        "Diese Website verwendet keine Cookies, kein Tracking, keine Analyse-Tools, keine Werbung und keine Social-Media-Plugins und speichert nichts in deinem Browser.",
        "Schriften, Bilder, Videos, 3D-Modelle und der Lebenslauf-Download werden direkt von dieser Website ausgeliefert. Dein Browser nimmt beim Besuch also keinen Kontakt zu Dritten auf.",
      ],
    },
    {
      heading: "Hosting",
      paragraphs: [
        "Diese Website wird bei Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, USA, gehostet. Wenn du eine Seite aufrufst, sendet dein Browser technische Daten, die jeder Webserver zur Auslieferung braucht: deine IP-Adresse, Datum und Uhrzeit des Abrufs, die aufgerufene Seite sowie Browser- und Gerätetyp. Vercel verarbeitet diese Daten, um die Website auszuliefern und abzusichern, kann sie in kurzlebigen Server-Logs speichern und aus der IP-Adresse deine ungefähre Stadt und dein Land ableiten.",
        "Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO: mein berechtigtes Interesse an einer sicheren, funktionierenden Website. Vercel kann diese Daten in den USA verarbeiten. Vercel ist nach dem EU-U.S. Data Privacy Framework zertifiziert, für das ein Angemessenheitsbeschluss der Europäischen Kommission besteht (Art. 45 DSGVO). Details findest du in der Datenschutzerklärung von Vercel unter vercel.com/legal/privacy-policy.",
      ],
    },
    {
      heading: "Kontakt per E-Mail",
      paragraphs: [
        "Wenn du mir eine E-Mail schreibst, verarbeite ich die Daten, die du mir schickst: deine E-Mail-Adresse, deinen Namen, den Inhalt deiner Nachricht und eventuelle Anhänge. Ich nutze sie nur, um dir zu antworten und das Bewerbungsverfahren abzuwickeln, auf das sich deine Nachricht bezieht.",
        "gtelakis@duck.com ist eine Weiterleitungsadresse von DuckDuckGo Email Protection (Duck Duck Go, Inc., USA). Deine Nachricht wird an mein Postfach bei Google (Gmail) weitergeleitet, bereitgestellt von Google Ireland Limited, Irland. Auch Google kann Daten in den USA verarbeiten und ist nach dem EU-U.S. Data Privacy Framework zertifiziert.",
        "Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit deine Nachricht vorvertragliche Schritte zu einem möglichen Arbeitsverhältnis betrifft, ansonsten Art. 6 Abs. 1 lit. f DSGVO, mein berechtigtes Interesse an der Beantwortung deiner Nachricht. Ich lösche deine Nachrichten, sobald sie für diesen Zweck nicht mehr benötigt werden, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.",
      ],
    },
    {
      heading: "Links zu anderen Websites",
      paragraphs: [
        "Diese Website verlinkt auf andere Websites, etwa GitHub, LinkedIn, Live-Websites meiner Projekte und ein Dokument auf Google Drive. Von diesen Websites wird nichts geladen, bevor du auf einen Link klickst. Danach gilt die Datenschutzerklärung der jeweiligen Website.",
      ],
    },
    {
      heading: "Deine Rechte",
      paragraphs: [
        "Du hast das Recht auf Auskunft über deine personenbezogenen Daten (Art. 15 DSGVO), auf Berichtigung (Art. 16) oder Löschung (Art. 17), auf Einschränkung der Verarbeitung (Art. 18), auf Datenübertragbarkeit (Art. 20) und auf Widerspruch gegen eine Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (Art. 21). Um diese Rechte auszuüben, schreib mir an gtelakis@duck.com.",
        "Außerdem hast du das Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO), zum Beispiel bei der Behörde in deinem Land oder bei der Berliner Beauftragten für Datenschutz und Informationsfreiheit.",
      ],
    },
  ],
} as const satisfies PrivacyContent;
