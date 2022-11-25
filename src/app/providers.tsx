"use client";

import React, { ReactNode } from "react";
import { RecoilRoot } from "recoil";

export const RecoilProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default function Providers({ children }: { children: ReactNode }) {
  return <RecoilProvider>{children}</RecoilProvider>;
}
