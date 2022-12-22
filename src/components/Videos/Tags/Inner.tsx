"use client";

import "client-only";

import clsx from "clsx";
import React, { useCallback, useState } from "react";
import { useMutation } from "urql";

import { getFragment, graphql } from "~/gql";
import {
  VideoPage_TagsFragment,
  VideoPage_TagsListFragmentDoc,
  VideoPage_TagVideoDocument,
} from "~/gql/graphql";
import { useViewer } from "~/hooks/useViewer";

import { EditToggle } from "./EditToggle";
import { TagsList } from "./List";
import { TagAdder } from "./TagAdder";

graphql(`
  fragment VideoPage_Tags on Video {
    id
    ...VideoPage_TagsList
  }

  mutation VideoPage_TagVideo($input: TagVideoInput!) {
    tagVideo(input: $input) {
      video {
        id
        ...VideoPage_Tags
        ...VideoPage_SimilarVideos
        ...VideoPage_History
      }
    }
  }
`);

export const Inner: React.FC<{
  className?: string;
  videoId: string;
  tags: VideoPage_TagsFragment;
}> = ({ className, videoId, tags }) => {
  const isLoggedIn = useViewer();
  const [edit, setEdit] = useState(false);

  const taglist = getFragment(VideoPage_TagsListFragmentDoc, tags);

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
