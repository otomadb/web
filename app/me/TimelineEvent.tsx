import clsx from "clsx";

import { CommonTag2 } from "~/components/CommonTag";
import { CoolImage2 } from "~/components/CoolImage";
import DateTime2 from "~/components/DateTime2";
import {
  useOpenRegisterFromNicovideoWithId,
  useOpenRegisterFromYoutube,
} from "~/components/FormModal";
import Pictogram from "~/components/Pictogram";
import useHasRole from "~/components/useHasRole";
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
  const registarable = useHasRole();
  const openRegisterNicovideoForm = useOpenRegisterFromNicovideoWithId();
  const openRegisterYoutubeForm = useOpenRegisterFromYoutube();

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
        <div className={clsx(className, ["grow"], ["flex", "gap-x-4"])}>
          <LinkVideo
            fragment={fragment.video}
            className={clsx(["block"], ["shrink-0"])}
          >
            <VideoThumbnail
              className={clsx(["w-36"], ["h-24"])}
              imageSize="medium"
              fragment={fragment.video}
            />
          </LinkVideo>
          <div className={clsx(["grow"], ["py-2"])}>
            <div className={clsx(["flex"])}>
              <p className={clsx(["grow"], ["text-text-primary", "text-sm"])}>
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
              <div className={clsx(["flex", "items-start", "gap-x-2"])}>
                {fragment.video.nicovideoSources.map(({ id, url }) => (
                  <a
                    key={id}
                    href={url}
                    title={url}
                    target="_blank"
                    className={clsx(
                      ["flex"],
                      ["bg-nicovideo-primary/50", "hover:bg-nicovideo-primary"],
                      ["border", "border-nicovideo-primary"],
                      [["text-black/75", "hover:text-black"], "rounded", "p-1"]
                    )}
                  >
                    <Pictogram
                      icon="nicovideo"
                      className={clsx(["w-4", "h-4"])}
                    />
                  </a>
                ))}
                {fragment.video.youtubeSources.map(({ id, url }) => (
                  <a
                    key={id}
                    href={url}
                    title={url}
                    target="_blank"
                    className={clsx(
                      ["flex"],
                      ["bg-youtube-primary/50", "hover:bg-youtube-primary"],
                      ["border", "border-youtube-primary"],
                      [["text-white/75", "hover:text-white"], "rounded", "p-1"]
                    )}
                  >
                    <Pictogram
                      icon="youtube"
                      className={clsx(["w-4", "h-4"])}
                    />
                  </a>
                ))}
                {fragment.video.bilibiliSources.map(({ id, url }) => (
                  <a
                    key={id}
                    href={url}
                    title={url}
                    target="_blank"
                    className={clsx(
                      ["flex"],
                      ["bg-bilibili-primary/50", "hover:bg-bilibili-primary"],
                      ["border", "border-bilibili-primary"],
                      [["text-white/75", "hover:text-white"], "rounded", "p-1"]
                    )}
                  >
                    <Pictogram
                      icon="bilibili"
                      className={clsx(["w-4", "h-4"])}
                    />
                  </a>
                ))}
                {fragment.video.soundcloudSources.map(({ id, url }) => (
                  <a
                    key={id}
                    href={url}
                    title={url}
                    target="_blank"
                    className={clsx(
                      ["flex"],
                      [
                        "bg-soundcloud-primary/50",
                        "hover:bg-soundcloud-primary",
                      ],
                      ["border", "border-soundcloud-primary"],
                      [["text-white/75", "hover:text-white"], "rounded", "p-1"]
                    )}
                  >
                    <Pictogram
                      icon="soundcloud"
                      className={clsx(["w-4", "h-4"])}
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
        <div className={clsx(className, ["grow"], ["flex", "gap-x-4"])}>
          <LinkNicovideoRegistrationRequest
            className={clsx(["block"], ["shrink-0"])}
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
          <div className={clsx(["grow"], ["py-2"])}>
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
        <div className={clsx(className, ["grow"], ["flex", "gap-x-4"])}>
          <YoutubeRequestPageLink
            className={clsx(["block"], ["shrink-0"])}
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
          <div className={clsx(["grow"], ["py-2"])}>
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
      <div className={clsx(["shrink-0"], ["flex", "flex-col", "gap-y-1"])}>
        <DateTime2
          date={fragment.createdAt}
          className={clsx(
            ["shrink-0"],
            ["font-mono", "text-xs", "text-text-muted"]
          )}
        />
        <div className={clsx(["grow"], ["shrink-0"], ["flex", "gap-x-1"])}>
          <UserIconLink fragment={fragment.event.user} />
          <UserDisplayNameLink
            fragment={fragment.event.user}
            className={clsx(["text-xs", "text-text-muted"])}
          />
        </div>
        <div className={clsx(["flex", "justify-end"])}>
          {fragment.__typename === "NicovideoMadRequestedTimelineEvent" && (
            <button
              role="button"
              className={clsx(
                ["disabled:hidden"],
                ["text-text-primary", "hover:text-accent-primary"]
              )}
              disabled={!registarable}
              onClick={() =>
                openRegisterNicovideoForm(fragment.request.sourceId)
              }
            >
              <Pictogram icon="plus" className={clsx(["w-6", "h-6"])} />
            </button>
          )}
          {fragment.__typename === "YoutubeMadRequestedTimelineEvent" && (
            <button
              role="button"
              className={clsx(
                ["disabled:hidden"],
                ["text-text-primary", "hover:text-accent-primary"]
              )}
              disabled={!registarable}
              onClick={() => openRegisterYoutubeForm(fragment.request.sourceId)}
            >
              <Pictogram icon="plus" className={clsx(["w-6", "h-6"])} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
