"use client";

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

export const Profile: React.FC<{ className?: string }> = ({ className }) => {
  const gqlClient = useGraphQLClient();
  const isLoggedIn = useIsLoggedIn();
  const [profile, setProfile] = useState<{
    id: string;
    name: string;
    displayName: string;
    icon: string;
  } | null>();

  const { isValidating } = useSWR(
    isLoggedIn ? [ProfileQueryDocument] : null,
    async (doc) => gqlClient.request(doc),
    {
      refreshInterval: 10000,
      onSuccess(data) {
        const { whoami } = data;
        setProfile({
          id: whoami.id,
          name: whoami.name,
          displayName: whoami.displayName,
          icon: whoami.icon,
        });
      },
      onError() {
        setProfile(null);
      },
    }
  );
  useEffect(() => {
    setProfile(null);
  }, [isLoggedIn]);

  if (isValidating) return <span>loading</span>;
  if (!profile)
    return (
      <a className={clsx(["bg-blue-400"])} href={"/login"}>
        Login
      </a>
    );

  const { displayName, icon, id, name } = profile;

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
