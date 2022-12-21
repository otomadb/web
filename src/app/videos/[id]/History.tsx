"use client";
import { useMemo } from "react";
import { useQuery } from "urql";

import { Inner } from "~/components/Videos/History/Inner";
import { getFragment as useFragment, graphql } from "~/gql";
import {
  VideoPage_HistoryFragmentDoc,
  VideoPage_HistorySectionDocument,
  VideoPageQuery,
} from "~/gql/graphql";

graphql(`
  query VideoPage_HistorySection($id: ID!) {
    video(id: $id) {
      id
      ...VideoPage_History
    }
  }
`);

export const History: React.FC<{
  className?: string;
  videoId: string;
  fallback: VideoPageQuery["video"];
}> = ({ videoId, fallback, ...props }) => {
  const [{ data }] = useQuery({
    query: VideoPage_HistorySectionDocument,
    variables: { id: videoId },
  });

  const history = useFragment(
    VideoPage_HistoryFragmentDoc,
    useMemo(() => data?.video || fallback, [data, fallback])
  );
  return <Inner {...props} videoId={videoId} history={history} />;
};
