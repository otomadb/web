"use client";

import clsx from "clsx";
import { ComponentProps, createContext, ReactNode, useReducer } from "react";

import { Portal } from "../Portal";
import Crust from "./Crust";

export const ToastContext = createContext<{
  call: (
    inner: JSX.Element,
    option?: Partial<Pick<ComponentProps<typeof Crust>, "duration" | "type">>
  ) => void;
}>({
  call: () => {}, // eslint-disable-line no-empty-function -- for type safety
});

export const ToastProvider: React.FC<{
  children: ReactNode;
  selector: string;
}> = ({ children, selector }) => {
  const [toasts, reducer] = useReducer(
    (
      prev: {
        id: string;
        duration: number;
        inner: JSX.Element;
        fired: ComponentProps<typeof Crust>["fired"];
        type: ComponentProps<typeof Crust>["type"];
      }[],
      action:
        | { type: "eat"; id: string }
        | {
            type: "call";
            inner: JSX.Element;
            option: {
              duration: number;
              type: ComponentProps<typeof Crust>["type"];
            };
          }
    ) => {
      switch (action.type) {
        case "eat":
          return prev.filter((t) => t.id !== action.id);
        case "call":
          return [
            ...prev,
            {
              id: crypto.randomUUID(),
              fired: Date.now(),
              inner: action.inner,
              ...action.option,
            },
          ];
      }
    },
    []
  );
  return (
    <ToastContext.Provider
      value={{
        call: (inner, option) => {
          reducer({
            type: "call",
            inner,
            option: {
              duration: option?.duration ?? 3000,
              type: option?.type ?? "info",
            },
          });
        },
      }}
    >
      {children}
      <Portal selector={selector}>
        <div className={clsx("flex flex-col-reverse gap-y-2")}>
          {toasts.map(({ id, inner, ...rest }) => (
            <Crust
              {...rest}
              key={id}
              eatMe={() => reducer({ type: "eat", id })}
            >
              {inner}
            </Crust>
          ))}
        </div>
      </Portal>
    </ToastContext.Provider>
  );
};
