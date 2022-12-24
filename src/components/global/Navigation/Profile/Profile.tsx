"use client";

import clsx from "clsx";
import React from "react";

import { LinkSignin } from "~/components/common/Link";
import { UserIcon } from "~/components/common/UserIcon";
import { useViewer } from "~/hooks/useViewer";

import { Accordion } from "./Accordion";

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
        <LinkSignin
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
        </LinkSignin>
      )}
      {whoami && (
        <div className={clsx(["relative"], ["group"], ["flex"])}>
          <div tabIndex={0}>
            <UserIcon
              className={clsx(["w-[2rem]"], ["h-[2rem]"])}
              src={whoami.icon}
              name={whoami.name}
            />
          </div>
          <Accordion
            className={clsx(
              ["w-[16rem]"],
              [
                "invisible",
                "group-focus-within:visible",
                "group-hover:visible",
              ],
              ["absolute"],
              ["top-full"],
              ["-left-[7rem]"],
              ["mx-auto"]
            )}
            user={whoami}
          />
        </div>
      )}
    </div>
  );
};
