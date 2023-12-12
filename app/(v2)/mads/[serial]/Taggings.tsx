import clsx from "clsx";

import CommonTagLink from "~/components/CommonTagLink";
import { TagType } from "~/components/TagType";
import { FragmentType, graphql, useFragment } from "~/gql";
import { makeGraphQLClient2 } from "~/gql/fetch";

export const Fragment = graphql(`
  fragment MadPageLayout_Taggings on Video {
    id
  }
`);
export default async function Taggings({
  className,
  fragment,
}: {
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}) {
  const {
    getVideo: { taggings },
  } = await (
    await makeGraphQLClient2({ auth: "optional" })
  ).request(
    graphql(`
      query MadPageLayout_TaggingsQuery($id: ID!) {
        getVideo(id: $id) {
          taggings {
            nodes {
              id
              tag {
                ...CommonTagLink
                ...TagType
                id
                belongTo {
                  keyword
                }
              }
            }
          }
        }
      }
    `),
    { id: useFragment(Fragment, fragment).id }
  );

  return (
    <div className={clsx(className, "flex flex-col")}>
      <div className={clsx("flex gap-x-2 gap-y-1")}>
        {taggings.nodes
          .filter(
            ({ tag: { belongTo: k1 } }, i, arr) =>
              i ===
              arr.findIndex(
                ({ tag: { belongTo: k2 } }) => k1?.keyword === k2?.keyword
              )
          )
          .map((node) => (
            <TagType
              key={node.tag.belongTo?.keyword || "_UNDEFINED"}
              className={clsx("text-xs")}
              fragment={node.tag}
            />
          ))}
      </div>
      <div className={clsx("mt-2 flex flex-col items-start gap-y-0.5")}>
        {taggings.nodes.map((tagging) => (
          <div key={tagging.id} className={clsx("flex")}>
            <CommonTagLink size="xs" fragment={tagging.tag} />
          </div>
        ))}
      </div>
    </div>
  );
}
