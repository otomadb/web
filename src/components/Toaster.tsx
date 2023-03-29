"use client";

import { createContext, ReactNode, useCallback, useContext } from "react";

export const ToastContext = createContext<{
  call: (toast: JSX.Element) => void;
}>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  call: () => {},
});
export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const call = useCallback(() => {
    console.log("TODO");
  }, []);
  return (
    <ToastContext.Provider value={{ call }}>{children}</ToastContext.Provider>
  );
};

export const useToaster = () => {
  const { call } = useContext(ToastContext);
  return call;
};
