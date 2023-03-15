import { ResultOf } from "@graphql-typed-document-node/core";
import clsx from "clsx";

import { graphql } from "~/gql";

export const Query = graphql(`
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
`);
export const Details = async ({
  className,
  fetcher,
}: {
  className?: string;
  fetcher: Promise<ResultOf<typeof Query>>;
}) => {
  const { getMylist } = await fetcher;
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
