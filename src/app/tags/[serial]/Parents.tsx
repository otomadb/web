import clsx from "clsx";

import { CommonTag } from "~/components/common/Tag";
import { FragmentType, graphql, useFragment } from "~/gql";

import { LinkTag } from "./Link";

export const Fragment = graphql(`
  fragment TagPageLayout_Parents on Tag {
    parents(categoryTag: false) {
      nodes {
        id
        explicit
        parent {
          ...Link_Tag
          ...CommonTag
          id
        }
      }
    }
  }
`);
export const Parents: React.FC<{
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}> = ({ className, ...props }) => {
  const { parents } = useFragment(Fragment, props.fragment);

  if (parents.nodes.length === 0) return null;

  return (
    <div className={clsx(className, ["flex", "items-center"], ["gap-x-2"])}>
      <h2 className={clsx(["text-sm", "text-slate-600"])}>親タグ</h2>
      <div className={clsx(["flex", "items-center", "gap-x-2"])}>
        {parents.nodes.map(({ id, parent }) => (
          <LinkTag key={id} fragment={parent}>
            <CommonTag fragment={parent} className={clsx(["text-sm"])} />
          </LinkTag>
        ))}
      </div>
    </div>
  );
};
