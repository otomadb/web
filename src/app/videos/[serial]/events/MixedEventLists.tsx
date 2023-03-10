import clsx from "clsx";
import React from "react";

import { graphql } from "~/gql";
import {
  VideoEventPage_NicovideoVideoSourceEventsFragment,
  VideoEventPage_SemitagEventsFragment,
  VideoEventPage_VideoEventsFragment,
  VideoEventPage_VideoTagEventsFragment,
  VideoEventPage_VideoThumbnailEventsFragment,
  VideoEventPage_VideoTitleEventsFragment,
} from "~/gql/graphql";

import { EventSwitch } from "./Event";

graphql(`
  fragment VideoEventPage_VideoEvents on VideoEventsConnection {
    nodes {
      series
      ...VideoEventPage_Event
    }
  }
  fragment VideoEventPage_VideoTitleEvents on VideoTitleEventsConnection {
    nodes {
      series
      ...VideoEventPage_Event
    }
  }
  fragment VideoEventPage_VideoThumbnailEvents on VideoThumbnailEventsConnection {
    nodes {
      series
      ...VideoEventPage_Event
    }
  }
  fragment VideoEventPage_VideoTagEvents on VideoTagEventsConnection {
    nodes {
      series
      ...VideoEventPage_Event
    }
  }
  fragment VideoEventPage_SemitagEvents on SemitagEventConnection {
    nodes {
      series
      ...VideoEventPage_Event
    }
  }
  fragment VideoEventPage_NicovideoVideoSourceEvents on NicovideoVideoSourceEventConnection {
    nodes {
      series
      ...VideoEventPage_Event
    }
  }
`);
export const MixedEventLists: React.FC<{
  className?: string;
  eventsVideo: VideoEventPage_VideoEventsFragment;
  eventsTitles: VideoEventPage_VideoTitleEventsFragment[];
  eventsThumbnails: VideoEventPage_VideoThumbnailEventsFragment[];
  eventsTags: VideoEventPage_VideoTagEventsFragment[];
  eventsSemitags: VideoEventPage_SemitagEventsFragment[];
  eventsNicovideoSources: VideoEventPage_NicovideoVideoSourceEventsFragment[];
}> = ({
  className,
  eventsVideo: videoEvents,
  eventsTitles: titleEvents,
  eventsThumbnails: thumbnailEvents,
  eventsTags: tagEvents,
  eventsSemitags: semitagEvents,
  eventsNicovideoSources: nicovideoSourcesEvents,
}) => {
  const events = [
    ...videoEvents.nodes,
    ...titleEvents.flatMap((n) => n.nodes),
    ...thumbnailEvents.flatMap((n) => n.nodes),
    ...tagEvents.flatMap((n) => n.nodes),
    ...semitagEvents.flatMap((n) => n.nodes),
    ...nicovideoSourcesEvents.flatMap((n) => n.nodes),
  ].sort(({ series: a }, { series: b }) => b.localeCompare(a));
  return (
    <div
      className={clsx(className, ["w-full"], ["flex", "flex-col"], ["gap-y-1"])}
    >
      {events.map((event) => (
        <EventSwitch key={event.series} fragment={event} />
      ))}
    </div>
  );
};
