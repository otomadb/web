"use client";

import "client-only";

import { LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { useIsLoggedIn } from "~/hooks/useIsLoggedIn";
import { useLogin } from "~/hooks/useLogin";

export const LoginForm: React.FC<{ className?: string }> = ({ className }) => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [errorStatus, setErrorStatus] = useState<
    "NO_USER" | "WRONG_PASSWORD" | "UNKNOWN" | null
  >(null);

  const isLoggedIn = useIsLoggedIn();
  const tryLogin = useLogin({
    onSuccess() {
      router.replace("/");
    },
    onError(status) {
      setErrorStatus(status);
    },
  });

  useEffect(() => {
    if (isLoggedIn) router.replace("/");
  }, [isLoggedIn, router]);

  return (
    <form
      className={clsx(
        className,
        ["rounded-lg"],
        ["px-8", "pt-[3rem]", "pb-[calc(3rem-0.25rem)]"],
        ["flex", "flex-col"],
        ["shadow-lg"],
        ["bg-slate-800"],
        ["border", "border-slate-200"]
      )}
    >
      <label
        className={clsx(
          ["w-full"],
          ["flex", ["items-stretch"]],
          ["border", "border-slate-400"],
          ["rounded-md"],
          ["overflow-hidden"]
        )}
      >
        <div
          className={clsx(
            ["flex"],
            ["px-3"],
            ["flex-shrink-0"],
            [["bg-sky-400"], ["bg-opacity-25"]]
          )}
        >
          <UserIcon
            className={clsx(
              ["place-self-center"],
              ["w-6"],
              ["h-6"],
              ["text-sky-300"]
            )}
          />
        </div>
        <input
          value={name}
          placeholder={"Username"}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className={clsx(
            ["flex-grow"],
            ["px-4", "py-2"],
            ["rounded-r-md"],
            ["bg-transparent"],
            ["outline-sky-300"],
            ["text-md"],
            ["text-slate-50"],
            ["placeholder:text-slate-500"]
          )}
        ></input>
      </label>

      <label
        className={clsx(
          ["mt-4"],
          ["w-full"],
          ["flex", ["items-stretch"]],
          ["border", "border-slate-400"],
          ["rounded-md"],
          ["overflow-hidden"]
        )}
      >
        <div
          className={clsx(
            ["flex"],
            ["px-3"],
            ["flex-shrink-0"],
            [["bg-sky-400"], ["bg-opacity-25"]]
          )}
        >
          <LockClosedIcon
            className={clsx(
              ["place-self-center"],
              ["w-6"],
              ["h-6"],
              ["text-sky-300"]
            )}
          />
        </div>
        <input
          type="password"
          placeholder={"Password"}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className={clsx(
            ["flex-grow"],
            ["px-4", "py-2"],
            ["rounded-r-md"],
            ["bg-transparent"],
            ["outline-sky-300"],
            ["text-md"],
            ["text-slate-50"],
            ["placeholder:text-slate-500"]
          )}
        />
      </label>
      <button
        disabled={!name || !password}
        className={clsx(
          ["mt-8"],
          [["py-2"]],
          ["group"],
          [
            ["bg-sky-400", "disabled:bg-slate-700"],
            ["bg-opacity-25", "hover:bg-opacity-50"],
          ],
          [
            "border",
            [
              "border-sky-300",
              "disabled:border-slate-500",
              "hover:border-sky-200",
            ],
          ],
          ["text-sky-300", "disabled:text-slate-500", "hover:text-sky-200"],
          ["transition-colors", "duration-75"],
          ["rounded-md"]
        )}
        type="button"
        onClick={async () => {
          if (!name || !password) return;
          setErrorStatus(null);
          tryLogin({ name, password });
        }}
      >
        <span className={clsx()}>Sign in</span>
      </button>
      <div
        className={clsx(
          ["mt-[0.25rem]"],
          ["flex", ["items-center"]],
          ["h-[1.5rem]"]
        )}
      >
        <span className={clsx(["text-sm"], ["text-red-400"])}>
          {errorStatus === "NO_USER" && <>存在しないユーザー</>}
          {errorStatus === "WRONG_PASSWORD" && <>誤ったパスワード</>}
          {errorStatus === "UNKNOWN" && <>不明なエラー</>}
        </span>
      </div>
    </form>
  );
};
