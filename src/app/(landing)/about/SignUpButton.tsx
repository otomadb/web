"use client";

import { useAuth0 } from "@auth0/auth0-react";
import clsx from "clsx";

import Pictogram from "~/components/Pictogram";

export const SignupButton = ({ className }: { className?: string }) => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      type="button"
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
      aria-label="ユーザー登録"
      className={clsx(
        className,
        "rounded-sm bg-transparent flex items-center group/button border gap-x-2 hover:bg-coal-darker border-coal-darker py-2 px-4 transition-colors duration-50"
      )}
    >
      <Pictogram
        icon="signup"
        className={clsx(
          "text-coal-darker  group-hover/button:text-vivid-primary h-4 transition-colors duration-50"
        )}
      />
      <span
        className={clsx(
          "text-coal-darker group-hover/button:text-vivid-primary whitespace-nowrap text-sm transition-colors duration-50"
        )}
      >
        ユーザー登録
      </span>
    </button>
  );
};
