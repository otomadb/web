import clsx from "clsx";

import { VideoThumbnail } from "~/components/VideoThumbnail";
import { FragmentType, graphql, useFragment } from "~/gql";

import { MadPageLink } from "../mads/[serial]/Link";

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
    <div className={clsx(className, ["flex"])}>
      <MadPageLink fragment={fragment.video} className={clsx(["block"])}>
        <VideoThumbnail
          className={clsx(["w-36"], ["h-24"])}
          imageSize="medium"
          fragment={fragment.video}
        />
      </MadPageLink>
      <div className={clsx(["grow"])}>
        <p>
          <MadPageLink fragment={fragment.video}>
            {fragment.video.title}
          </MadPageLink>
        </p>
      </div>
    </div>
  );
};
