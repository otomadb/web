"use client";

import "client-only";

import clsx from "clsx";
import React, { useCallback, useState } from "react";
import { useMutation } from "urql";

import { graphql } from "~/gql";
import {
  VideoPage_TagVideoDocument,
  VideoPage_VideoTagsFragment,
} from "~/gql/graphql";
import { useViewer } from "~/hooks/useViewer";

import { EditToggle } from "./EditToggle";
import { TagsList } from "./List";
import { TagAdder } from "./TagAdder";

graphql(`
  mutation VideoPage_TagVideo($input: TagVideoInput!) {
    tagVideo(input: $input) {
      video {
        id
        ...VideoPage_VideoTags
        ...VideoPage_VideoHistory
        ...VideoPage_VideoSimilarVideos
      }
    }
  }
`);

export const SectionInner: React.FC<{
  className?: string;
  videoId: string;
  tags: VideoPage_VideoTagsFragment;
}> = ({ className, videoId, tags }) => {
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
    <div className={clsx(className, ["mt-2"])}>
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
        tags={tags}
      />
    </div>
  );
};
