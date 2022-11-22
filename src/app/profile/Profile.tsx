"use client";

import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import { useRecoilState } from "recoil";
import useSWR from "swr";

import { graphql } from "~/gql";
import { gqlClient } from "~/gql/client";
import { stateAccessToken, stateRefreshToken } from "~/states/tokens";
import { stateWhoAmI } from "~/states/whoami";

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
  const [, setAccessToken] = useRecoilState(stateAccessToken);
  const [, setRefreshToken] = useRecoilState(stateRefreshToken);
  const [, setWhoAmI] = useRecoilState(stateWhoAmI);

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
        setWhoAmI(null);
        router.push("/");
      }}
    >
      Logout
    </button>
  );
};

export const Profile: React.FC<{ className?: string }> = ({ className }) => {
  const [accessToken] = useRecoilState(stateAccessToken);
  const { data } = useSWR(
    accessToken !== null ? [ProfileDocument, accessToken] : null,
    async (doc, token) =>
      gqlClient.request(doc, {}, { Authorization: `Bearer ${token}` }),
    { suspense: true }
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
        <p>@{name}</p>
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
  const [accessToken] = useRecoilState(stateAccessToken);
  if (!accessToken) {
    router.push("/login");
    return null;
  }

  return <>{children}</>;
};
