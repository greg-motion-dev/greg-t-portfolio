export interface PrivacySection {
  readonly heading: string;
  readonly paragraphs: readonly string[];
}

export interface PrivacyContent {
  readonly title: string;
  readonly updated: string;
  readonly sections: readonly PrivacySection[];
}

export const privacyContent = {
  title: "Privacy Policy",
  updated: "Last updated: 25 November 2026",
  sections: [
    {
      heading: "Who is responsible",
      paragraphs: [
        "This website is the personal portfolio of Greg Telakis. I use it only to share my work with potential employers when I apply for jobs, and it is not indexed by search engines.",
        "The controller responsible for processing personal data under the General Data Protection Regulation (GDPR) is Greg Telakis, reachable by email at gtelakis@duck.com.",
      ],
    },
    {
      heading: "What this website does not do",
      paragraphs: [
        "This website uses no cookies, no analytics or tracking, no advertising and no social media plugins, and it stores nothing in your browser.",
        "Fonts, images, videos, 3D assets and the CV download are all served from this website itself, so your browser does not contact any third party while you browse here.",
      ],
    },
    {
      heading: "Hosting",
      paragraphs: [
        "This website is hosted by Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, USA. When you open a page, your browser sends the technical data every web server needs to deliver it: your IP address, the date and time of the request, the page requested, and your browser and device type. Vercel processes this data to deliver the website and keep it secure, may keep it in short-lived server logs, and may derive your approximate city and country from your IP address.",
        "The legal basis is Art. 6(1)(f) GDPR: my legitimate interest in delivering a secure, working website. Vercel may process this data in the USA. Vercel is certified under the EU-U.S. Data Privacy Framework, for which the European Commission has adopted an adequacy decision (Art. 45 GDPR). For details, see Vercel’s privacy policy at vercel.com/legal/privacy-policy.",
      ],
    },
    {
      heading: "Contacting me by email",
      paragraphs: [
        "If you email me, I process the data you send: your email address, your name, the content of your message and any attachments. I use it only to reply to you and to handle the application process your message relates to.",
        "gtelakis@duck.com is a forwarding address provided by DuckDuckGo Email Protection (Duck Duck Go, Inc., USA), which forwards your message to my mailbox at Google (Gmail), provided by Google Ireland Limited, Ireland. Google may also process data in the USA and is certified under the EU-U.S. Data Privacy Framework.",
        "The legal basis is Art. 6(1)(b) GDPR where your message relates to steps before a possible employment contract, and otherwise Art. 6(1)(f) GDPR, my legitimate interest in answering your message. I delete your messages once they are no longer needed for this purpose, unless a legal obligation requires me to keep them.",
      ],
    },
    {
      heading: "Links to other websites",
      paragraphs: [
        "This website links to other websites, such as GitHub, LinkedIn, live project websites and a document on Google Drive. Nothing from these websites is loaded until you click a link. Once you do, the privacy policy of that website applies.",
      ],
    },
    {
      heading: "Your rights",
      paragraphs: [
        "You have the right to access your personal data (Art. 15 GDPR), to have it corrected (Art. 16) or erased (Art. 17), to restrict its processing (Art. 18), to data portability (Art. 20), and to object to processing based on Art. 6(1)(f) GDPR (Art. 21). To exercise these rights, email me at gtelakis@duck.com.",
        "You also have the right to lodge a complaint with a data protection supervisory authority (Art. 77 GDPR), for example the authority in your country or the Berlin Commissioner for Data Protection and Freedom of Information.",
      ],
    },
  ],
} as const satisfies PrivacyContent;
