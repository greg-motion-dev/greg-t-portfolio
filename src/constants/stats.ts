export interface CounterItem {
  readonly value: number;
  readonly suffix: string;
  readonly label: string;
}

export const counterItems = [
  { value: 12, suffix: "+", label: "Years Building Web Platforms" },
  { value: 50, suffix: "+", label: "Web Projects & Apps Delivered" },
  { value: 6, suffix: "+", label: "Years Leading Teams & Web Strategy" },
  { value: 100, suffix: "%", label: "TypeScript & Interactive Stack" },
] as const satisfies readonly CounterItem[];
