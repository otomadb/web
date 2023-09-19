"use client";

import "client-only";

import { withAuthenticationRequired } from "@auth0/auth0-react";
import { ReactNode } from "react";

const Guard = withAuthenticationRequired(
  ({ children }: { children: ReactNode }) => <>{children}</>,
  {
    loginOptions: {
      authorizationParams: {
        scope: ["create:registration_request"].join(" "),
      },
    },
  }
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Guard>{children}</Guard>;
}
