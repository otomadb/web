"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import useSWR from "swr";

import { graphql } from "~/gql";
import { gqlClient } from "~/gql/client";
import { stateAccessToken, stateRefreshToken } from "~/states/tokens";

const GlobalNavProfileDocument = graphql(`
  query Profile {
    whoami {
      id
      name
      displayName
      icon
    }
  }
`);

export const Profile: React.FC<{ className?: string }> = ({ className }) => {
  const [accessToken, setAccessToken] = useRecoilState(stateAccessToken);
  const [refreshToken] = useRecoilState(stateRefreshToken);
  const [whoami, setWhoAmI] = useState<null | {
    id: string;
    name: string;
    displayName: string;
    icon: string;
  }>(null);

  useEffect(() => {
    if (!refreshToken) setWhoAmI(null);
  }, [refreshToken]);
  useSWR(
    accessToken !== null ? [GlobalNavProfileDocument, accessToken] : null,
    async (doc, token) =>
      gqlClient.request(doc, {}, { Authorization: `Bearer ${token}` }),
    {
      onSuccess(data) {
        const {
          whoami: { id, name, displayName, icon },
        } = data;
        setWhoAmI({
          id,
          name,
          displayName,
          icon,
        });
      },
      onError() {
        setAccessToken(null);
      },
    }
  );

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
