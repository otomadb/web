import clsx from "clsx";

import { MadPageLink } from "~/app/(v2)/mads/[serial]/Link";
import CommonTagLink from "~/components/CommonTagLink";
import { CoolImage2 } from "~/components/CoolImage";
import DateTime2 from "~/components/DateTime2";
import {
  useOpenRegisterFromNicovideo,
  useOpenRegisterFromYoutube,
} from "~/components/FormModal";
import Pictogram from "~/components/Pictogram";
import useHasRole from "~/components/useHasRole";
import UserDisplayNameLink from "~/components/UserLink/UserDisplayNameLink";
import UserIconLink from "~/components/UserLink/UserIconLink";
import { VideoThumbnail } from "~/components/VideoThumbnail";
import { FragmentType, graphql, useFragment } from "~/gql";

import { NicovideoRegistrationRequestLink } from "../requests/nicovideo/[sourceId]/Link";
import { YoutubeRequestPageLink } from "../requests/youtube/[sourceId]/Link";

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
              ...CommonTagLink
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
  const openRegisterNicovideoForm = useOpenRegisterFromNicovideo();
  const openRegisterYoutubeForm = useOpenRegisterFromYoutube();

  return (
    <div
      className={clsx(
        className,
        "flex gap-x-4 rounded border border-obsidian-lighter bg-obsidian-primary px-4 py-2"
      )}
      style={style}
    >
      {fragment.__typename === "MadRegisteredTimelineEvent" && (
        <div className={clsx("flex grow gap-x-4")}>
          <MadPageLink
            fragment={fragment.video}
            className={clsx("block shrink-0")}
          >
            <VideoThumbnail
              className={clsx("h-24 w-36")}
              imageSize="medium"
              fragment={fragment.video}
            />
          </MadPageLink>
          <div className={clsx("grow py-2")}>
            <div className={clsx("flex")}>
              <p className={clsx("grow text-sm text-snow-primary")}>
                <MadPageLink
                  fragment={fragment.video}
                  className={clsx(
                    "font-bold text-vivid-primary hover:underline"
                  )}
                >
                  {fragment.video.title}
                </MadPageLink>
                が追加されました。
              </p>
              <div className={clsx("flex items-start gap-x-2")}>
                {fragment.video.nicovideoSources.map(({ id, url }) => (
                  <a
                    key={id}
                    href={url}
                    title={url}
                    target="_blank"
                    className={clsx(
                      "flex rounded border border-nicovideo-primary bg-nicovideo-primary/50 p-1 text-black/75 hover:bg-nicovideo-primary hover:text-black"
                    )}
                  >
                    <Pictogram icon="nicovideo" className={clsx("h-4 w-4")} />
                  </a>
                ))}
                {fragment.video.youtubeSources.map(({ id, url }) => (
                  <a
                    key={id}
                    href={url}
                    title={url}
                    target="_blank"
                    className={clsx(
                      "flex rounded border border-youtube-primary bg-youtube-primary/50 p-1 text-white/75 hover:bg-youtube-primary hover:text-white"
                    )}
                  >
                    <Pictogram icon="youtube" className={clsx("h-4 w-4")} />
                  </a>
                ))}
                {fragment.video.bilibiliSources.map(({ id, url }) => (
                  <a
                    key={id}
                    href={url}
                    title={url}
                    target="_blank"
                    className={clsx(
                      "flex rounded border border-bilibili-primary bg-bilibili-primary/50 p-1 text-white/75 hover:bg-bilibili-primary hover:text-white"
                    )}
                  >
                    <Pictogram icon="bilibili" className={clsx("h-4 w-4")} />
                  </a>
                ))}
                {fragment.video.soundcloudSources.map(({ id, url }) => (
                  <a
                    key={id}
                    href={url}
                    title={url}
                    target="_blank"
                    className={clsx(
                      "flex rounded border border-soundcloud-primary bg-soundcloud-primary/50 p-1 text-white/75 hover:bg-soundcloud-primary hover:text-white"
                    )}
                  >
                    <Pictogram icon="soundcloud" className={clsx("h-4 w-4")} />
                  </a>
                ))}
              </div>
            </div>
            <div className={clsx("mt-2 flex flex-wrap gap-1")}>
              {fragment.video.taggings.nodes.map(({ id: taggingId, tag }) => (
                <CommonTagLink key={taggingId} size="xs" fragment={tag} />
              ))}
            </div>
          </div>
        </div>
      )}
      {fragment.__typename === "NicovideoMadRequestedTimelineEvent" && (
        <div className={clsx("flex grow gap-x-4")}>
          <NicovideoRegistrationRequestLink
            className={clsx("block shrink-0")}
            fragment={fragment.request}
          >
            <CoolImage2
              className={clsx("h-24 w-36")}
              width={144}
              height={96}
              alt={fragment.request.title}
              src={fragment.request.thumbnailUrl}
            />
          </NicovideoRegistrationRequestLink>
          <div className={clsx("grow py-2")}>
            <p className={clsx("text-sm text-snow-primary")}>
              <NicovideoRegistrationRequestLink
                fragment={fragment.request}
                className={clsx("font-bold text-vivid-primary hover:underline")}
              >
                {fragment.request.title}
              </NicovideoRegistrationRequestLink>
              がリクエストされました。
            </p>
            <div className={clsx("mt-2 flex gap-x-1")}>
              <a
                className={clsx(
                  "inline-flex cursor-pointer items-center gap-x-1 font-mono text-sm text-snow-darker"
                )}
                href={fragment.request.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Pictogram icon="external-link" className={clsx("h-4")} />
                <span>{fragment.request.sourceId}</span>
              </a>
            </div>
          </div>
        </div>
      )}
      {fragment.__typename === "YoutubeMadRequestedTimelineEvent" && (
        <div className={clsx("flex grow gap-x-4")}>
          <YoutubeRequestPageLink
            className={clsx("block shrink-0")}
            fragment={fragment.request}
          >
            <CoolImage2
              className={clsx("h-24 w-36")}
              width={144}
              height={96}
              alt={fragment.request.title}
              src={fragment.request.thumbnailUrl}
            />
          </YoutubeRequestPageLink>
          <div className={clsx("grow py-2")}>
            <p className={clsx("text-sm text-snow-primary")}>
              <YoutubeRequestPageLink
                fragment={fragment.request}
                className={clsx("font-bold text-vivid-primary hover:underline")}
              >
                {fragment.request.title}
              </YoutubeRequestPageLink>
              がリクエストされました。
            </p>
            <div className={clsx("mt-2 flex gap-x-1")}>
              <a
                className={clsx(
                  "inline-flex cursor-pointer items-center gap-x-1 font-mono text-sm text-snow-darker"
                )}
                href={fragment.request.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Pictogram icon="external-link" className={clsx("h-4")} />
                <span>{fragment.request.sourceId}</span>
              </a>
            </div>
          </div>
        </div>
      )}
      <div className={clsx("flex shrink-0 flex-col gap-y-1")}>
        <DateTime2
          date={fragment.createdAt}
          className={clsx("shrink-0 font-mono text-xs text-snow-darkest")}
        />
        <div className={clsx("flex shrink-0 grow gap-x-1")}>
          <UserIconLink fragment={fragment.event.user} />
          <UserDisplayNameLink
            fragment={fragment.event.user}
            className={clsx("text-xs text-snow-darker")}
          />
        </div>
        <div className={clsx("flex justify-end")}>
          {fragment.__typename === "NicovideoMadRequestedTimelineEvent" && (
            <button
              role="button"
              className={clsx(
                "text-snow-primary hover:text-vivid-primary disabled:hidden"
              )}
              disabled={!registarable}
              onClick={() =>
                openRegisterNicovideoForm(fragment.request.sourceId)
              }
            >
              <Pictogram icon="plus" className={clsx("h-6 w-6")} />
            </button>
          )}
          {fragment.__typename === "YoutubeMadRequestedTimelineEvent" && (
            <button
              role="button"
              className={clsx(
                "text-snow-primary hover:text-vivid-primary disabled:hidden"
              )}
              disabled={!registarable}
              onClick={() => openRegisterYoutubeForm(fragment.request.sourceId)}
            >
              <Pictogram icon="plus" className={clsx("h-6 w-6")} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
