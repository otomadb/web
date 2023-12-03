import { getAccessToken, withPageAuthRequired } from "@auth0/nextjs-auth0";
import clsx from "clsx";

import { graphql } from "~/gql";
import { makeGraphQLClient } from "~/gql/fetch";

import NotificationsSegmentsController from "./NotificationsSegmentsController";

export const dynamic = "force-dynamic";

export default withPageAuthRequired(
  async () => {
    const { accessToken } = await getAccessToken();
    if (!accessToken) throw new Error("accessToken is null");

    const result = await makeGraphQLClient({}).request(
      graphql(`
        query NotificationPage($after: String) {
          viewer {
            notifications(input: { first: 30, after: $after }) {
              ...NotificationPage_NotificationsSegmentsController
            }
          }
        }
      `),
      {},
      { Authorization: `Bearer ${accessToken}` }
    );

    if (!result.viewer) throw new Error("viewer is null");

    return (
      <main
        className={clsx(
          "mx-auto flex max-w-[768px] flex-col flex-wrap gap-y-4"
        )}
      >
        <h1 className={clsx("px-2 text-xl font-bold text-snow-primary")}>
          最近の通知
        </h1>
        <NotificationsSegmentsController
          className={clsx("w-full")}
          fragment={result.viewer.notifications}
        />
      </main>
    );
  },
  { returnTo: "/" }
);
