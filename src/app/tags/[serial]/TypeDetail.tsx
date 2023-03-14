import clsx from "clsx";

import { FragmentType, getFragment, graphql } from "~/gql";

import { TagType } from "../../../components/common/TagType";

export const Fragment = graphql(`
  fragment TagPageLayout_TypeDetail on Tag {
    ...TagType
    type
  }
`);
export const TypeDetail: React.FC<{
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}> = ({ className, ...props }) => {
  const fragment = getFragment(Fragment, props.fragment);
  return (
    <div className={clsx(className, ["flex", "items-center"], ["gap-x-2"])}>
      <h2 className={clsx(["text-sm", "text-slate-600"])}>タグのタイプ</h2>
      <div className={clsx(["flex", "gap-x-2"])}>
        <TagType fragment={fragment} />
      </div>
    </div>
  );
};
