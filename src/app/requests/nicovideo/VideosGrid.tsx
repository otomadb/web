"use client";

import { ResultOf } from "@graphql-typed-document-node/core";
import clsx from "clsx";
import React from "react";
import { useQuery } from "urql";

import { LinkUser } from "~/app/users/[name]/Link";
import { CoolImage } from "~/components/common/CoolImage";
import {
  FetcherContainer,
  InfiniteVideosGrid,
} from "~/components/common/InfiniteVideoGrid";
import { UserIcon } from "~/components/common/UserIcon";
import { FragmentType, graphql, useFragment } from "~/gql";

import { LinkNicovideoRegistrationRequest } from "./[sourceId]/Link";

export const VideoGrid: React.FC<{ initAfter?: string }> = ({ initAfter }) => (
  <InfiniteVideosGrid
    initAfter={initAfter}
    Fetcher={(props) => <Fetcher {...props} />}
  />
);

const Query = graphql(`
  query AllNicovideoRequestsPage_VideosGrid_Block(
    $first: Int!
    $after: String
  ) {
    findNicovideoRegistrationRequests(
      first: $first
      after: $after
      checked: false
    ) {
      nodes {
        id
        ...AllNicovideoRequestsPage_VideosGrid_Request
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`);
const Fetcher: React.FC<{
  after?: string;
  pushAfter(after: string): void;
}> = ({ after, pushAfter }) =>
  FetcherContainer<
    ResultOf<typeof Query>["findNicovideoRegistrationRequests"]["nodes"][number]
  >({
    pushAfter,
    useQuery() {
      const [{ data, fetching }] = useQuery({
        query: Query,
        variables: { first: 12, after },
      });
      return {
        fetching,
        data: {
          nodes: data?.findNicovideoRegistrationRequests.nodes,
          pageInfo: data?.findNicovideoRegistrationRequests.pageInfo,
        },
      };
    },
    Item({ node }) {
      return <Video fragment={node} />;
    },
  });

const Fragment = graphql(`
  fragment AllNicovideoRequestsPage_VideosGrid_Request on NicovideoRegistrationRequest {
    ...Link_NicovideoRegistrationRequest
    title
    thumbnailUrl
    requestedBy {
      ...Link_User
      ...UserIcon
      id
      name
    }
  }
`);
const Video: React.FC<{
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}> = ({ className, ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);
  return (
    <div
      className={clsx(
        className,
        ["relative"],
        ["overflow-hidden"],
        ["rounded"],
        ["border"],
        ["px-2"],
        ["py-2"],
        ["flex", "flex-col"]
      )}
    >
      <LinkNicovideoRegistrationRequest
        className={clsx(["flex"])}
        fragment={fragment}
      >
        <CoolImage
          alt={fragment.title}
          src={fragment.thumbnailUrl}
          className={clsx(["w-full"], ["h-32"])}
          width={256}
          height={192}
        />
      </LinkNicovideoRegistrationRequest>
      <div className={clsx(["mt-1"])}>
        <LinkNicovideoRegistrationRequest
          fragment={fragment}
          className={clsx(["text-sm"], ["font-bold"], ["text-slate-900"])}
        >
          {fragment.title}
        </LinkNicovideoRegistrationRequest>
      </div>
      <div className={clsx(["mt-1"], ["flex", "items-center"])}>
        <LinkUser fragment={fragment.requestedBy}>
          <UserIcon size={24} fragment={fragment.requestedBy} />
        </LinkUser>
        <div className={clsx(["ml-1"])}>
          <LinkUser
            className={clsx(["text-xs"], ["text-slate-700"])}
            fragment={fragment.requestedBy}
          >
            {fragment.requestedBy.name}
          </LinkUser>
        </div>
      </div>
    </div>
  );
};
