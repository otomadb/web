import "~/styles/globals.css";

import clsx from "clsx";
import { notFound } from "next/navigation";
import React from "react";

import { graphql, useFragment } from "~/gql";
import { fetchGql } from "~/gql/fetch";
import { UserPageLayout_HeaderFragmentDoc } from "~/gql/graphql";

import { Header } from "./Header";
import { HeaderNav } from "./HeaderNav";

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
          ...UserPageLayout_HeaderNav
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
        <HeaderNav fragment={findUser} />
        {children}
      </div>
    </div>
  );
}
