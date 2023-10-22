import clsx from "clsx";

import { CommonTag2 } from "~/components/CommonTag";
import { CoolImage2 } from "~/components/CoolImage";
import DateTime2 from "~/components/DateTime2";
import { VideoThumbnail } from "~/components/VideoThumbnail";
import { FragmentType, graphql, useFragment } from "~/gql";

import { LinkVideo } from "../mads/[serial]/Link";
import NicovideoRequestPageLink from "../request/nicovideo/Link";
import YoutubeRequestLink from "../requests/youtube/[sourceId]/Link";
import { LinkTag } from "../tags/[serial]/Link";

export const TimelineEventFragment = graphql(`
  fragment MyTopPage_TimelineSegment_TimelineEvent on TimelineEvent {
    __typename
    createdAt
    ... on MadRegisteredTimelineEvent {
      video {
        ...Link_Video
        ...VideoThumbnail
        id
        title
        taggings(first: 5) {
          nodes {
            id
            tag {
              ...Link_Tag
              ...CommonTag
            }
          }
        }
      }
    }
    ... on NicovideoMadRequestedTimelineEvent {
      request {
        id
        title
        sourceId
        thumbnailUrl
      }
    }
    ... on YoutubeMadRequestedTimelineEvent {
      request {
        id
        title
        sourceId
        thumbnailUrl
      }
    }
  }
`);
export default function TimelineEvent({
  className,
  style,
  ...props
}: {
  className?: string;
  style?: React.CSSProperties;
  fragment: FragmentType<typeof TimelineEventFragment>;
}) {
  const fragment = useFragment(TimelineEventFragment, props.fragment);
  return (
    <div
      className={clsx(
        className,
        ["flex"],
        ["bg-background-primary"],
        ["px-4", "py-2"],
        ["rounded"]
      )}
      style={style}
    >
      <div className={clsx(["flex-grow"])}>
        {fragment.__typename === "MadRegisteredTimelineEvent" && (
          <div className={clsx(className, ["flex"], ["gap-x-4"])}>
            <LinkVideo
              fragment={fragment.video}
              className={clsx(["block"], ["flex-shrink-0"])}
            >
              <VideoThumbnail
                className={clsx(["w-36"], ["h-24"])}
                imageSize="medium"
                fragment={fragment.video}
              />
            </LinkVideo>
            <div className={clsx(["flex-grow"], ["py-2"])}>
              <p className={clsx(["text-text-primary", "text-sm"])}>
                <LinkVideo
                  fragment={fragment.video}
                  className={clsx(["text-accent-primary", "font-bold"])}
                >
                  {fragment.video.title}
                </LinkVideo>
                が追加されました。
              </p>
              <div
                className={clsx(
                  ["mt-2"],
                  ["flex", "gap-x-1", "gap-y-1", "flex-wrap"]
                )}
              >
                {fragment.video.taggings.nodes.map(({ id: taggingId, tag }) => (
                  <LinkTag key={taggingId} fragment={tag}>
                    <CommonTag2 size="xs" fragment={tag} />
                  </LinkTag>
                ))}
              </div>
            </div>
          </div>
        )}
        {fragment.__typename === "NicovideoMadRequestedTimelineEvent" && (
          <div className={clsx(className, ["flex"], ["gap-x-4"])}>
            <NicovideoRequestPageLink
              className={clsx(["block"], ["flex-shrink-0"])}
              sourceId={fragment.request.sourceId}
            >
              <CoolImage2
                className={clsx(["w-36"], ["h-24"])}
                width={144}
                height={96}
                alt={fragment.request.title}
                src={fragment.request.thumbnailUrl}
              />
            </NicovideoRequestPageLink>
            <div className={clsx(["flex-grow"], ["py-2"])}>
              <p className={clsx(["text-text-primary", "text-sm"])}>
                <NicovideoRequestPageLink
                  sourceId={fragment.request.sourceId}
                  className={clsx(["text-accent-primary", "font-bold"])}
                >
                  {fragment.request.title}
                </NicovideoRequestPageLink>
                がリクエストされました。
              </p>
            </div>
          </div>
        )}
        {fragment.__typename === "YoutubeMadRequestedTimelineEvent" && (
          <div className={clsx(className, ["flex"], ["gap-x-4"])}>
            <YoutubeRequestLink
              className={clsx(["block"], ["flex-shrink-0"])}
              sourceId={fragment.request.sourceId}
            >
              <CoolImage2
                className={clsx(["w-36"], ["h-24"])}
                width={144}
                height={96}
                alt={fragment.request.title}
                src={fragment.request.thumbnailUrl}
              />
            </YoutubeRequestLink>
            <div className={clsx(["flex-grow"], ["py-2"])}>
              <p className={clsx(["text-text-primary", "text-sm"])}>
                <YoutubeRequestLink
                  sourceId={fragment.request.sourceId}
                  className={clsx(["text-accent-primary", "font-bold"])}
                >
                  {fragment.request.title}
                </YoutubeRequestLink>
                がリクエストされました。
              </p>
            </div>
          </div>
        )}
      </div>
      <div className={clsx(["flex-shrink-0"])}>
        <DateTime2
          date={fragment.createdAt}
          className={clsx(["font-mono"], ["text-xs", "text-text-muted"])}
        />
      </div>
    </div>
  );
}
