import { FragmentType, graphql, useFragment } from "~/gql";

import BilibiliRequestTimelineEvent from "./BilibiliRequestTimelineEvent";
import { MadRegisteredTimelineEvent } from "./MadRegisteredTimelineEvent";
import NicovideoRequestTimelineEvent from "./NicovideoRequestTimelineEvent";
import SoundcloudRequestTimelineEvent from "./SoundcloudRequestTimelineEvent";
import YoutubeRequestTimelineEvent from "./YoutubeRequestTimelineEvent";

export const TimelineEventFragment = graphql(`
  fragment MyTopPage_TimelineSegment_TimelineEvent on TimelineEvent {
    __typename
    ... on MadRegisteredTimelineEvent {
      ...MyTopPage_TimelineSegment_MadRegisteredTimelineEvent
    }
    ... on NicovideoMadRequestedTimelineEvent {
      ...MyTopPage_TimelineSegment_NicovideoRequestiTimelineEvent
    }
    ... on YoutubeMadRequestedTimelineEvent {
      ...MyTopPage_TimelineSegment_YoutubeRequestiTimelineEvent
    }
    ... on SoundcloudMadRequestedTimelineEvent {
      ...MyTopPage_TimelineSegment_SoundcloudRequestiTimelineEvent
    }
    ... on BilibiliMadRequestedTimelineEvent {
      ...MyTopPage_TimelineSegment_BilibiliRequestiTimelineEvent
    }
  }
`);
export default function TimelineEvent({
  fragment,
  ...rest
}: {
  className?: string;
  style?: React.CSSProperties;
  fragment: FragmentType<typeof TimelineEventFragment>;
}) {
  const fragment2 = useFragment(TimelineEventFragment, fragment);

  switch (fragment2.__typename) {
    case "MadRegisteredTimelineEvent":
      return <MadRegisteredTimelineEvent fragment={fragment2} {...rest} />;
    case "NicovideoMadRequestedTimelineEvent":
      return <NicovideoRequestTimelineEvent fragment={fragment2} {...rest} />;
    case "YoutubeMadRequestedTimelineEvent":
      return <YoutubeRequestTimelineEvent fragment={fragment2} {...rest} />;
    case "SoundcloudMadRequestedTimelineEvent":
      return <SoundcloudRequestTimelineEvent fragment={fragment2} {...rest} />;
    case "BilibiliMadRequestedTimelineEvent":
      return <BilibiliRequestTimelineEvent fragment={fragment2} {...rest} />;
  }
}
