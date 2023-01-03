"use client";

import "client-only";

import clsx from "clsx";
import React, { useMemo } from "react";
import { useQuery } from "urql";

import { getFragment, graphql } from "~/gql";
import {
  UserMylistsPage_AuthMylistsDocument,
  UserMylistsPage_MylistFragmentDoc,
  UserMylistsPage_MylistsFragment,
  UserMylistsPage_MylistsFragmentDoc,
} from "~/gql/graphql";
import { useViewer } from "~/hooks/useViewer";

graphql(`
  fragment UserMylistsPage_Mylist on Mylist {
    id
    title
    isLikeList
    range
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
      mylists(input: { limit: 10, range: [PUBLIC, KNOW_LINK, PRIVATE] }) {
        ...UserMylistsPage_Mylists
      }
    }
  }
`);

export const Mylists: React.FC<{
  className?: string;
  pageUserId: string;
  fallback: UserMylistsPage_MylistsFragment;
}> = ({ className, pageUserId, fallback }) => {
  const [{ data: viewerData }] = useViewer();
  const isYou = useMemo(
    () => !!viewerData?.whoami?.id && viewerData.whoami.id === pageUserId,
    [viewerData, pageUserId]
  );
  const [{ data, fetching }] = useQuery({
    query: UserMylistsPage_AuthMylistsDocument,
    pause: !isYou,
    variables: isYou
      ? {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          userId: viewerData!.whoami!.id!,
        }
      : undefined,
  });

  const mylists = useMemo(
    () =>
      (isYou
        ? getFragment(UserMylistsPage_MylistsFragmentDoc, data?.user.mylists)
        : fallback
      )?.nodes.map((mylist) =>
        getFragment(UserMylistsPage_MylistFragmentDoc, mylist)
      ),
    [data, fallback, isYou]
  );

  return (
    <div className={clsx(className)}>
      {fetching && <p>ロード中です</p>}
      {mylists?.map((mylist) => (
        <div key={mylist.id}>
          <p>{mylist.title}</p>
        </div>
      ))}
    </div>
  );
};
