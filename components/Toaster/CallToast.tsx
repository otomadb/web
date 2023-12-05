"use client";
import { ReactNode } from "react";
import { useEffectOnce } from "react-use";

import useToaster from "./useToaster";

const CallToast: React.FC<
  {
    children: ReactNode;
  } & Parameters<ReturnType<typeof useToaster>>[1]
> = ({ children, ...callOptions }) => {
  const call = useToaster();

  useEffectOnce(() => {
    call(<>{children}</>, callOptions);
  });
  return null;
};
export default CallToast;
