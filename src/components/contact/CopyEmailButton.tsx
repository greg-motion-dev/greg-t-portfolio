"use client";

import { useEffect, useRef, useState } from "react";

type CopyStatus = "idle" | "copied" | "failed";

export interface CopyEmailButtonProps {
  readonly email: string;
  readonly label: string;
  readonly copiedLabel: string;
  readonly failedLabel: string;
}

const statusClasses = {
  idle: "border-white/20 text-ink hover:border-ink",
  copied: "border-brand-yellow text-brand-yellow",
  failed: "border-brand-pink text-brand-pink",
} as const satisfies Record<CopyStatus, string>;

const resetDelayMs = 2000;

export default function CopyEmailButton({
  email,
  label,
  copiedLabel,
  failedLabel,
}: CopyEmailButtonProps) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  async function copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }

    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current);
    }
    resetTimerRef.current = window.setTimeout(() => setStatus("idle"), resetDelayMs);
  }

  const statusLabels = {
    idle: label,
    copied: copiedLabel,
    failed: failedLabel,
  } as const satisfies Record<CopyStatus, string>;

  return (
    <button
      type="button"
      onClick={() => void copyEmail()}
      className={`focus-ring min-w-36 border px-4 py-2 font-mono text-xs tracking-widest uppercase transition-colors motion-reduce:transition-none ${statusClasses[status]}`}
    >
      <span aria-live="polite">{statusLabels[status]}</span>
    </button>
  );
}
