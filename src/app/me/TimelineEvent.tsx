import clsx from "clsx";

import { CommonTag2 } from "~/components/CommonTag";
import { CoolImage2 } from "~/components/CoolImage";
import DateTime2 from "~/components/DateTime2";
import Pictogram from "~/components/Pictogram";
import UserDisplayNameLink from "~/components/UserLink/UserDisplayNameLink";
import UserIconLink from "~/components/UserLink/UserIconLink";
import { VideoThumbnail } from "~/components/VideoThumbnail";
import { FragmentType, graphql, useFragment } from "~/gql";

import { LinkVideo } from "../mads/[serial]/Link";
import { LinkNicovideoRegistrationRequest } from "../requests/nicovideo/[sourceId]/Link";
import { YoutubeRequestPageLink } from "../requests/youtube/[sourceId]/Link";
import { LinkTag } from "../tags/[serial]/Link";

export const TimelineEventFragment = graphql(`
  fragment MyTopPage_TimelineSegment_TimelineEvent on TimelineEvent {
    __typename
    createdAt
    event {
      id
      user {
        id
        ...UserIconLink
        ...UserDisplayNameLink
      }
    }
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
    ... on NicovideoMadRequestedTimelineEvent {
      request {
        id
        title
        sourceId
        originalUrl
        thumbnailUrl
        ...Link_NicovideoRegistrationRequest
      }
    }
    ... on YoutubeMadRequestedTimelineEvent {
      request {
        id
        title
        sourceId
        originalUrl
        thumbnailUrl
        ...YoutubeRequestPageLink
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
        ["flex", "gap-x-4"],
        ["bg-background-primary"],
        ["px-4", "py-2"],
        ["rounded"]
      )}
      style={style}
    >
      {fragment.__typename === "MadRegisteredTimelineEvent" && (
        <div className={clsx(className, ["flex-grow"], ["flex", "gap-x-4"])}>
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
            <div className={clsx(["flex"])}>
              <p
                className={clsx(
                  ["flex-grow"],
                  ["text-text-primary", "text-sm"]
                )}
              >
                <LinkVideo
                  fragment={fragment.video}
                  className={clsx([
                    "text-accent-primary",
                    "font-bold",
                    "hover:underline",
                  ])}
                >
                  {fragment.video.title}
                </LinkVideo>
                が追加されました。
              </p>
              <div className={clsx(["flex", "gap-x-2"])}>
                {fragment.video.nicovideoSources.map(({ id, url }) => (
                  <a key={id} href={url} title={url} target="_blank">
                    <Pictogram
                      icon="nicovideo"
                      className={clsx(
                        ["text-text-muted", "hover:text-nicovideo-primary"],
                        ["w-5", "h-5"]
                      )}
                    />
                  </a>
                ))}
                {fragment.video.youtubeSources.map(({ id, url }) => (
                  <a key={id} href={url} title={url} target="_blank">
                    <Pictogram
                      icon="youtube"
                      className={clsx(
                        ["text-text-muted", "hover:text-youtube-primary"],
                        ["w-5", "h-5"]
                      )}
                    />
                  </a>
                ))}
                {fragment.video.bilibiliSources.map(({ id, url }) => (
                  <a key={id} href={url} title={url} target="_blank">
                    <Pictogram
                      icon="bilibili"
                      className={clsx(
                        ["text-text-muted", "hover:text-bilibili-primary"],
                        ["w-5", "h-5"]
                      )}
                    />
                  </a>
                ))}
                {fragment.video.soundcloudSources.map(({ id, url }) => (
                  <a key={id} href={url} title={url} target="_blank">
                    <Pictogram
                      icon="soundcloud"
                      className={clsx(
                        ["text-text-muted", "hover:text-soundcloud-primary"],
                        ["w-5", "h-5"]
                      )}
                    />
                  </a>
                ))}
              </div>
            </div>
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
        <div className={clsx(className, ["flex-grow"], ["flex", "gap-x-4"])}>
          <LinkNicovideoRegistrationRequest
            className={clsx(["block"], ["flex-shrink-0"])}
            fragment={fragment.request}
          >
            <CoolImage2
              className={clsx(["w-36"], ["h-24"])}
              width={144}
              height={96}
              alt={fragment.request.title}
              src={fragment.request.thumbnailUrl}
            />
          </LinkNicovideoRegistrationRequest>
          <div className={clsx(["flex-grow"], ["py-2"])}>
            <p className={clsx(["text-text-primary", "text-sm"])}>
              <LinkNicovideoRegistrationRequest
                fragment={fragment.request}
                className={clsx([
                  "text-accent-primary",
                  "font-bold",
                  "hover:underline",
                ])}
              >
                {fragment.request.title}
              </LinkNicovideoRegistrationRequest>
              がリクエストされました。
            </p>
            <div className={clsx(["mt-2"], ["flex", "gap-x-1"])}>
              <a
                className={clsx(
                  ["cursor-pointer"],
                  ["font-mono", "text-sm", "text-text-muted"],
                  ["inline-flex", "items-center", "gap-x-1"]
                )}
                href={fragment.request.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Pictogram icon="external-link" className={clsx(["h-4"])} />
                <span>{fragment.request.sourceId}</span>
              </a>
            </div>
          </div>
        </div>
      )}
      {fragment.__typename === "YoutubeMadRequestedTimelineEvent" && (
        <div className={clsx(className, ["flex-grow"], ["flex", "gap-x-4"])}>
          <YoutubeRequestPageLink
            className={clsx(["block"], ["flex-shrink-0"])}
            fragment={fragment.request}
          >
            <CoolImage2
              className={clsx(["w-36"], ["h-24"])}
              width={144}
              height={96}
              alt={fragment.request.title}
              src={fragment.request.thumbnailUrl}
            />
          </YoutubeRequestPageLink>
          <div className={clsx(["flex-grow"], ["py-2"])}>
            <p className={clsx(["text-text-primary", "text-sm"])}>
              <YoutubeRequestPageLink
                fragment={fragment.request}
                className={clsx([
                  "text-accent-primary",
                  "font-bold",
                  "hover:underline",
                ])}
              >
                {fragment.request.title}
              </YoutubeRequestPageLink>
              がリクエストされました。
            </p>
            <div className={clsx(["mt-2"], ["flex", "gap-x-1"])}>
              <a
                className={clsx(
                  ["cursor-pointer"],
                  ["font-mono", "text-sm", "text-text-muted"],
                  ["inline-flex", "items-center", "gap-x-1"]
                )}
                href={fragment.request.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Pictogram icon="external-link" className={clsx(["h-4"])} />
                <span>{fragment.request.sourceId}</span>
              </a>
            </div>
          </div>
        </div>
      )}
      <div className={clsx(["flex-shrink-0"], ["flex", "flex-col", "gap-y-1"])}>
        <DateTime2
          date={fragment.createdAt}
          className={clsx(
            ["flex-shrink-0"],
            ["font-mono", "text-xs", "text-text-muted"]
          )}
        />
        <div
          className={clsx(
            ["flex-shrink-0"],
            ["flex", "items-center", "gap-x-1"]
          )}
        >
          <UserIconLink fragment={fragment.event.user} />
          <UserDisplayNameLink
            fragment={fragment.event.user}
            className={clsx(["text-xs", "text-text-muted"])}
          />
        </div>
      </div>
    </div>
  );
}
