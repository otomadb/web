import clsx from "clsx";

import { CoolImage2 } from "~/components/CoolImage";
import { useOpenRegisterFromNicovideo } from "~/components/FormModal";
import { ExternalLinkPictogram, PlusPictogram } from "~/components/Pictogram";
import useHasRole from "~/components/useHasRole";
import { FragmentType, graphql, useFragment } from "~/gql";

import { NicovideoRegistrationRequestLink } from "../requests/nicovideo/[sourceId]/Link";
import { TimelineEventWrapper } from "./TimelineEventWrapper";

export const NicovideoRequestTimelineEventFragment = graphql(`
  fragment MyTopPage_TimelineSegment_NicovideoRequestiTimelineEvent on NicovideoMadRequestedTimelineEvent {
    ...MyTopPage_TimelineSegment_TimelineEventWrapper
    request {
      id
      title
      sourceId
      originalUrl
      thumbnailUrl
      ...Link_NicovideoRegistrationRequest
    }
  }
`);
export default function NicovideoRequestTimelineEvent({
  className,
  style,
  ...props
}: {
  className?: string;
  style?: React.CSSProperties;
  fragment: FragmentType<typeof NicovideoRequestTimelineEventFragment>;
}) {
  const fragment = useFragment(
    NicovideoRequestTimelineEventFragment,
    props.fragment
  );
  const registarable = useHasRole();
  const openRegisterYoutubeForm = useOpenRegisterFromNicovideo();

  return (
    <TimelineEventWrapper
      fragment={fragment}
      style={style}
      className={className}
      Title={({ ...props }) => (
        <span {...props}>ニコニコ動画からリクエストしました！</span>
      )}
      Main={({ className }) => (
        <div
          className={clsx(
            className,
            "flex w-64 grow flex-col gap-x-4 rounded border border-obsidian-lighter bg-obsidian-primary"
          )}
        >
          <NicovideoRegistrationRequestLink
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
          </NicovideoRegistrationRequestLink>
          <div className={clsx("grow p-2")}>
            <p className={clsx("text-sm text-snow-primary")}>
              <NicovideoRegistrationRequestLink
                fragment={fragment.request}
                className={clsx(
                  "font-bold text-snow-primary hover:text-vivid-primary hover:underline"
                )}
              >
                {fragment.request.title}
              </NicovideoRegistrationRequestLink>
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
            <PlusPictogram className={clsx("h-full w-full")} />
          </button>
        ),
      ]}
    />
  );
}
