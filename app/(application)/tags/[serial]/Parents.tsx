import clsx from "clsx";

import CommonTagLink from "~/components/CommonTagLink";
import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment TagPageLayout_Parents on Tag {
    parents(categoryTag: false) {
      nodes {
        id
        explicit
        parent {
          ...CommonTagLink
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
          <CommonTagLink key={id} size="small" fragment={parent} />
        ))}
      </div>
    </div>
  );
};
