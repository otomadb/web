"use client";

import "client-only";

import clsx from "clsx";
import { useMemo } from "react";
import { useQuery } from "urql";

import { getFragment as useFragment, graphql } from "~/gql";
import {
  VideoPage_HistoryItemFragmentDoc,
  VideoPage_HistorySectionFragment,
  VideoPage_HistorySectionFragmentDoc,
  VideoPage_UpstreamHistorySectionDocument,
} from "~/gql/graphql";

import { History } from "./HistoryItem";

graphql(`
  fragment VideoPage_HistorySection on Video {
    id
    history(input: { order: { createdAt: DESC } }) {
      nodes {
        id
        ...VideoPage_HistoryItem
      }
    }
  }

  query VideoPage_UpstreamHistorySection($id: ID!) {
    video(id: $id) {
      id
      ...VideoPage_HistorySection
    }
  }
`);

export const HistorySection: React.FC<{
  className?: string;
  fallback: VideoPage_HistorySectionFragment;
}> = ({ className, fallback }) => {
  const [{ data }] = useQuery({
    query: VideoPage_UpstreamHistorySectionDocument,
    variables: { id: fallback.id },
  });
  const upstream = useFragment(
    VideoPage_HistorySectionFragmentDoc,
    data?.video
  );

  const video = useMemo(() => upstream || fallback, [fallback, upstream]);
  const { history } = video;

  return (
    <section className={clsx(className)}>
      <h2 className={clsx(["text-xl"], ["text-slate-900"])}>動画の更新履歴</h2>
      <div className={clsx(["mt-2"], ["flex", "flex-col"], ["space-y-1"])}>
        {history.nodes.map((event) => (
          <History
            key={event.id}
            // eslint-disable-next-line react-hooks/rules-of-hooks
            item={useFragment(VideoPage_HistoryItemFragmentDoc, event)}
          />
        ))}
      </div>
    </section>
  );
};
