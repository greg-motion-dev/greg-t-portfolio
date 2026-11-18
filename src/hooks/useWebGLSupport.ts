import { useSyncExternalStore } from "react";

let cachedSupport: boolean | null = null;

function detectWebGL(): boolean {
  if (cachedSupport !== null) {
    return cachedSupport;
  }
  try {
    const probe = document.createElement("canvas");
    cachedSupport = probe.getContext("webgl2") !== null;
  } catch {
    cachedSupport = false;
  }
  return cachedSupport;
}

const subscribe = (): (() => void) => () => {};
const getServerSnapshot = (): boolean => false;

export function useWebGLSupport(): boolean {
  return useSyncExternalStore(subscribe, detectWebGL, getServerSnapshot);
}
