import clsx from "clsx";

import { MadPageLink } from "~/app/(v2)/mads/[serial]/Link";
import CommonTagLink from "~/components/CommonTagLink";
import { VideoThumbnail } from "~/components/VideoThumbnail";
import { FragmentType, graphql, useFragment } from "~/gql";

export const CommonMadBlockFragment = graphql(`
  fragment CommonMadBlock on Video {
    ...Link_Video
    ...VideoThumbnail
    id
    title
    taggings(first: 3) {
      nodes {
        id
        tag {
          ...CommonTagLink
        }
      }
    }
  }
`);
export default function CommonMadBlock({
  ...props
}: {
  fragment: FragmentType<typeof CommonMadBlockFragment>;
}) {
  const fragment = useFragment(CommonMadBlockFragment, props.fragment);

  return (
    <div
      className={clsx(
        "shrink-0 overflow-hidden rounded border border-obsidian-lighter bg-obsidian-primary"
      )}
    >
      <MadPageLink fragment={fragment} className={clsx(["block"])}>
        <VideoThumbnail
          fragment={fragment}
          className={clsx("h-32 w-full")}
          imageSize="medium"
        />
      </MadPageLink>
      <div className={clsx("flex flex-col gap-y-2 p-2")}>
        <MadPageLink
          fragment={fragment}
          className={clsx(
            "line-clamp-1 text-xs font-bold text-snow-primary hover:text-vivid-primary hover:underline"
          )}
        >
          {fragment.title}
        </MadPageLink>
        <div className={clsx([])}>
          {fragment.taggings.nodes.length === 0 && (
            <div className={clsx("text-xxs text-slate-500")}>
              タグ付けがありません
            </div>
          )}
          <div className={clsx("flex flex-wrap gap-0.5")}>
            {fragment.taggings.nodes.map((tagging) => (
              <CommonTagLink
                key={tagging.id}
                fragment={tagging.tag}
                size="xs"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
