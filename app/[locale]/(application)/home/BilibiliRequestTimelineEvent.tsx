import clsx from "clsx";

import { CoolImage2 } from "~/components/CoolImage";
import { useOpenRegisterFromBilibili } from "~/components/FormWidget";
import {
  BilibiliPictogram,
  ExternalLinkPictogram,
  PlusPictogram,
} from "~/components/Pictogram";
import useHasRole from "~/components/useHasRole";
import { FragmentType, graphql, useFragment } from "~/gql";

import BilibiliRequestLink from "../requests/bilibili/[sourceId]/Link";
import { TimelineEventWrapper } from "./TimelineEventWrapper";

export const BilibiliRequestTimelineEventFragment = graphql(`
  fragment MyTopPage_TimelineSegment_BilibiliRequestiTimelineEvent on BilibiliMadRequestedTimelineEvent {
    ...MyTopPage_TimelineSegment_TimelineEventWrapper
    request {
      id
      title
      sourceId
      originalUrl
      thumbnailUrl
      ...BilibiliRequestPageLink
    }
  }
`);
export default function BilibiliRequestTimelineEvent({
  className,
  style,
  ...props
}: {
  className?: string;
  style?: React.CSSProperties;
  fragment: FragmentType<typeof BilibiliRequestTimelineEventFragment>;
}) {
  const fragment = useFragment(
    BilibiliRequestTimelineEventFragment,
    props.fragment
  );
  const registarable = useHasRole();
  const openRegisterYoutubeForm = useOpenRegisterFromBilibili();

  return (
    <TimelineEventWrapper
      fragment={fragment}
      style={style}
      className={className}
      Icon={({ className, ...props }) => (
        <BilibiliPictogram
          {...props}
          className={clsx(
            className,
            "border-bilibili-primary bg-bilibili-primary/75 text-white/75"
          )}
        />
      )}
      Title={({ ...props }) => (
        <span {...props}>Bilibiliからリクエストしました！</span>
      )}
      Main={({ className }) => (
        <div
          className={clsx(
            className,
            "flex w-64 grow flex-col gap-x-4 rounded border border-obsidian-lighter bg-obsidian-primary"
          )}
        >
          <BilibiliRequestLink
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
          </BilibiliRequestLink>
          <div className={clsx("grow p-2")}>
            <p className={clsx("text-sm text-snow-primary")}>
              <BilibiliRequestLink
                fragment={fragment.request}
                className={clsx(
                  "font-bold text-snow-primary hover:text-vivid-primary hover:underline"
                )}
              >
                {fragment.request.title}
              </BilibiliRequestLink>
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
