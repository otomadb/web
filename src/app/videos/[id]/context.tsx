"use client";

import "client-only";

import React, { createContext, ReactNode, useContext } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { getFragment, graphql } from "~/gql";
import {
  TagVideoDocument,
  UntagVideoDocument,
  VideoPage_HistoryItemFragmentDoc,
  VideoPage_RefreshHistoryDocument,
  VideoPage_RefreshTagsDocument,
  VideoPage_TagFragmentDoc,
  VideoPage_VideoHistoryFragment,
  VideoPage_VideoHistoryFragmentDoc,
  VideoPage_VideoTagsFragment,
  VideoPage_VideoTagsFragmentDoc,
} from "~/gql/graphql";
import { useGraphQLClient } from "~/hooks/useGraphQLClient";

graphql(`
  query VideoPage_RefreshTags($id: ID!) {
    video(id: $id) {
      ...VideoPage_VideoTags
    }
  }

  query VideoPage_RefreshHistory($id: ID!) {
    video(id: $id) {
      id
      ...VideoPage_VideoHistory
    }
  }
`);

type WholeContextValue = {
  videoId: string;

  tags: VideoPage_VideoTagsFragment["tags"] | undefined;
  history: VideoPage_VideoHistoryFragment["history"] | undefined;

  refreshTags(t: VideoPage_VideoTagsFragment["tags"]): void;
  refreshHistory(t: VideoPage_VideoHistoryFragment["history"]): void;
};
export const WholeContext = createContext<WholeContextValue>(
  {} as WholeContextValue
);
export const WholeProvider: React.FC<{
  children: ReactNode;
  videoId: string;
  tags: WholeContextValue["tags"];
  history: WholeContextValue["history"];
}> = ({ children, videoId, tags: fallbackTags, history: fallbackHistory }) => {
  const gqlClient = useGraphQLClient();
  const { data: tags, mutate: refreshTags } = useSWR(
    [VideoPage_RefreshTagsDocument, videoId],
    ([doc, vid]) =>
      gqlClient
        .request(doc, { id: vid })
        .then((v) => getFragment(VideoPage_VideoTagsFragmentDoc, v.video).tags),
    { fallbackData: fallbackTags }
  );
  const { data: history, mutate: refreshHistory } = useSWR(
    [VideoPage_RefreshHistoryDocument, videoId],
    ([doc, vid]) =>
      gqlClient
        .request(doc, { id: vid })
        .then(
          (v) => getFragment(VideoPage_VideoHistoryFragmentDoc, v.video).history
        ),
    { fallbackData: fallbackHistory }
  );

  return (
    <WholeContext.Provider
      value={{
        videoId,
        tags,
        refreshTags,
        history,
        refreshHistory,
      }}
    >
      {children}
    </WholeContext.Provider>
  );
};

/**
 * @returns video id in the form `video:foobar`
 */
export const useVideoId = () => {
  const { videoId } = useContext(WholeContext);
  return videoId;
};

export const useTags = () => {
  const { tags } = useContext(WholeContext);
  return tags?.map((tag) => getFragment(VideoPage_TagFragmentDoc, tag));
};

export const useHistory = () => {
  const { history } = useContext(WholeContext);
  return history?.nodes.map((node) =>
    getFragment(VideoPage_HistoryItemFragmentDoc, node)
  );
};

graphql(`
  mutation UntagVideo($input: UntagVideoInput!) {
    untagVideo(input: $input) {
      video {
        id
        tags {
          ...VideoPage_Tag
        }
      }
    }
  }
`);
export const useUntagVideo = (tagId: string) => {
  const { videoId, refreshTags } = useContext(WholeContext);
  const gqlClient = useGraphQLClient();

  const { trigger } = useSWRMutation(
    [UntagVideoDocument, tagId, videoId],
    ([doc, tagId, videoId]) =>
      gqlClient.request(doc, { input: { tagId, videoId } }),
    {
      onSuccess(data) {
        refreshTags(data.untagVideo.video.tags);
      },
    }
  );

  return trigger;
};

graphql(`
  mutation TagVideo($input: TagVideoInput!) {
    tagVideo(input: $input) {
      video {
        id
        tags {
          ...VideoPage_Tag
        }
      }
    }
  }
`);
export const useTagVideo = (tagId: string | null) => {
  const { videoId, refreshTags } = useContext(WholeContext);
  const gqlClient = useGraphQLClient();

  const { trigger } = useSWRMutation(
    tagId ? [TagVideoDocument, tagId, videoId] : null,
    ([doc, tagId, videoId]) =>
      gqlClient.request(doc, { input: { tagId, videoId } }),
    {
      onSuccess(data) {
        refreshTags(data.tagVideo.video.tags);
      },
    }
  );

  return trigger;
};
