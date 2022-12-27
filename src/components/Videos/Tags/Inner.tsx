"use client";

import "client-only";

import clsx from "clsx";
import React, { useCallback, useMemo, useState } from "react";
import { useMutation, useQuery } from "urql";

import { getFragment as useFragment, graphql } from "~/gql";
import {
  VideoPage_TagsListFragmentDoc,
  VideoPage_TagsSectionFragment,
  VideoPage_TagsSectionFragmentDoc,
  VideoPage_TagVideoDocument,
  VideoPage_UpstreamTagsSectionDocument,
} from "~/gql/graphql";
import { useViewer } from "~/hooks/useViewer";

import { EditToggle } from "./EditToggle";
import { TagsList } from "./List";
import { TagAdder } from "./TagAdder";

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

  mutation VideoPage_TagVideo($input: AddTagToVideoInput!) {
    addTagToVideo(input: $input) {
      video {
        id
        ...VideoPage_TagsSection
        ...VideoPage_SimilarVideos
        ...VideoPage_History
      }
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
  const taglist = useFragment(VideoPage_TagsListFragmentDoc, video);

  const isLoggedIn = useViewer();
  const [edit, setEdit] = useState(false);

  const [, triggerTagVideo] = useMutation(VideoPage_TagVideoDocument);
  const handleTagVideo = useCallback(
    (tagId: string) => {
      triggerTagVideo({ input: { tagId, videoId } });
    },
    [triggerTagVideo, videoId]
  );

  return (
    <section className={clsx(className)}>
      <h2 className={clsx(["text-xl"], ["text-slate-900"])}>タグ</h2>
      <div className={clsx(["mt-2"])}>
        <div
          className={clsx([
            "flex",
            ["flex-col"],
            ["lg:flex-row", "lg:items-center", "lg:gap-x-2"],
          ])}
        >
          <EditToggle
            className={clsx(["flex-shrink-0"])}
            edit={edit}
            toggleEdit={(v) => setEdit(v)}
          />
          <TagAdder
            className={clsx(["flex-grow"])}
            videoId={videoId}
            disabled={!isLoggedIn || !edit}
            handleSelect={handleTagVideo}
          />
        </div>
        <TagsList
          className={clsx(["mt-1"])}
          edit={edit}
          videoId={videoId}
          tags={taglist}
        />
      </div>
    </section>
  );
};
