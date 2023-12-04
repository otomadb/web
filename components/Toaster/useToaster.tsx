"use client";

import { ComponentProps, useContext } from "react";

import { ToastContext } from ".";
import Crust from "./Crust";

const useToaster = () => {
  const { call } = useContext(ToastContext);
  return call satisfies (
    inner: JSX.Element,
    option?: {
      duration?: number;
      type?: ComponentProps<typeof Crust>["type"];
    }
  ) => void;
};

export default useToaster;
