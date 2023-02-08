"use client";

import "client-only";

import clsx from "clsx";
import { useQuery } from "urql";

import { getFragment, getFragment as useFragment, graphql } from "~/gql";
import {
  VideoPage_EventsSectionDocument,
  VideoPage_EventsSectionFragmentDoc,
  VideoPage_VideoEventFragmentDoc,
} from "~/gql/graphql";

import { Event } from "./events/Event";

graphql(`
  fragment VideoPage_EventsSection on Video {
    events(input: { limit: 20 }) {
      nodes {
        id
        ...VideoPage_VideoEvent
      }
    }
  }

  query VideoPage_EventsSection($id: ID!) {
    video(id: $id) {
      id
      ...VideoPage_EventsSection
    }
  }
`);

export const EventsSection: React.FC<{
  className?: string;
  videoId: string;
}> = ({ className, videoId }) => {
  const [{ data, fetching }] = useQuery({
    query: VideoPage_EventsSectionDocument,
    variables: { id: videoId },
  });

  if (fetching) return null;
  if (!data) return null;

  const { events } = getFragment(
    VideoPage_EventsSectionFragmentDoc,
    data.video
  );

  return (
    <section className={clsx(className)}>
      <h2 className={clsx(["text-xl"], ["text-slate-900"])}>動画の更新履歴</h2>
      <div className={clsx(["mt-2"], ["flex", "flex-col"], ["space-y-1"])}>
        {events.nodes.map((event) => (
          <Event
            key={event.id}
            // eslint-disable-next-line react-hooks/rules-of-hooks
            fragment={useFragment(VideoPage_VideoEventFragmentDoc, event)}
          />
        ))}
      </div>
    </section>
  );
};
