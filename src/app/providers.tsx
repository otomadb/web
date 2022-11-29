"use client";

import React, { ReactNode } from "react";
import { RecoilRoot } from "recoil";

import { GraphQLProvider } from "~/hooks/useGraphQLClient";

export const RecoilProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <RecoilProvider>
      <GraphQLProvider>{children}</GraphQLProvider>
    </RecoilProvider>
  );
}
