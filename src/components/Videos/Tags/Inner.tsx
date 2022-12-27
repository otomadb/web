"use client";

import "client-only";

import { PencilSquareIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import React, { useMemo, useState } from "react";
import { useQuery } from "urql";

import { getFragment as useFragment, graphql } from "~/gql";
import {
  VideoPage_TagsListFragmentDoc,
  VideoPage_TagsSectionFragment,
  VideoPage_TagsSectionFragmentDoc,
  VideoPage_UpstreamTagsSectionDocument,
} from "~/gql/graphql";

import { TagsList } from "./TagsList";

graphql(`
  fragment VideoPage_TagsSection on Video {
    id
    ...VideoPage_TagsList
  }

  query VideoPage_UpstreamTagsSection($id: ID!) {
    video(id: $id) {
      id
      ...VideoPage_TagsSection
    }
  }
`);

export const Inner: React.FC<{
  className?: string;
  fallback: VideoPage_TagsSectionFragment;
}> = ({ className, fallback }) => {
  const [{ data }] = useQuery({
    query: VideoPage_UpstreamTagsSectionDocument,
    variables: { id: fallback.id },
  });
  const upstream = useFragment(VideoPage_TagsSectionFragmentDoc, data?.video);

  const video = useMemo(() => upstream || fallback, [fallback, upstream]);
  const { id: videoId } = video;

  const tagslist = useFragment(VideoPage_TagsListFragmentDoc, video);

  const [edit, setEdit] = useState(false);

  return (
    <section className={clsx(className)}>
      <div className={clsx(["flex"], ["items-center"])}>
        <h2 className={clsx(["flex-grow"], ["text-xl"], ["text-slate-900"])}>
          タグ
        </h2>
        <div
          className={clsx(
            ["group/toggle"],
            ["flex-shrink-0"],
            [["px-2"], ["py-1"]],
            ["bg-blue-400", "hover:bg-blue-500"],
            ["rounded"],
            ["cursor-pointer"]
          )}
          tabIndex={0}
          aria-checked={edit}
          onClick={() => setEdit((prev) => !prev)}
        >
          <PencilSquareIcon
            className={clsx(
              ["w-4"],
              ["h-4"],
              ["text-blue-50", "group-hover/toggle:text-blue-100"]
            )}
          />
        </div>
      </div>
      <div className={clsx(["mt-2"], ["flex", "flex-col", "items-start"])}>
        <TagsList
          className={clsx(["mt-1"], ["w-full"])}
          edit={edit}
          fragment={tagslist}
        />
      </div>
    </section>
  );
};
