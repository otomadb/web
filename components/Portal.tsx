import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export const Portal: React.FC<{ children: ReactNode; selector: string }> = ({
  children,
  selector,
}) => {
  const mountTo = useRef<Element | null>();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (!document) return;
    mountTo.current = document.querySelector(selector);
    setMounted(true);
  }, [selector]);

  return mounted && mountTo.current
    ? createPortal(children, mountTo.current)
    : null;
};
