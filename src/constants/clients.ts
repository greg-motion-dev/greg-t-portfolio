export interface ClientLogo {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly displayHeight: number;
}

export interface Client {
  readonly id: string;
  readonly name: string;
  readonly logo: ClientLogo | null;
}

export interface ClientsContent {
  readonly title: string;
}

export const clientsContent = {
  title: "Worked with",
} as const satisfies ClientsContent;

export const clients = [
  {
    id: "adobe",
    name: "Adobe",
    logo: {
      src: "/images/clients/adobe.png",
      width: 910,
      height: 240,
      displayHeight: 1.75,
    },
  },
  {
    id: "skyscanner",
    name: "Skyscanner",
    logo: {
      src: "/images/clients/skyscanner.png",
      width: 1470,
      height: 240,
      displayHeight: 1.75,
    },
  },
  {
    id: "canva",
    name: "Canva",
    logo: {
      src: "/images/clients/canva.png",
      width: 746,
      height: 240,
      displayHeight: 2.25,
    },
  },
  {
    id: "bigpoint",
    name: "Bigpoint",
    logo: {
      src: "/images/clients/bigpoint.svg",
      width: 4252,
      height: 861,
      displayHeight: 1.875,
    },
  },
  {
    id: "edinburgh-international-film-festival",
    name: "Edinburgh International Film Festival",
    logo: {
      src: "/images/clients/edinburgh-international-film-festival.png",
      width: 356,
      height: 240,
      displayHeight: 3.25,
    },
  },
  {
    id: "lancet-countdown",
    name: "Lancet Countdown",
    logo: {
      src: "/images/clients/lancet-countdown.svg",
      width: 644,
      height: 372,
      displayHeight: 3.75,
    },
  },
  {
    id: "city-of-edinburgh-council",
    name: "The City of Edinburgh Council",
    logo: {
      src: "/images/clients/city-of-edinburgh-council.png",
      width: 1194,
      height: 225,
      displayHeight: 2,
    },
  },
  {
    id: "european-climate-foundation",
    name: "European Climate Foundation",
    logo: {
      src: "/images/clients/european-climate-foundation.png",
      width: 400,
      height: 192,
      displayHeight: 3,
    },
  },
  {
    id: "zero-carbon-analytics",
    name: "Zero Carbon Analytics",
    logo: {
      src: "/images/clients/zero-carbon-analytics.svg",
      width: 1638,
      height: 384,
      displayHeight: 2,
    },
  },
  {
    id: "steelwatch",
    name: "SteelWatch",
    logo: {
      src: "/images/clients/steelwatch.png",
      width: 1602,
      height: 240,
      displayHeight: 1.75,
    },
  },
  {
    id: "gas-outlook",
    name: "Gas Outlook",
    logo: {
      src: "/images/clients/gas-outlook.svg",
      width: 2020,
      height: 1071,
      displayHeight: 3,
    },
  },
  {
    id: "hydrogen-science-coalition",
    name: "Hydrogen Science Coalition",
    logo: {
      src: "/images/clients/hydrogen-science-coalition.png",
      width: 1097,
      height: 240,
      displayHeight: 1.875,
    },
  },
  {
    id: "government-of-alberta",
    name: "Government of Alberta",
    logo: {
      src: "/images/clients/government-of-alberta.png",
      width: 698,
      height: 238,
      displayHeight: 2.5,
    },
  },
] as const satisfies readonly Client[];
