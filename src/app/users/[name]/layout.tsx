import "~/styles/globals.css";

import clsx from "clsx";
import { notFound } from "next/navigation";
import React from "react";

import { Header } from "~/components/pages/User/Header";
import { UserPageNav } from "~/components/pages/User/Nav";
import { graphql, useFragment } from "~/gql";
import { fetchGql } from "~/gql/fetch";
import {
  UserPageLayout_HeaderFragmentDoc,
  UserPageLayout_NavFragmentDoc,
} from "~/gql/graphql";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { name: string };
}) {
  const { findUser } = await fetchGql(
    graphql(`
      query UserPageLayout($name: String!) {
        findUser(input: { name: $name }) {
          ...UserPageLayout_Header
          ...UserPageLayout_Nav
        }
      }
    `),
    { name: params.name }
  );

  if (!findUser) notFound();

  return (
    <div className={clsx(["h-full"])}>
      <div className={clsx(["container", "max-w-screen-xl", "mx-auto"])}>
        <Header
          className={clsx(["container", "max-w-screen-xl", "mx-auto"])}
          fragment={useFragment(UserPageLayout_HeaderFragmentDoc, findUser)}
        />
        <UserPageNav
          // highlight="MYLISTS"
          fragment={useFragment(UserPageLayout_NavFragmentDoc, findUser)}
        />
        {children}
      </div>
    </div>
  );
}
