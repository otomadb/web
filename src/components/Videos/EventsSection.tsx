import "server-only";

import clsx from "clsx";

import { getFragment as useFragment, graphql } from "~/gql";
import { VideoPage_VideoEventFragmentDoc } from "~/gql/graphql";
import { gqlRequest } from "~/utils/gqlRequest";

import { Event } from "./events/Event";

export async function EventsSection({
  className,
  videoId,
}: {
  className?: string;
  videoId: string;
}) {
  const { video } = await gqlRequest(
    graphql(`
      query VideoPage_EventsSection($id: ID!) {
        video(id: $id) {
          id
          events(input: { limit: 20 }) {
            nodes {
              id
              ...VideoPage_VideoEvent
            }
          }
        }
      }
    `),
    { id: videoId }
  );

  return (
    <section className={clsx(className)}>
      <h2 className={clsx(["text-xl"], ["text-slate-900"])}>動画の更新履歴</h2>
      <div className={clsx(["mt-2"], ["flex", "flex-col"], ["space-y-1"])}>
        {video.events.nodes.map((event) => (
          <Event
            key={event.id}
            // eslint-disable-next-line react-hooks/rules-of-hooks
            fragment={useFragment(VideoPage_VideoEventFragmentDoc, event)}
          />
        ))}
      </div>
    </section>
  );
}
