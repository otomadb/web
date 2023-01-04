import "~/styles/globals.css";

import clsx from "clsx";
import { notFound } from "next/navigation";
import React from "react";

import { Header } from "~/components/common/UserPage/Header";
import { UserPageNav } from "~/components/common/UserPage/Nav";
import { getFragment, graphql } from "~/gql";
import {
  UserPageLayout_HeaderFragmentDoc,
  UserPageLayout_NavFragmentDoc,
} from "~/gql/graphql";
import { gqlRequest } from "~/utils/gqlRequest";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { name: string };
}) {
  const { findUser } = await gqlRequest(
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
          fragment={getFragment(UserPageLayout_HeaderFragmentDoc, findUser)}
        />
        <UserPageNav
          // highlight="MYLISTS"
          fragment={getFragment(UserPageLayout_NavFragmentDoc, findUser)}
        />
        {children}
      </div>
    </div>
  );
}
