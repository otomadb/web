"use client";

import "client-only";

import clsx from "clsx";
import React, { useMemo } from "react";
import { useQuery } from "urql";

import { UserIcon } from "~/components/UserIcon";
import { FragmentType, getFragment as useFragment, graphql } from "~/gql";
import {
  MylistPage_DetailsSectionDocument,
  MylistPage_DetailsSectionFragmentDoc,
} from "~/gql/graphql";

graphql(`
  fragment MylistPage_DetailsSection on Mylist {
    id
    title
    isLikeList
    holder {
      id
      name
      displayName
      icon
    }
  }

  query MylistPage_DetailsSection($id: ID!) {
    mylist(id: $id) {
      ...MylistPage_DetailsSection
    }
  }
`);

export const DetailsSection: React.FC<{
  className?: string;
  mylistId: string;
  fallback: FragmentType<typeof MylistPage_DetailsSectionFragmentDoc>;
}> = ({ className, mylistId, fallback }) => {
  const [result] = useQuery({
    query: MylistPage_DetailsSectionDocument,
    variables: { id: mylistId },
  });
  const mylist = useFragment(
    MylistPage_DetailsSectionFragmentDoc,
    useMemo(() => result.data?.mylist || fallback, [result, fallback])
  );
  const { title, holder, isLikeList } = mylist;

  return (
    <section className={clsx(className)}>
      <h1 className={clsx(["text-slate-900"], ["text-2xl"])}>
        {isLikeList ? `${holder.displayName}がいいねした動画` : title}
      </h1>
      <div className={clsx(["mt-1"], ["flex"], ["items-center"])}>
        <UserIcon name={holder.name} src={holder.icon} size={32} />
        <div className={clsx(["ml-1"], ["flex", "items-center"])}>
          <div className={clsx(["text-slate-900"], ["text-sm"])}>
            {holder.displayName}
          </div>
          <div
            className={clsx(
              ["ml-1"],
              ["text-slate-500"],
              ["font-mono"],
              ["leading-none"],
              ["text-xs"]
            )}
          >
            @{holder.name}
          </div>
        </div>
      </div>
    </section>
  );
};
