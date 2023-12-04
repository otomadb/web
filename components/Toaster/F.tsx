"use client";

import clsx from "clsx";

import useToaster from "./useToaster";

export default function ToastCaller() {
  const call = useToaster();

  return (
    <button
      className={clsx("text-snow-primary")}
      onClick={() => {
        call(<p className={clsx("text-snow-primary")}>A</p>, {
          duration: 20000,
        });
      }}
    >
      Go on
    </button>
  );
}
