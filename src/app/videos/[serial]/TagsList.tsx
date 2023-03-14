import clsx from "clsx";

import { LinkTag } from "~/app/tags/[serial]/Link";
import { CommonTag } from "~/components/common/Tag";
import { FragmentType, getFragment, graphql } from "~/gql";

export const Fragment = graphql(`
  fragment VideoPageLayout_TagsList on VideoTagConnection {
    nodes {
      tag {
        ...Link_Tag
        ...CommonTag
        id
      }
    }
  }
`);
export const TagsList = ({
  className,
  ...props
}: {
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}): JSX.Element => {
  const fragment = getFragment(Fragment, props.fragment);
  return (
    <div
      className={clsx(className, [
        "flex",
        "flex-col",
        "items-start",
        "gap-y-0.5",
      ])}
    >
      {fragment.nodes.map((tagging) => (
        <LinkTag key={tagging.tag.id} fragment={tagging.tag}>
          <CommonTag
            className={clsx(["text-xs"], ["px-1"], ["py-0.5"])}
            fragment={tagging.tag}
          />
        </LinkTag>
      ))}
    </div>
  );
};
