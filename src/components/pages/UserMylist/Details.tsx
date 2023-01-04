"use client";

import "client-only";

import clsx from "clsx";
import React from "react";
import { useQuery } from "urql";

import { UserIcon } from "~/components/common/UserIcon";
import { graphql } from "~/gql";
import {
  MylistPage_DetailsFragment,
  MylistPage_UpstreamDetailsDocument,
} from "~/gql/graphql";

graphql(`
  fragment MylistPage_Details on Mylist {
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

  query MylistPage_UpstreamDetails($id: ID!) {
    mylist(id: $id) {
      ...MylistPage_Details
    }
  }
`);

export const Details: React.FC<{
  className?: string;
  fallback: MylistPage_DetailsFragment;
}> = ({ className, fallback }) => {
  const [{ data }] = useQuery({
    query: MylistPage_UpstreamDetailsDocument,
    variables: { id: fallback.id },
  });
  const { title, holder, isLikeList } = fallback;

  return (
    <section className={clsx(className)}>
      <h1 className={clsx(["text-slate-900"], ["text-2xl"])}>
        {isLikeList ? `${holder.displayName}がいいねした動画` : title}
      </h1>
      <div className={clsx(["mt-1"], ["flex"], ["items-center"])}>
        <UserIcon name={holder.name} src={holder.icon || null} size={32} />
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
