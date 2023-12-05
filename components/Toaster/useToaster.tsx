"use client";

import { ComponentProps, ReactNode, useContext } from "react";

import { ToastContext } from ".";
import Crust from "./Crust";

const useToaster = () => {
  const { call } = useContext(ToastContext);
  return call satisfies (
    inner: ReactNode,
    option?: {
      duration?: number;
      type?: ComponentProps<typeof Crust>["type"];
      onClick?(): void;
    }
  ) => void;
};

export default useToaster;
