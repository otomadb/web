"use client";

import "client-only";

import clsx from "clsx";
import React, { useMemo, useState } from "react";
import { useQuery } from "urql";

import { TagSearcher } from "~/components/common/TagSearcher";
import { ToggleSwitch } from "~/components/common/ToggleSwitch";
import { getFragment as useFragment, graphql } from "~/gql";
import {
  VideoPage_TagsListFragmentDoc,
  VideoPage_TagsSectionFragment,
  VideoPage_TagsSectionFragmentDoc,
  VideoPage_UpstreamTagsSectionDocument,
} from "~/gql/graphql";
import { useIsLogin } from "~/hooks/useIsLogin";

import { AddTagForm } from "./TagAddForm";
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

export const TagsSection: React.FC<{
  className?: string;
  fallback: VideoPage_TagsSectionFragment;
}> = ({ className, fallback }) => {
  const [{ data }] = useQuery({
    query: VideoPage_UpstreamTagsSectionDocument,
    variables: { id: fallback.id },
  });
  const upstream = useFragment(VideoPage_TagsSectionFragmentDoc, data?.video);

  const video = useMemo(() => upstream || fallback, [fallback, upstream]);

  const tagslist = useFragment(VideoPage_TagsListFragmentDoc, video);

  const islogin = useIsLogin();
  const [edit, setEdit] = useState(false);
  const [addTagId, setAddTagId] = useState<string | undefined>(undefined);

  return (
    <section className={clsx(className)}>
      <div className={clsx(["flex"], ["items-center"])}>
        <h2 className={clsx(["flex-grow"], ["text-xl"], ["text-slate-900"])}>
          タグ
        </h2>
        {islogin && (
          <ToggleSwitch
            className={clsx(["flex-shrink-0"])}
            handleToggle={(v) => setEdit(v)}
          />
        )}
      </div>
      <div className={clsx(["mt-2"], ["flex", "flex-col", "items-start"])}>
        <TagsList
          className={clsx(["mt-1"], ["w-full"])}
          edit={edit}
          fragment={tagslist}
        />
      </div>
      {edit && (
        <div className={clsx(["mt-2"], ["flex"], ["relative"])}>
          <TagSearcher
            className={clsx(["w-full"])}
            handleSelect={(id) => setAddTagId(id)}
          />
          {addTagId && (
            <div className={clsx(["absolute", "left-full"], ["z-infinity"])}>
              <div
                className={clsx(["fixed", "inset-0"], ["z-0"], ["bg-black/25"])}
                onClick={() => setAddTagId(undefined)}
              />
              <AddTagForm
                className={clsx(
                  ["absolute", "left-0", "top-0"],
                  ["ml-2"],
                  ["z-1"],
                  ["w-96"]
                )}
                videoId={video.id}
                tagId={addTagId}
                clear={() => {
                  setAddTagId(undefined);
                }}
              />
            </div>
          )}
        </div>
      )}
    </section>
  );
};
