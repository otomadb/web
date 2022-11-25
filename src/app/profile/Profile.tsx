"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import useSWR from "swr";

import { graphql } from "~/gql";
import { gqlClient } from "~/gql/client";
import { useAccessToken } from "~/hooks/useAccessToken";
import { useRefreshToken } from "~/hooks/useRefreshToken";

const ProfileDocument = graphql(`
  query Profile {
    whoami {
      id
      name
      displayName
      icon
    }
  }
`);

export const Logout: React.FC<{ className: string }> = ({ className }) => {
  const router = useRouter();
  const [, setAccessToken] = useAccessToken();
  const [, setRefreshToken] = useRefreshToken();

  return (
    <button
      className={clsx(
        className,
        ["px-2"],
        ["py-1"],
        ["bg-blue-400"],
        ["text-white"],
        ["rounded"]
      )}
      onClick={() => {
        setAccessToken(null);
        setRefreshToken(null);
        router.push("/");
      }}
    >
      Logout
    </button>
  );
};

export const Profile: React.FC<{ className?: string }> = ({ className }) => {
  const [accessToken, setAccessToken] = useAccessToken();
  const { data } = useSWR(
    accessToken !== null ? [ProfileDocument, accessToken] : null,
    async (doc, token) =>
      gqlClient.request(doc, {}, { Authorization: `Bearer ${token}` }),
    {
      suspense: true,
      onError() {
        setAccessToken(null);
      },
    }
  );

  if (!data) return null;

  const {
    whoami: { id, name, displayName, icon },
  } = data;
  return (
    <div className={clsx(className)}>
      <p>Profile</p>
      <div>
        <Image src={icon} width={128} height={128} alt={"icon"} />
        <p>
          <Link href={`/users/${name}`}> @{name}</Link>
        </p>
        <p>{displayName}</p>
      </div>
      <Logout className={clsx(["mt-1"])} />
    </div>
  );
};

export const YouHaveToLogin: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [accessToken] = useAccessToken();
  if (!accessToken) {
    router.push("/login");
    return null;
  }

  return <>{children}</>;
};
