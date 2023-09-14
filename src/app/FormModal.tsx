"use client";

import clsx from "clsx";
import React, { ReactNode, useContext, useReducer } from "react";

import RegisterForm from "~/components/RegisterFromNicovideoForm";

type Current = undefined | { type: "FROM_NICOVIDEO"; source: string };

const FormModalContext = React.createContext<{
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

export const FormModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
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
    undefined
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

export default function FormModal({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const { current } = useContext(FormModalContext);

  return (
    <div className={clsx(className)} style={style}>
      {current?.type === "FROM_NICOVIDEO" && (
        <RegisterForm
          sourceId={current.source}
          className={clsx(["ml-2"])}
          style={{ width: 640, height: 720 }}
        />
      )}
    </div>
  );
}
