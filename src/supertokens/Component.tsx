"use client";

import dynamic from "next/dynamic";
import { ComponentProps } from "react";
import SuperTokens from "supertokens-auth-react";

export const SuperTokensComponentNoSSR = dynamic<
  ComponentProps<typeof SuperTokens.getRoutingComponent>
>(new Promise((res) => res(SuperTokens.getRoutingComponent)), { ssr: false });
