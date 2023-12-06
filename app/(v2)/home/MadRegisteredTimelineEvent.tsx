import clsx from "clsx";

import CommonMadBlock from "~/components/CommonMadBlock";
import {
  BilibiliPictogram,
  NicovideoPictogram,
  SoundcloudPictogram,
  YoutubePictogram,
} from "~/components/Pictogram";
import { FragmentType, graphql, useFragment } from "~/gql";

import { TimelineEventWrapper } from "./TimelineEventWrapper";

export const MadRegisteredTimelineEventFragment = graphql(`
  fragment MyTopPage_TimelineSegment_MadRegisteredTimelineEvent on MadRegisteredTimelineEvent {
    ...MyTopPage_TimelineSegment_TimelineEventWrapper
    video {
      ...CommonMadBlock
      ...CommonMadBlock_LikeSwitch
      nicovideoSources {
        id
        url
      }
      youtubeSources {
        id
        url
      }
      bilibiliSources {
        id
        url
      }
      soundcloudSources {
        id
        url
      }
    }
  }
`);
export const MadRegisteredTimelineEvent = ({
  className,
  style,
  ...props
}: {
  className?: string;
  style?: React.CSSProperties;
  fragment: FragmentType<typeof MadRegisteredTimelineEventFragment>;
}) => {
  const fragment = useFragment(
    MadRegisteredTimelineEventFragment,
    props.fragment
  );
  const { video } = fragment;

  return (
    <TimelineEventWrapper
      fragment={fragment}
      style={style}
      className={className}
      Title={({ ...props }) => <span {...props}>音MADを登録しました！</span>}
      Main={({ className }) => (
        <CommonMadBlock
          fragment={video}
          likeable={video}
          size="small"
          classNames={clsx(className, "w-64")}
        />
      )}
      Details={[
        {
          title: "動画ソース",
          Content: ({ className }) => (
            <div className={clsx(className, "flex items-start gap-x-2")}>
              {video.nicovideoSources.map(({ id, url }) => (
                <a
                  key={id}
                  href={url}
                  title={url}
                  target="_blank"
                  className={clsx(
                    "flex rounded border border-nicovideo-primary bg-nicovideo-primary/50 p-1 text-black/75 hover:bg-nicovideo-primary hover:text-black"
                  )}
                >
                  <NicovideoPictogram className={clsx("h-4 w-4")} />
                </a>
              ))}
              {video.youtubeSources.map(({ id, url }) => (
                <a
                  key={id}
                  href={url}
                  title={url}
                  target="_blank"
                  className={clsx(
                    "flex rounded border border-youtube-primary bg-youtube-primary/50 p-1 text-white/75 hover:bg-youtube-primary hover:text-white"
                  )}
                >
                  <YoutubePictogram className={clsx("h-4 w-4")} />
                </a>
              ))}
              {video.bilibiliSources.map(({ id, url }) => (
                <a
                  key={id}
                  href={url}
                  title={url}
                  target="_blank"
                  className={clsx(
                    "flex rounded border border-bilibili-primary bg-bilibili-primary/50 p-1 text-white/75 hover:bg-bilibili-primary hover:text-white"
                  )}
                >
                  <BilibiliPictogram className={clsx("h-4 w-4")} />
                </a>
              ))}
              {video.soundcloudSources.map(({ id, url }) => (
                <a
                  key={id}
                  href={url}
                  title={url}
                  target="_blank"
                  className={clsx(
                    "flex rounded border border-soundcloud-primary bg-soundcloud-primary/50 p-1 text-white/75 hover:bg-soundcloud-primary hover:text-white"
                  )}
                >
                  <SoundcloudPictogram className={clsx("h-4 w-4")} />
                </a>
              ))}
            </div>
          ),
        },
      ]}
    />
  );
};
