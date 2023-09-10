"use client";

import { css, keyframes } from "@emotion/css";
import clsx from "clsx";
import {
  ContextType,
  createContext,
  Fragment,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { Portal } from "./Portal";

const blurout = keyframes`from{visibility:visible; opacity:1;} to{visibility:hidden; opacity:0;}`;
const barscale = keyframes`from{scale: 1 1;} to{scale: 0 1;}`;

const Toast = ({
  children,
  duration,
  onEnd,
}: {
  children: ReactNode;
  fired: number;
  duration: number;
  onEnd(): void;
}) => {
  return (
    <div
      className={clsx(
        ["group"],
        ["relative"],
        ["bg-white", "bg-opacity-75", "backdrop-blur"],
        ["overflow"],
        ["shadow"],
        css`
          &[aria-hidden="true"] {
            animation-duration: 0.25s;
            animation-timing-function: ease-out;
            animation-fill-mode: both;
            animation-name: ${blurout};
          }
        `
      )}
    >
      <div className={clsx(["px-4", "py-2"])}>{children}</div>
      <div
        className={clsx(
          ["w-full"],
          ["h-[2px]"],
          ["bg-teal-400"],
          ["group-hover:animation-pause"],
          css`
            transform-origin: left;
            animation-name: ${barscale};
            animation-fill-mode: both;
            animation-timing-function: linear;
          `
        )}
        style={{
          animationDuration: `${duration}ms`,
        }}
        onAnimationEnd={() => {
          onEnd();
        }}
      ></div>
    </div>
  );
};

export const ToastContext = createContext<{
  call: (inner: JSX.Element, option?: { duration: number }) => void;
}>({
  call: () => {}, // eslint-disable-line no-empty-function
});
export const ToastProvider: React.FC<{
  children: ReactNode;
  selector: string;
}> = ({ children, selector }) => {
  const [toasts, setToasts] = useState<{ id: string; Toast: JSX.Element }[]>(
    []
  );

  const eat = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);
  const call = useCallback(
    (inner, { duration } = { duration: 3000 }) => {
      const id = crypto.randomUUID();

      setToasts((prev) => [
        ...prev,
        {
          id,
          Toast: (
            <Toast fired={Date.now()} duration={duration} onEnd={() => eat(id)}>
              {inner}
            </Toast>
          ),
        },
      ]);
    },
    [eat]
  ) satisfies ContextType<typeof ToastContext>["call"];

  return (
    <ToastContext.Provider value={{ call }}>
      {children}
      <Portal selector={selector}>
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
        </div>
      </Portal>
    </ToastContext.Provider>
  );
};

export const useToaster = () => {
  const { call } = useContext(ToastContext);
  return call;
};

export const CallToast: React.FC<{
  children: ReactNode;
  duration?: number;
}> = ({ children, duration = 3000 }) => {
  const call = useToaster();

  useEffect(
    () => {
      call(<>{children}</>, { duration });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return null;
};
