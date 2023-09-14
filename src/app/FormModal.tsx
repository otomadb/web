"use client";

import "client-only";

import clsx from "clsx";
import React, { ReactNode, useContext, useReducer } from "react";

import { XMarkIcon } from "~/components/Icons";
import RegisterForm from "~/components/RegisterFromNicovideoForm";

type Current = undefined | { type: "FROM_NICOVIDEO"; source: string };

export const FormModalContext = React.createContext<{
  current: Current;
  open(t: Exclude<Current, undefined>): void;
  close(): void;
}>({
  current: undefined,
  open() {
    return;
  },
  close() {
    return;
  },
});

export const FormModalProvider: React.FC<{
  children: ReactNode;
  init?: Current;
}> = ({ children, init }) => {
  const [r, reducer] = useReducer(
    (
      _: Current,
      action:
        | { type: "close" }
        | { type: "open"; t: Exclude<Current, undefined> }
    ) => {
      switch (action.type) {
        case "close":
          return undefined;
        case "open":
          return action.t;
      }
    },
    init
  );

  return (
    <FormModalContext.Provider
      value={{
        current: r,
        open: (t) => reducer({ type: "open", t }),
        close: () => reducer({ type: "close" }),
      }}
    >
      {children}
    </FormModalContext.Provider>
  );
};

export const useOpenFromNicovideo = () => {
  const { open } = useContext(FormModalContext);
  return (s: string) => open({ type: "FROM_NICOVIDEO", source: s });
};

export const useClose = () => {
  const { close } = useContext(FormModalContext);
  return close;
};

export default function FormModal({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const { current } = useContext(FormModalContext);
  const close = useClose();

  return (
    <div className={clsx(className, ["flex"])} style={style}>
      {current && (
        <div
          className={clsx(
            ["flex", "flex-col"],
            ["border", "border-slate-700", "rounded"]
          )}
        >
          <div
            className={clsx(
              ["flex", "items-center"],
              [["px-4"], ["py-2"]],
              ["bg-slate-800"],
              ["border-b", "border-slate-700"]
            )}
          >
            <span className={clsx(["text-slate-500", "text-xs", "font-bold"])}>
              {current.type === "FROM_NICOVIDEO" && "ニコニコ動画から登録"}
            </span>
            <button
              type="button"
              className={clsx(
                ["ml-auto"],
                ["w-4", "h-4"],
                ["text-slate-500", "hover:text-slate-400"]
              )}
              onClick={(e) => {
                e.preventDefault();
                close();
              }}
            >
              <XMarkIcon />
            </button>
          </div>
          <div className={clsx(["bg-slate-900"])}>
            {current.type === "FROM_NICOVIDEO" && (
              <RegisterForm
                sourceId={current.source}
                className={clsx()}
                style={{ width: 640, height: 720 }}
                handleSuccess={() => {
                  close();
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
