import { getAccessToken } from "@auth0/nextjs-auth0";
import clsx from "clsx";
import React from "react";

import { graphql } from "~/gql";
import { makeGraphQLClient } from "~/gql/fetch";

import UserPageHeader from "../../users/[name]/Header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { accessToken } = await getAccessToken();
  if (!accessToken) throw new Error("accessToken is null");

  const result = await makeGraphQLClient().request(
    graphql(`
      query MyPageLayout {
        viewer {
          ...UserPage_Header
          name
          displayName
        }
      }
    `),
    {},
    { Authorization: `Bearer ${accessToken}` }
  );

  const { viewer } = result;
  if (!viewer) throw new Error("viewer is null");

  return (
    <div
      className={clsx("mx-auto flex grow flex-col gap-y-4 @container/layout")}
    >
      <UserPageHeader isMyPage fragment={viewer} />
      <div className="mx-auto w-full max-w-screen-2xl">{children}</div>
    </div>
  );
}
