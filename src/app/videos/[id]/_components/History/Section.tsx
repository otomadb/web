"use client";

import "client-only";

import clsx from "clsx";
import { useQuery } from "urql";

import { getFragment, graphql } from "~/gql";
import {
  VideoPage_HistoryItemFragmentDoc,
  VideoPage_RefreshHistoryDocument,
  VideoPage_VideoHistoryFragmentDoc,
} from "~/gql/graphql";

import { History } from "./Item";

graphql(`
  query VideoPage_RefreshHistory($id: ID!) {
    video(id: $id) {
      id
      ...VideoPage_VideoHistory
    }
  }
`);

export const HistorySection: React.FC<{
  className?: string;
  videoId: string;
}> = ({ className, videoId }) => {
  const [result] = useQuery({
    query: VideoPage_RefreshHistoryDocument,
    variables: { id: videoId },
  });
  const { data } = result;

  if (!data) return <span>LOADING</span>;

  const fs = getFragment(VideoPage_VideoHistoryFragmentDoc, data.video);

  return (
    <section className={clsx(["flex-shrink-0"], ["flex-grow"], ["max-w-lg"])}>
      <h2 className={clsx(["text-xl"], ["text-slate-900"])}>動画情報の変移</h2>
      <div className={clsx(className, ["flex", "flex-col"], ["space-y-1"])}>
        {fs.history.nodes
          .map((e) => getFragment(VideoPage_HistoryItemFragmentDoc, e))
          .map((event) => (
            <History key={event.id} item={event} />
          ))}
      </div>
    </section>
  );
};
