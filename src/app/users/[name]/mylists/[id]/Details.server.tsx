import clsx from "clsx";

import { FragmentType, graphql, useFragment } from "~/gql";
import { fetchGql } from "~/gql/fetch";

const Fragment = graphql(`
  fragment UserMylistPage_Details on Mylist {
    id
  }
`);
export const Details = async ({
  className,
  ...props
}: {
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}) => {
  const fragment = useFragment(Fragment, props.fragment);

  const { getMylist } = await fetchGql(
    graphql(`
      query UserMylistPage_Details_Fetch($id: ID!) {
        getMylist(id: $id) {
          title
          isLikeList
          range
          holder {
            id
            displayName
          }
        }
      }
    `),
    { id: fragment.id }
  );

  const { title, holder, isLikeList, range } = getMylist;

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
