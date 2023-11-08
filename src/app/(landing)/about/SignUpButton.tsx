"use client";

import { useAuth0 } from "@auth0/auth0-react";
import Button from "~/components/Button";

export const SignupButton = (
  props: Omit<React.ComponentProps<typeof Button>, "onClick" | "ariaLabel">
) => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      {...props}
      onClick={() => {
        loginWithRedirect({
          appState: {
            returnTo:
              typeof window === "object"
                ? new URL("/me", window.location.origin).toString()
                : undefined,
          },
        });
      }}
      text="ユーザー登録"
      ariaLabel="ユーザー登録"
      icon="signup"
    />
  );
};
