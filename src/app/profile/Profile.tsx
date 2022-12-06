"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import React from "react";
import useSWR from "swr";

import { UserLink } from "~/components/Link";
import { UserIcon } from "~/components/UserIcon";
import { graphql } from "~/gql";
import { useGraphQLClient } from "~/hooks/useGraphQLClient";
import { useLogout } from "~/hooks/useLogout";

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
  const logout = useLogout({
    onSuccess() {
      router.push("/");
    },
  });

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
        logout();
      }}
    >
      Logout
    </button>
  );
};

export const Profile: React.FC<{ className?: string }> = ({ className }) => {
  const gqlClient = useGraphQLClient();
  const { data } = useSWR([ProfileDocument], async (doc) =>
    gqlClient.request(doc)
  );

  if (!data) return null;

  const {
    whoami: { id, name, displayName, icon },
  } = data;
  return (
    <div className={clsx(className)}>
      <p>Profile</p>
      <div>
        <UserIcon className={clsx([])} src={icon} name={name} />
        <p>
          <UserLink name={name}>@{name}</UserLink>
        </p>
        <p>{displayName}</p>
      </div>
      <Logout className={clsx(["mt-1"])} />
    </div>
  );
};
