"use client";

import "client-only";

import clsx from "clsx";
import { useMemo } from "react";
import { useQuery } from "urql";

import { getFragment } from "~/gql";
import {
  VideoPage_HistoryItemFragmentDoc,
  VideoPage_HistorySectionDocument,
  VideoPage_HistorySectionQuery,
  VideoPage_VideoHistoryFragmentDoc,
} from "~/gql/graphql";

import { History } from "./Item";

export const SectionInner: React.FC<{
  className?: string;
  videoId: string;
  fallback: VideoPage_HistorySectionQuery;
}> = ({ className, videoId, fallback }) => {
  const [result] = useQuery({
    query: VideoPage_HistorySectionDocument,
    variables: { id: videoId },
  });

  const { video } = useMemo(() => {
    return result.data || fallback;
  }, [result, fallback]);

  return (
    <div className={clsx(className, ["flex", "flex-col"], ["space-y-1"])}>
      {getFragment(VideoPage_VideoHistoryFragmentDoc, video)
        .history.nodes.map((e) =>
          getFragment(VideoPage_HistoryItemFragmentDoc, e)
        )
        .map((event) => (
          <History key={event.id} item={event} />
        ))}
    </div>
  );
};
