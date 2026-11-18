import { TO_BE_PROVIDED } from "./projects";

export interface ClientLogo {
  readonly src: string;
  readonly width: number;
  readonly height: number;
}

export interface Client {
  readonly id: string;
  readonly name: string;
  readonly logo: ClientLogo | null;
}

export interface ClientsContent {
  readonly title: string;
  readonly context: string;
}

export const clientsContent = {
  title: "Selected clients",
  context: "via European Climate Foundation & Meliore Foundation",
} as const satisfies ClientsContent;

export const clients = [
  { id: "the-lancet", name: "The Lancet", logo: null },
  { id: "government-of-alberta", name: "Government of Alberta", logo: null },
  { id: "client-3", name: TO_BE_PROVIDED, logo: null },
  { id: "client-4", name: TO_BE_PROVIDED, logo: null },
  { id: "client-5", name: TO_BE_PROVIDED, logo: null },
  { id: "client-6", name: TO_BE_PROVIDED, logo: null },
] as const satisfies readonly Client[];
