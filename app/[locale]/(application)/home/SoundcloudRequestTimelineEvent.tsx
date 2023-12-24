import clsx from "clsx";

import { CoolImage2 } from "~/components/CoolImage";
import { useOpenSoundcloudRegisterModal } from "~/components/FormWidget";
import {
  ExternalLinkPictogram,
  PlusPictogram,
  SoundcloudPictogram,
} from "~/components/Pictogram";
import useHasRole from "~/components/useHasRole";
import { FragmentType, graphql, useFragment } from "~/gql";

import SoundcloudRequestPageLink from "../requests/soundcloud/[sourceId]/Link";
import { TimelineEventWrapper } from "./TimelineEventWrapper";

export const SoundcloudRequestTimelineEventFragment = graphql(`
  fragment MyTopPage_TimelineSegment_SoundcloudRequestiTimelineEvent on SoundcloudMadRequestedTimelineEvent {
    ...MyTopPage_TimelineSegment_TimelineEventWrapper
    request {
      id
      title
      sourceId
      originalUrl
      thumbnailUrl
      ...SoundcloudRequestPageLink
    }
  }
`);
export default function SoundcloudRequestTimelineEvent({
  className,
  style,
  ...props
}: {
  className?: string;
  style?: React.CSSProperties;
  fragment: FragmentType<typeof SoundcloudRequestTimelineEventFragment>;
}) {
  const fragment = useFragment(
    SoundcloudRequestTimelineEventFragment,
    props.fragment
  );
  const registarable = useHasRole();
  const openRegisterSoundcloudForm = useOpenSoundcloudRegisterModal();

  return (
    <TimelineEventWrapper
      fragment={fragment}
      style={style}
      className={className}
      Icon={({ className, ...props }) => (
        <SoundcloudPictogram
          {...props}
          className={clsx(
            className,
            "border-soundcloud-primary bg-soundcloud-primary/75 text-white/75"
          )}
        />
      )}
      Title={({ ...props }) => (
        <span {...props}>SoundCloudからリクエストしました！</span>
      )}
      Main={({ className }) => (
        <div
          className={clsx(
            className,
            "flex w-64 grow flex-col gap-x-4 rounded border border-obsidian-lighter bg-obsidian-primary"
          )}
        >
          <SoundcloudRequestPageLink
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
          </SoundcloudRequestPageLink>
          <div className={clsx("grow p-2")}>
            <p className={clsx("text-sm text-snow-primary")}>
              <SoundcloudRequestPageLink
                fragment={fragment.request}
                className={clsx(
                  "font-bold text-snow-primary hover:text-vivid-primary hover:underline"
                )}
              >
                {fragment.request.title}
              </SoundcloudRequestPageLink>
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
            onClick={() =>
              openRegisterSoundcloudForm(fragment.request.sourceId)
            }
          >
            <PlusPictogram className={clsx("h-6 w-6")} />
          </button>
        ),
      ]}
    />
  );
}
