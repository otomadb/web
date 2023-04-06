import clsx from "clsx";

import { LinkTag } from "~/app/tags/[serial]/Link";
import { TagType } from "~/components/common/TagType";
import { CommonTag } from "~/components/CommonTag";
import { FragmentType, graphql, useFragment } from "~/gql";
import { fetchGql3 } from "~/gql/fetch";
import { isErr } from "~/utils/Result";

export const Fragment = graphql(`
  fragment VideoPageLayout_TaggingsSectionContents on Video {
    id
  }
`);
export default async function TagsSectionSC({
  ...props
}: {
  fragment: FragmentType<typeof Fragment>;
}) {
  const fragment = useFragment(Fragment, props.fragment);
  const result = await fetchGql3(
    graphql(`
      query VideoPageLayout_TaggingsSectionContentsQuery($id: ID!) {
        getVideo(id: $id) {
          taggings {
            nodes {
              id
              tag {
                ...Link_Tag
                ...CommonTag
                ...TagType
                id
                type
              }
            }
          }
        }
      }
    `),
    { id: fragment.id }
  );
  if (isErr(result)) throw new Error("Failed to fetch video taggings");

  const { taggings } = result.data.getVideo;
  return (
    <div className={clsx(["flex", "flex-col"], ["gap-y-1"])}>
      <div className={clsx("flex", "gap-x-2", "gap-y-1")}>
        {taggings.nodes
          .filter(
            ({ tag: { type: t1 } }, i, arr) =>
              i === arr.findIndex(({ tag: { type: t2 } }) => t1 === t2)
          )
          .map((node) => (
            <TagType
              key={node.tag.type}
              className={clsx(["text-xs"])}
              fragment={node.tag}
            />
          ))}
      </div>
      <div className={clsx(["flex", "flex-col", "items-start", "gap-y-0.5"])}>
        {taggings.nodes.map((tagging) => (
          <div key={tagging.id} className={clsx(["flex"])}>
            <LinkTag fragment={tagging.tag}>
              <CommonTag
                fragment={tagging.tag}
                className={clsx(["text-xs"], ["px-1"], ["py-0.5"])}
              />
            </LinkTag>
          </div>
        ))}
      </div>
    </div>
  );
}
