"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRecoilState } from "recoil";

import { stateWhoAmI } from "~/states/whoami";

export const Profile: React.FC<{ className?: string }> = ({ className }) => {
  const [whoami] = useRecoilState(stateWhoAmI);

  if (!whoami)
    return (
      <a className={clsx(["bg-blue-400"])} href={"/login"}>
        Login
      </a>
    );

  const { displayName, icon, id, name } = whoami;

  return (
    <div className={clsx(className)}>
      <Link
        href={"/profile"}
        className={clsx(["flex"], ["flex-row"], ["items-center"])}
      >
        <Image
          className={clsx([""])}
          width={32}
          height={32}
          src={icon}
          alt={"icon"}
        />
        <span className={clsx(["ml-2"], ["text-white"])}>{displayName}</span>
      </Link>
    </div>
  );
};
