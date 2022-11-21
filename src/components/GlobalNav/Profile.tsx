"use client";

import clsx from "clsx";
import gqlRequest from "graphql-request";
import Image from "next/image";
import React from "react";
import { useRecoilState } from "recoil";
import useSWR from "swr";

import { stateAccessToken } from "~/app/login/LoginForm";
import { graphql } from "~/gql";

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

export const Profile: React.FC<{ className?: string }> = ({ className }) => {
  const [accessToken] = useRecoilState(stateAccessToken);
  const { data, isValidating, error } = useSWR(
    accessToken !== null ? [ProfileDocument, accessToken] : null,
    async (q, token) =>
      gqlRequest(
        "http://localhost:8080/graphql",
        q,
        {},
        { Authorization: `Bearer ${token}` }
      ),
    { suspense: false }
  );

  if (!data)
    return (
      <a className={clsx(["bg-blue-400"])} href={"/login"}>
        Login
      </a>
    );

  const {
    whoami: { displayName, icon, id, name },
  } = data;

  return (
    <div className={clsx(className)}>
      <div className={clsx(["flex"], ["flex-row"], ["items-center"])}>
        <Image
          className={clsx([""])}
          width={32}
          height={32}
          src={icon}
          alt={"icon"}
        />
        <span className={clsx(["ml-2"], ["text-white"])}>{displayName}</span>
      </div>
    </div>
  );
};
