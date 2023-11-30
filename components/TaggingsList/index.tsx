import clsx from "clsx";

import CommonTagLink from "~/components/CommonTagLink";
import { TagType } from "~/components/TagType";
import { FragmentType, graphql, useFragment } from "~/gql";

export const TaggingsListFragment = graphql(`
  fragment TaggingsList on VideoTagConnection {
    nodes {
      id
      tag {
        ...CommonTagLink
        ...TagType
        id
        type
      }
    }
  }
`);
export default async function TaggingsList({
  className,
  ...props
}: {
  className?: string;
  fragment: FragmentType<typeof TaggingsListFragment>;
}) {
  const fragment = useFragment(TaggingsListFragment, props.fragment);

  return (
    <div className={clsx(className, "flex flex-col gap-y-1")}>
      <div className={clsx("flex gap-x-2 gap-y-1")}>
        {fragment.nodes
          .filter(
            ({ tag: { type: t1 } }, i, arr) =>
              i === arr.findIndex(({ tag: { type: t2 } }) => t1 === t2)
          )
          .map((node) => (
            <TagType
              key={node.tag.type}
              className={clsx("text-xs")}
              fragment={node.tag}
            />
          ))}
      </div>
      <div className={clsx("flex flex-col items-start gap-y-0.5")}>
        {fragment.nodes.map((tagging) => (
          <div key={tagging.id} className={clsx("flex")}>
            <CommonTagLink size="xs" fragment={tagging.tag} />
          </div>
        ))}
      </div>
    </div>
  );
}
