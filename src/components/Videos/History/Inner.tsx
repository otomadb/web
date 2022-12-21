"use client";

import "client-only";

import clsx from "clsx";

import { getFragment as useFragment, graphql } from "~/gql";
import {
  VideoPage_HistoryFragment,
  VideoPage_HistoryItemFragmentDoc,
} from "~/gql/graphql";

import { History } from "./Item";

graphql(`
  fragment VideoPage_History on Video {
    id
    history(input: { order: { createdAt: DESC } }) {
      nodes {
        ...VideoPage_HistoryItem
      }
    }
  }
`);

export const Inner: React.FC<{
  className?: string;
  videoId: string;
  history: VideoPage_HistoryFragment;
}> = ({ className, history }) => {
  const nodes = useFragment(
    VideoPage_HistoryItemFragmentDoc,
    history.history.nodes
  );

  return (
    <section className={clsx(className)}>
      <h2 className={clsx(["text-xl"], ["text-slate-900"])}>動画の更新履歴</h2>
      <div className={clsx(["mt-2"], ["flex", "flex-col"], ["space-y-1"])}>
        {nodes.map((event) => (
          <History key={event.id} item={event} />
        ))}
      </div>
    </section>
  );
};
