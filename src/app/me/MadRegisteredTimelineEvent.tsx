import clsx from "clsx";

import { VideoThumbnail } from "~/components/VideoThumbnail";
import { FragmentType, graphql, useFragment } from "~/gql";

import { LinkVideo } from "../mads/[serial]/Link";

export const MadRegisteredTimelineEventFragment = graphql(`
  fragment MyTopPage_TimelineSegment_MadRegisteredTimelineEvent on MadRegisteredTimelineEvent {
    video {
      ...Link_Video
      ...VideoThumbnail
      id
      title
    }
  }
`);
export const MadRegisteredTimelineEvent = ({
  className,
  ...props
}: {
  className?: string;
  fragment: FragmentType<typeof MadRegisteredTimelineEventFragment>;
}) => {
  const fragment = useFragment(
    MadRegisteredTimelineEventFragment,
    props.fragment
  );

  return (
    <div className={clsx(className, "flex")}>
      <LinkVideo fragment={fragment.video} className={clsx("block")}>
        <VideoThumbnail
          className={clsx("h-24 w-36")}
          imageSize="medium"
          fragment={fragment.video}
        />
      </LinkVideo>
      <div className={clsx("grow")}>
        <p>
          <LinkVideo fragment={fragment.video}>
            {fragment.video.title}
          </LinkVideo>
        </p>
      </div>
    </div>
  );
};
