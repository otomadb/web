import clsx from "clsx";

import { MadPageLink } from "~/app/(v2)/mads/[serial]/Link";
import CommonTagLink from "~/components/CommonTagLink";
import { VideoThumbnail } from "~/components/VideoThumbnail";
import { FragmentType, graphql, useFragment } from "~/gql";

const Fragment = graphql(`
  fragment UserMylistPage_Registration on MylistRegistration {
    note
    video {
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
  }
`);
export default function MylistItem({
  ...props
}: {
  fragment: FragmentType<typeof Fragment>;
}) {
  const node = useFragment(Fragment, props.fragment);

  return (
    <div
      className={clsx(
        "group/registration flex flex-col rounded border border-obsidian-lighter bg-obsidian-primary"
      )}
    >
      <MadPageLink fragment={node.video} className={clsx("block")}>
        <VideoThumbnail
          fragment={node.video}
          className={clsx(
            "h-[108px] w-full shrink-0 border border-obsidian-lighter"
          )}
          imageSize="medium"
        />
      </MadPageLink>
      <div className={clsx("flex flex-col gap-y-2 px-4 py-2")}>
        <div>
          <MadPageLink
            fragment={node.video}
            className={clsx(
              "line-clamp-1 text-sm font-bold text-snow-primary hover:text-vivid-primary hover:underline"
            )}
          >
            {node.video.title}
          </MadPageLink>
        </div>
        <div className={clsx("")}>
          {node.video.taggings.nodes.length === 0 && (
            <div className={clsx("text-xxs text-slate-500")}>
              タグ付けがありません
            </div>
          )}
          <div className={clsx("flex flex-wrap gap-1")}>
            {node.video.taggings.nodes.map((tagging) => (
              <CommonTagLink
                size="xs"
                key={tagging.id}
                fragment={tagging.tag}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
