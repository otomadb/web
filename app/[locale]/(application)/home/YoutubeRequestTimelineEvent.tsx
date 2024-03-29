import clsx from "clsx";

import { CoolImage2 } from "~/components/CoolImage";
import { useOpenRegisterFromYoutube } from "~/components/FormWidget";
import {
  ExternalLinkPictogram,
  PlusPictogram,
  YoutubePictogram,
} from "~/components/Pictogram";
import useHasRole from "~/components/useHasRole";
import { FragmentType, graphql, useFragment } from "~/gql";

import { YoutubeRequestPageLink } from "../requests/youtube/[sourceId]/Link";
import { TimelineEventWrapper } from "./TimelineEventWrapper";

export const YoutubeRequestTimelineEventFragment = graphql(`
  fragment MyTopPage_TimelineSegment_YoutubeRequestiTimelineEvent on YoutubeMadRequestedTimelineEvent {
    ...MyTopPage_TimelineSegment_TimelineEventWrapper
    request {
      id
      title
      sourceId
      originalUrl
      thumbnailUrl
      ...YoutubeRequestPageLink
    }
  }
`);
export default function YoutubeRequestTimelineEvent({
  className,
  style,
  ...props
}: {
  className?: string;
  style?: React.CSSProperties;
  fragment: FragmentType<typeof YoutubeRequestTimelineEventFragment>;
}) {
  const fragment = useFragment(
    YoutubeRequestTimelineEventFragment,
    props.fragment
  );
  const registarable = useHasRole();
  const openRegisterYoutubeForm = useOpenRegisterFromYoutube();

  return (
    <TimelineEventWrapper
      fragment={fragment}
      style={style}
      className={className}
      Title={({ ...props }) => (
        <span {...props}>Youtubeからリクエストしました！</span>
      )}
      Icon={({ className, ...props }) => (
        <YoutubePictogram
          {...props}
          className={clsx(
            className,
            "border-youtube-primary bg-youtube-primary/75 text-white/75"
          )}
        />
      )}
      Main={({ className }) => (
        <div
          className={clsx(
            className,
            "flex w-64 grow flex-col gap-x-4 rounded border border-obsidian-lighter bg-obsidian-primary"
          )}
        >
          <YoutubeRequestPageLink
            className={clsx("block w-full shrink-0")}
            fragment={fragment.request}
          >
            <CoolImage2
              className={clsx("h-32 w-full")}
              width={144}
              height={96}
              alt={fragment.request.title}
              src={fragment.request.thumbnailUrl}
            />
          </YoutubeRequestPageLink>
          <div className={clsx("grow p-2")}>
            <p className={clsx("text-sm text-snow-primary")}>
              <YoutubeRequestPageLink
                fragment={fragment.request}
                className={clsx(
                  "font-bold text-snow-primary hover:text-vivid-primary hover:underline"
                )}
              >
                {fragment.request.title}
              </YoutubeRequestPageLink>
            </p>
          </div>
        </div>
      )}
      Details={[
        {
          title: "動画ソース",
          Content: ({ className }) => (
            <a
              href={fragment.request.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(
                className,
                "inline-flex cursor-pointer items-center gap-x-1 font-mono text-xs text-snow-primary"
              )}
            >
              <ExternalLinkPictogram className={clsx("h-4")} />
              <span>{fragment.request.sourceId}</span>
            </a>
          ),
        },
      ]}
      Widgets={[
        ({ className }) => (
          <button
            role="button"
            className={clsx(
              className,
              "text-snow-darkest hover:text-vivid-primary disabled:text-obsidian-lighter"
            )}
            disabled={!registarable}
            onClick={() => openRegisterYoutubeForm(fragment.request.sourceId)}
          >
            <PlusPictogram className={clsx("h-6 w-6")} />
          </button>
        ),
      ]}
    />
  );
}
