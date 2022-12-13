"use client";

import "client-only";

import { LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { useLogin } from "~/hooks/useLogin";

export const LoginForm: React.FC<{ className?: string }> = ({ className }) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [errorStatus, setErrorStatus] = useState<
    "NO_USER" | "WRONG_PASSWORD" | "UNKNOWN" | null
  >(null);

  const tryLogin = useLogin({
    onSuccess() {
      router.replace("/");
    },
    onError(status) {
      setErrorStatus(status);
    },
  });

  return (
    <form
      className={clsx(
        className,
        ["rounded-lg"],
        ["px-8", "pt-[3rem]", "pb-[calc(3rem-0.25rem)]"],
        ["flex", "flex-col"],
        ["bg-slate-100"],
        ["border", "border-slate-200"],
        ["shadow-lg"]
      )}
    >
      <label
        className={clsx(
          ["w-full"],
          ["group"],
          ["flex", ["items-stretch"]],
          ["border", "border-slate-300"],
          ["rounded-md"],
          ["overflow-hidden"]
        )}
      >
        <div
          className={clsx(
            ["flex-shrink-0"],
            ["flex"],
            ["px-4"],
            [["bg-teal-400"], ["bg-opacity-50"]]
          )}
        >
          <UserIcon
            className={clsx(
              ["place-self-center"],
              [["w-6"], ["h-6"]],
              ["text-teal-700"]
            )}
          />
        </div>
        <input
          value={name}
          placeholder={"ユーザーネーム"}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className={clsx(
            ["flex-grow"],
            ["px-4", "py-2"],
            ["rounded-r-md"],
            ["bg-slate-50"],
            ["outline-teal-300"],
            [["text-md"], ["text-slate-900"], ["placeholder:text-slate-300"]]
          )}
        ></input>
      </label>

      <label
        className={clsx(
          ["mt-4"],
          ["group"],
          ["w-full"],
          ["flex", ["items-stretch"]],
          ["border", "border-slate-300"],
          ["rounded-md"],
          ["overflow-hidden"]
        )}
      >
        <div
          className={clsx(
            ["flex-shrink-0"],
            ["flex"],
            ["px-4"],
            [["bg-teal-400"], ["bg-opacity-50"]]
          )}
        >
          <LockClosedIcon
            className={clsx(
              ["place-self-center"],
              [["w-6"], ["h-6"]],
              ["text-teal-700"]
            )}
          />
        </div>
        <input
          type="password"
          placeholder={"パスワード"}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className={clsx(
            ["flex-grow"],
            ["px-4", "py-2"],
            ["rounded-r-md"],
            ["bg-slate-50"],
            ["outline-teal-300"],
            [["text-md"], ["text-slate-900"], ["placeholder:text-slate-300"]]
          )}
        />
      </label>
      <button
        disabled={!name || !password}
        className={clsx(
          ["mt-8"],
          [["py-2"]],
          ["group"],
          ["transition-colors", "duration-75"],
          ["disabled:bg-slate-300", ["bg-teal-400", "hover:bg-teal-500"]],
          [
            "border",
            "disabled:border-slate-300",
            ["border-teal-300", "hover:border-teal-400"],
          ],
          ["rounded-md"]
        )}
        type="button"
        onClick={async () => {
          if (!name || !password) return;
          setErrorStatus(null);
          tryLogin({ name, password });
        }}
      >
        <span
          className={clsx(
            ["font-bold"],
            ["transition-colors", "duration-75"],
            [
              "group-disabled:text-slate-200",
              ["text-teal-100", "group-hover:text-teal-200"],
            ]
          )}
        >
          ログイン
        </span>
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
