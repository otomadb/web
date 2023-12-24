import clsx from "clsx";
import React from "react";

import { graphql } from "~/gql";
import { makeGraphQLClient2 } from "~/gql/fetch";

import UserPageHeader from "../users/[name]/Header";
import SideNav from "../users/[name]/SideNav";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const result = await (
    await makeGraphQLClient2({ auth: "required" })
  ).request(
    graphql(`
      query MyPageLayout {
        viewer {
          ...UserPage_Header
          ...UserPage_SideNav
          name
          displayName
        }
      }
    `),
    {}
  );

  const { viewer } = result;
  if (!viewer) throw new Error("viewer is null");

  return (
    <div
      className={clsx("mx-auto flex grow flex-col gap-y-4 @container/layout")}
    >
      <UserPageHeader isMyPage fragment={viewer} />
      <div
        className={clsx(
          "mx-auto flex w-full max-w-screen-2xl gap-x-4 px-8 py-4"
        )}
      >
        <SideNav
          className={clsx("w-72")}
          primaryFragment={viewer}
          isMyPage={true}
        />
        {children}
      </div>
    </div>
  );
}
