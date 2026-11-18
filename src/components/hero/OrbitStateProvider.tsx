"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export interface OrbitState {
  readonly ready: boolean;
  readonly hasInteracted: boolean;
  readonly markReady: () => void;
  readonly markInteracted: () => void;
}

const OrbitStateContext = createContext<OrbitState | null>(null);

export interface OrbitStateProviderProps {
  readonly children: ReactNode;
}

export default function OrbitStateProvider({ children }: OrbitStateProviderProps) {
  const [ready, setReady] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const markReady = useCallback((): void => setReady(true), []);
  const markInteracted = useCallback((): void => setHasInteracted(true), []);

  const value = useMemo(
    (): OrbitState => ({ ready, hasInteracted, markReady, markInteracted }),
    [ready, hasInteracted, markReady, markInteracted],
  );

  return <OrbitStateContext value={value}>{children}</OrbitStateContext>;
}

export function useOrbitState(): OrbitState {
  const state = useContext(OrbitStateContext);
  if (state === null) {
    throw new Error("useOrbitState must be used inside OrbitStateProvider");
  }
  return state;
}
