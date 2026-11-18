import { useEffect, useState, type RefObject } from "react";

export function useInView<T extends Element>(ref: RefObject<T | null>): boolean {
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (element === null) {
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry !== undefined) {
        setInView(entry.isIntersecting);
      }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  return inView;
}
