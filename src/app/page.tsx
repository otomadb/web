import "server-only";

import clsx from "clsx";
import React from "react";

import { LinkRegisterNicovideo } from "~/components/common/Link";
import { VideoList } from "~/components/common/VideoList";
import { getFragment, graphql } from "~/gql";
import { VideoList_VideoFragmentDoc } from "~/gql/graphql";
import { gqlRequest } from "~/utils/gqlRequest";

export const revalidate = 0;

export default async function Page() {
  const result = await gqlRequest(
    graphql(`
      query IndexPage {
        recentRegisteredVideos: findVideos(
          input: { limit: 24, order: { createdAt: DESC } }
        ) {
          nodes {
            ...VideoList_Video
          }
        }
      }
    `)
  );

  const recentVideos = getFragment(
    VideoList_VideoFragmentDoc,
    result.recentRegisteredVideos.nodes
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
