import clsx from "clsx";
import React from "react";

import { FragmentType, graphql, useFragment } from "~/gql";

import { EventSwitch } from "./Event";

const VideoEventsFragment = graphql(`
  fragment VideoEventPage_VideoEvents on VideoEventsConnection {
    nodes {
      series
      ...VideoEventPage_Event
    }
  }
`);
const TitleEventsFragment = graphql(`
  fragment VideoEventPage_VideoTitleEvents on VideoTitleEventsConnection {
    nodes {
      series
      ...VideoEventPage_Event
    }
  }
`);
const ThumbnailEventsFragment = graphql(`
  fragment VideoEventPage_VideoThumbnailEvents on VideoThumbnailEventsConnection {
    nodes {
      series
      ...VideoEventPage_Event
    }
  }
`);
const TagEventsFragment = graphql(`
  fragment VideoEventPage_VideoTagEvents on VideoTagEventsConnection {
    nodes {
      series
      ...VideoEventPage_Event
    }
  }
`);
const SemitagEventsFragment = graphql(`
  fragment VideoEventPage_SemitagEvents on SemitagEventConnection {
    nodes {
      series
      ...VideoEventPage_Event
    }
  }
`);
const NicovideoVideoSourceEvents = graphql(`
  fragment VideoEventPage_NicovideoVideoSourceEvents on NicovideoVideoSourceEventConnection {
    nodes {
      series
      ...VideoEventPage_Event
    }
  }
`);
export const MixedEventLists: React.FC<{
  className?: string;
  eventsVideo: FragmentType<typeof VideoEventsFragment>;
  eventsTitles: FragmentType<typeof TitleEventsFragment>[];
  eventsThumbnails: FragmentType<typeof ThumbnailEventsFragment>[];
  eventsTags: FragmentType<typeof TagEventsFragment>[];
  eventsSemitags: FragmentType<typeof SemitagEventsFragment>[];
  eventsNicovideoSources: FragmentType<typeof NicovideoVideoSourceEvents>[];
}> = ({ className, ...props }) => {
  const eventsVideo = useFragment(VideoEventsFragment, props.eventsVideo);
  const eventsTitles = useFragment(TitleEventsFragment, props.eventsTitles);
  const eventsThumbnails = useFragment(
    ThumbnailEventsFragment,
    props.eventsThumbnails
  );
  const eventsTags = useFragment(TagEventsFragment, props.eventsTags);
  const eventsSemitags = useFragment(
    SemitagEventsFragment,
    props.eventsSemitags
  );
  const eventsNicovideoSources = useFragment(
    NicovideoVideoSourceEvents,
    props.eventsNicovideoSources
  );

  const events = [
    ...eventsVideo.nodes,
    ...eventsTitles.flatMap((n) => n.nodes),
    ...eventsThumbnails.flatMap((n) => n.nodes),
    ...eventsTags.flatMap((n) => n.nodes),
    ...eventsSemitags.flatMap((n) => n.nodes),
    ...eventsNicovideoSources.flatMap((n) => n.nodes),
  ].sort(({ series: a }, { series: b }) => b.localeCompare(a));
  return (
    <div className={clsx(className, "flex w-full flex-col gap-y-1")}>
      {events.map((event) => (
        <EventSwitch key={event.series} fragment={event} />
      ))}
    </div>
  );
};
