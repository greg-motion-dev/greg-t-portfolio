export interface WordItem {
  readonly text: string;
  readonly imgPath: string;
}

export const words: readonly WordItem[] = [
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
] as const;

export interface CounterItem {
  readonly value: number;
  readonly suffix: string;
  readonly label: string;
}

export const counterItems: readonly CounterItem[] = [
  { value: 12, suffix: "+", label: "Years Building Web Platforms" },
  { value: 50, suffix: "+", label: "Web Projects & Apps Delivered" },
  { value: 6, suffix: "+", label: "Years Leading Teams & Web Strategy" },
  { value: 100, suffix: "%", label: "TypeScript & Interactive Stack" },
] as const;
