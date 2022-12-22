"use client";

import clsx from "clsx";
import Link from "next/link";
import React from "react";

import { SigninLink } from "~/components/common/Link";
import { UserIcon } from "~/components/common/UserIcon";
import { useViewer } from "~/hooks/useViewer";

export const Profile: React.FC<{ className?: string }> = ({ className }) => {
  const [{ data }] = useViewer();
  const whoami = data?.whoami;
  return (
    <div className={clsx(className, ["flex"])}>
      {whoami === undefined && (
        <div
          className={clsx(
            ["rounded-sm"],
            ["w-8"],
            ["h-8"],
            ["bg-slate-700"],
            ["animate-pulse"]
          )}
        ></div>
      )}
      {whoami === null && (
        <SigninLink
          className={clsx(
            ["flex"],
            ["flex-row"],
            ["items-center"],
            ["rounded"],
            ["px-4"],
            ["h-8"],
            ["transition-colors", "duration-75"],
            ["border", ["border-sky-400", "hover:border-sky-300"]],
            ["bg-sky-400", ["bg-opacity-25", "hover:bg-opacity-40"]],
            ["text-sky-400", "hover:text-sky-300"]
          )}
        >
          <span>Login</span>
        </SigninLink>
      )}
      {whoami && (
        <Link
          href={"/profile"}
          className={clsx(["flex"], ["flex-row"], ["items-center"])}
        >
          <UserIcon
            className={clsx(["w-8"], ["h-8"])}
            src={whoami.icon}
            name={whoami.name}
          />
        </Link>
      )}
    </div>
  );
};
