"use client";

import "client-only";

import { Auth0Provider as UnconfiguredAuth0Provider } from "@auth0/auth0-react";
import { ReactNode } from "react";

export default function Auth0Provider({ children }: { children: ReactNode }) {
  return (
    <UnconfiguredAuth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      authorizationParams={{
        audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
        redirect_uri:
          typeof window === "object"
            ? `${window.location.origin}/me`
            : undefined,
        scope: [
          "create:mylist",
          "create:registration_request",
          "create:tagging",
          "create:video",
          "edit:mylist",
          "remove:tagging",
          "update:mylist_registration",
        ].join(" "),
      }}
    >
      {children}
    </UnconfiguredAuth0Provider>
  );
}
