"use client";
import { ReactNode } from "react";
import { useEffectOnce } from "react-use";

import useToaster from "./useToaster";

const CallToast: React.FC<{
  children: ReactNode;
  duration?: number;
}> = ({ children, duration = 3000 }) => {
  const call = useToaster();

  useEffectOnce(() => {
    call(<>{children}</>, { duration });
  });
  return null;
};
export default CallToast;
