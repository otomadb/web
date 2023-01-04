"use client";

import "client-only";

import clsx from "clsx";
import React, { useMemo } from "react";
import { TypedDocumentNode, useQuery } from "urql";

import { LinkMylist } from "~/components/common/Link";
import { getFragment, graphql } from "~/gql";
import {
  UserMylistsPage_AuthMylistsDocument,
  UserMylistsPage_MylistFragmentDoc,
  UserMylistsPage_MylistsFragment,
  UserMylistsPage_MylistsFragmentDoc,
  UserMylistsPage_ViewerDocument,
} from "~/gql/graphql";

import { Mylist } from "./Mylist";

graphql(`
  query UserMylistsPage_Viewer {
    whoami {
      id
    }
  }

  fragment UserMylistsPage_Mylists on MylistConnection {
    nodes {
      id
      ...UserMylistsPage_Mylist
    }
  }

  query UserMylistsPage_AuthMylists($userId: ID!) {
    user(id: $userId) {
      id
      mylists(input: { limit: 20, range: [PUBLIC, KNOW_LINK, PRIVATE] }) {
        ...UserMylistsPage_Mylists
      }
    }
  }
`);

export const useViewerPage = <TQuery, TVariable, TFallback>(
  pageUserId: string,
  {
    query,
    transform,
    fallback,
  }: {
    query: TypedDocumentNode<TQuery, TVariable>;
    transform: (data: TQuery | undefined) => TFallback;
    fallback: TFallback;
  }
) => {
  const [{ data: viewerData }] = useQuery({
    query: UserMylistsPage_ViewerDocument,
  });
  const viewerId = useMemo(
    () => (viewerData?.whoami?.id === pageUserId ? viewerData.whoami.id : null),
    [viewerData, pageUserId]
  );
  const [{ data, fetching }] = useQuery({
    query,
    variables: viewerId ? { userId: viewerId } : undefined,
  });
  return [!!viewerId, viewerId ? transform(data) : fallback, fetching] as const;
};

export const Mylists: React.FC<{
  className?: string;
  pageUserId: string;
  fallback: UserMylistsPage_MylistsFragment;
}> = ({ className, pageUserId, fallback }) => {
  const [isViewer, data, fetching] = useViewerPage(pageUserId, {
    query: UserMylistsPage_AuthMylistsDocument,
    transform: (data) =>
      getFragment(UserMylistsPage_MylistsFragmentDoc, data?.user.mylists),
    fallback,
  });

  const mylists = getFragment(UserMylistsPage_MylistFragmentDoc, data?.nodes);

  return (
    <div className={clsx(className)}>
      {!fetching && data && (
        <>
          <div className={clsx(className, ["flex"], ["gap-x-2"])}>
            <div
              className={clsx(
                ["flex-grow"],
                ["flex", "flex-col", "items-stretch"]
              )}
            >
              {mylists?.map(({ id, title, isLikeList, holder }) => (
                <LinkMylist
                  className={clsx(["px-4"], ["py-2"], ["hover:bg-blue-200"])}
                  mylistId={id}
                  key={id}
                >
                  <p className={clsx(["text-sm"], ["truncate"])}>
                    {!isLikeList && title}
                    {isLikeList && `${holder.displayName}のいいね欄`}
                  </p>
                </LinkMylist>
              ))}
            </div>
            <div
              className={clsx(
                ["flex-shrink-0"],
                ["w-[1024px]"],
                ["flex", "flex-col", "items-stretch", "gap-y-2"]
              )}
            >
              {mylists?.map((mylist) => (
                <Mylist key={mylist.id} fragment={mylist} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
