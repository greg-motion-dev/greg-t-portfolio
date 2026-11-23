import type { CSSProperties, ReactNode } from "react";

export interface PhoneFrameProps {
  readonly style?: CSSProperties;
  readonly children: ReactNode;
}

export default function PhoneFrame({ style, children }: PhoneFrameProps) {
  return (
    <div
      style={style}
      className="overflow-hidden rounded-[2rem] border border-white/15 bg-black p-2 shadow-2xl shadow-black/60"
    >
      <div className="overflow-hidden rounded-[1.5rem]">{children}</div>
    </div>
  );
}
