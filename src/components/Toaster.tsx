"use client";

import { css, keyframes } from "@emotion/css";
import clsx from "clsx";
import {
  ContextType,
  createContext,
  createRef,
  forwardRef,
  Fragment,
  ReactNode,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { useLoop } from "./useLoop";

// eslint-disable-next-line react/display-name
const Toast = forwardRef<
  HTMLDivElement,
  { children: ReactNode; fired: number; duration: number }
>(({ children, fired, duration }, ref) => {
  const [pausedAt, setPausedAt] = useState<number | undefined>(undefined);
  const [until, setUntil] = useState(fired + duration);
  const [hidden, setHidden] = useState(false);

  useLoop(() => {
    if (!pausedAt && until < Date.now()) setHidden(true);
  });

  return (
    <div
      ref={ref}
      aria-hidden={hidden}
      onMouseEnter={() => {
        setPausedAt(Date.now());
      }}
      onMouseLeave={() => {
        if (pausedAt) setUntil((prev) => prev + Date.now() - pausedAt);
        setPausedAt(undefined);
      }}
      className={clsx(
        ["relative"],
        ["bg-white", "bg-opacity-75", "backdrop-blur"],
        ["overflow"],
        ["shadow"],
        css(`
          &[aria-hidden="true"] {
            animation-duration: 0.25s;
            animation-timing-function: ease-out;
            animation-fill-mode: both;
            animation-name: ${keyframes(
              "from{visibility:visible; opacity:1;} to{visibility:hidden; opacity:0;}"
            )};
          }
        `)
      )}
    >
      <div className={clsx(["px-4", "py-2"])}>{children}</div>
      <div
        className={clsx(
          ["w-full"],
          ["h-[2px]"],
          ["bg-teal-400"],
          css(`
            transform-origin: left;
            animation-name: ${keyframes("from{scale: 1 1;} to{scale: 0 1;}")};
            animation-fill-mode: both;
            animation-timing-function: linear;
          `)
        )}
        style={{
          animationDuration: `${duration}ms`,
          animationPlayState: pausedAt ? "paused" : "running",
        }}
      ></div>
    </div>
  );
});

export const ToastContext = createContext<{
  call: (inner: JSX.Element, option?: { duration: number }) => void;
}>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  call: () => {},
});
export const ToastProvider: React.FC<{
  children: ReactNode;
  selector: string;
}> = ({ children, selector }) => {
  const [toasts, setToasts] = useState<
    { id: string; ref: RefObject<HTMLDivElement>; Toast: JSX.Element }[]
  >([]);

  useLoop(() => {
    setToasts((prev) =>
      prev.filter(
        ({ ref }) =>
          !ref.current ||
          window.getComputedStyle(ref.current, null).visibility !== "hidden"
      )
    );
  });

  const mountTo = useRef<Element | null>();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (!document) return;
    mountTo.current = document.querySelector(selector);
    setMounted(true);
  }, [selector]);

  const call = useCallback((inner, { duration } = { duration: 3000 }) => {
    const id = crypto.randomUUID();
    const ref = createRef<HTMLDivElement>();
    setToasts((prev) => [
      ...prev,
      {
        id,
        ref,
        Toast: (
          <Toast ref={ref} fired={Date.now()} duration={duration}>
            {inner}
          </Toast>
        ),
      },
    ]);
  }, []) satisfies ContextType<typeof ToastContext>["call"];

  return (
    <ToastContext.Provider value={{ call }}>
      {children}
      {mounted &&
        mountTo.current &&
        createPortal(
          <div
            className={clsx(
              ["w-96"],
              ["fixed", "bottom-0", "right-0"],
              ["flex", "flex-col", "flex-col-reverse", "gap-y-2"],
              ["mr-4", "mb-4"]
            )}
          >
            {toasts.map(({ id, Toast }) => (
              <Fragment key={id}>{Toast}</Fragment>
            ))}
          </div>,
          mountTo.current
        )}
    </ToastContext.Provider>
  );
};

export const useToaster = () => {
  const { call } = useContext(ToastContext);
  return call;
};
