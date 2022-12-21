"use client";

import clsx from "clsx";
import Link from "next/link";
import React from "react";

import { UserIcon } from "~/components/common/UserIcon";
import { graphql } from "~/gql";
import { useViewer } from "~/hooks/useViewer";

graphql(`
  query GlobalNav_Profile {
    whoami {
      id
      name
      displayName
      icon
    }
  }
`);

export const Profile: React.FC<{ className?: string }> = ({ className }) => {
  const [result] = useViewer();
  const { data } = result;

  const whoami = data?.whoami;
  if (whoami === null) {
    return (
      <div className={clsx(className)}>
        <Link
          className={clsx(
            ["rounded"],
            ["px-4", "py-2"],
            ["transition-colors", "duration-75"],
            ["border", ["border-sky-400", "hover:border-sky-300"]],
            ["bg-sky-400", ["bg-opacity-25", "hover:bg-opacity-40"]],
            ["text-sky-400", "hover:text-sky-300"]
          )}
          href={"/login"}
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className={clsx(className)}>
      <Link
        href={"/profile"}
        className={clsx(["flex"], ["flex-row"], ["items-center"])}
      >
        <div className={clsx(["w-8"], ["h-8"])}>
          {!whoami && (
            <div
              className={clsx(
                ["rounded-sm"],
                [["w-full"], ["h-full"]],
                ["bg-slate-700"],
                ["animate-pulse"]
              )}
            ></div>
          )}
          {whoami && (
            <UserIcon
              className={clsx(["w-full"], ["h-full"])}
              src={whoami.icon}
              name={whoami.name}
            />
          )}
        </div>
      </Link>
    </div>
  );
};
