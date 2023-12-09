import clsx from "clsx";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

import { graphql } from "~/gql";
import { makeGraphQLClient } from "~/gql/fetch";

import UserPageHeader from "./Header";

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}): Promise<Metadata> {
  const result = await makeGraphQLClient().request(
    graphql(`
      query UserPageLayout_MetaData($name: String!) {
        findUser(input: { name: $name }) {
          name
          displayName
        }
      }
    `),
    { name: params.name }
  );

  if (!result.findUser) notFound();
  const { findUser } = result;

  return {
    title: `${findUser.displayName}(@${findUser.name})`,
  };
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { name: string };
}) {
  const result = await makeGraphQLClient().request(
    graphql(`
      query UserPageLayout($name: String!) {
        findUser(input: { name: $name }) {
          ...UserPage_Header
          ...UserIcon
          name
          displayName
        }
      }
    `),
    { name: params.name }
  );

  if (!result.findUser) notFound();
  const { findUser } = result;

  return (
    <div
      className={clsx("mx-auto flex grow flex-col gap-y-4 @container/layout")}
    >
      <UserPageHeader fragment={findUser} />
      <div className="mx-auto w-full max-w-screen-2xl px-8 py-4">
        {children}
      </div>
    </div>
  );
}
