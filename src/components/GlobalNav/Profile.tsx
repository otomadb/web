"use client";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

import { graphql } from "~/gql";
import { useGraphQLClient } from "~/hooks/useGraphQLClient";
import { useIsLoggedIn } from "~/hooks/useIsLoggedIn";

export const ProfileQueryDocument = graphql(`
  query GlobalNavProfile {
    whoami {
      id
      name
      displayName
      icon
    }
  }
`);

export const Loading: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <ArrowPathIcon
      className={clsx(className, ["text-white"], ["animate-spin"])}
    />
  );
};

export const LoginLink: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <Link
      className={clsx(
        className,
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
  );
};

export const Profile: React.FC<{ className?: string }> = ({ className }) => {
  const gqlClient = useGraphQLClient();
  const isLoggedIn = useIsLoggedIn();
  const [profile, setProfile] = useState<{
    id: string;
    name: string;
    displayName: string;
    icon: string;
  } | null>(null);

  const { isValidating } = useSWR(
    isLoggedIn ? [ProfileQueryDocument] : null,
    async (doc) => gqlClient.request(doc),
    {
      refreshInterval: 10000,
      onSuccess(data) {
        const {
          whoami: { id, name, displayName, icon },
        } = data;
        setProfile({ id, name, displayName, icon });
      },
      onError() {
        setProfile(null);
      },
    }
  );
  useEffect(() => {
    setProfile(null);
  }, [isLoggedIn]);

  if (isLoggedIn === undefined || (!profile && isValidating))
    return (
      <div className={clsx(className)}>
        <Loading className={clsx(["w-6"], ["h-6"])} />
      </div>
    );

  if (!profile)
    return (
      <div className={clsx(className)}>
        <LoginLink />
      </div>
    );

  const { displayName, icon, name } = profile;

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
