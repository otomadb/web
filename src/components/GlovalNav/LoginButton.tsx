"use client";

import "client-only";

import { useAuth0 } from "@auth0/auth0-react";
import clsx from "clsx";
import { UseQueryExecute } from "urql";

export default function LoginButton({
  className,
}: {
  className?: string;
  update: UseQueryExecute;
}) {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      type="button"
      onClick={async (e) => {
        e.preventDefault();
        await loginWithRedirect({
          appState: {
            returnTo:
              typeof window === "object"
                ? new URL("/me", window.location.origin).toString()
                : undefined,
          },
        });
      }}
      className={clsx(
        className,
        ["flex", "flex-row", "items-center"],
        ["rounded"],
        ["px-3", "py-1"],
        ["transition-colors", "duration-75"],
        "border border-sky-400 bg-sky-400/20 text-sky-400 hover:border-sky-300 hover:bg-sky-400/40 hover:text-sky-300"
      )}
    >
      <span>ログイン</span>
    </button>
  );
}
