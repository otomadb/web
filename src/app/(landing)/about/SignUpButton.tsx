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
        "group/button duration-50 flex items-center gap-x-2 rounded-sm border border-coal-darker bg-transparent px-4 py-2 transition-colors hover:bg-coal-darker"
      )}
    >
      <Pictogram
        icon="signup"
        className={clsx(
          "duration-50  h-4 text-coal-darker transition-colors group-hover/button:text-vivid-primary"
        )}
      />
      <span
        className={clsx(
          "duration-50 whitespace-nowrap text-sm text-coal-darker transition-colors group-hover/button:text-vivid-primary"
        )}
      >
        ユーザー登録
      </span>
    </button>
  );
};
