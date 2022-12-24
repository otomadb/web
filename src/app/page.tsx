import "server-only";

import clsx from "clsx";
import React from "react";

import { LinkRegisterNicovideo } from "~/components/common/Link";
import { VideoList } from "~/components/common/VideoList";
import { graphql } from "~/gql";
import { gqlRequest } from "~/utils/gqlRequest";

export const revalidate = 0;

export default async function Page() {
  const result = await gqlRequest(
    graphql(`
      query IndexPage {
        recentRegisteredVideos: findVideos(input: { limit: 18 }) {
          nodes {
            id
            title
            thumbnailUrl
          }
        }
      }
    `)
  );

  const recentVideos = result.recentRegisteredVideos.nodes.map(
    ({ id, title, thumbnailUrl }) => ({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      id,
      title,
      thumbnailUrl,
    })
  );

  return (
    <>
      <section>
        <h2 className={clsx(["text-xl"])}>最近登録された動画</h2>
        <VideoList className={clsx(["mt-4"])} videos={recentVideos} />
      </section>
      <section>
        <LinkRegisterNicovideo>ニコニコ動画から追加</LinkRegisterNicovideo>
      </section>
    </>
  );
}
