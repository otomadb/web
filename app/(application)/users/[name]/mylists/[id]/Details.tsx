import clsx from "clsx";

import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment UserMylistPage_Details on Mylist {
    title
    isLikeList
    range
    holder {
      id
      displayName
    }
  }
`);
export const Details: React.FC<{
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}> = ({ className, ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);
  const { isLikeList, holder, title, range } = fragment;

  return (
    <div className={clsx(className, ["px-4"], ["py-4"])}>
      <h1 className={clsx(["text-slate-900"], ["text-xl"])}>
        {isLikeList ? `${holder.displayName}がいいねした動画` : title}
      </h1>
      <div className={clsx(["mt-1"], ["flex", "items-center", "gap-x-2"])}>
        <div className={clsx(["text-sm"], ["text-slate-600"])}>{range}</div>
      </div>
    </div>
  );
};
