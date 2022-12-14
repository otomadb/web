"use client";

import "client-only";

import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { graphql } from "~/gql";
import { PseudoTagType } from "~/gql/graphql";
import { useGraphQLClient } from "~/hooks/useGraphQLClient";

import { HistoryItemType, parsePseudoTagType, TagType } from "./types";

const VideoPageRefreshTagsQueryDocument = graphql(`
  query VideoPageRefreshTags($id: ID!) {
    video(id: $id) {
      id
      tags {
        id
        name
        type: pseudoType
        explicitParent {
          id
          name
        }
      }
    }
  }
`);

const VideoPageRefreshHistoryQueryDocument = graphql(`
  query VideoPageRefreshHistory($id: ID!) {
    video(id: $id) {
      id
      history(input: { order: { createdAt: ASC } }) {
        nodes {
          type: __typename
          id
          createdAt
          user {
            id
            name
            displayName
            icon
          }
          ... on VideoAddTitleHistoryItem {
            title
          }
          ... on VideoDeleteTitleHistoryItem {
            title
          }
          ... on VideoChangePrimaryTitleHistoryItem {
            from
            to
          }
          ... on VideoAddThumbnailHistoryItem {
            thumbnail
          }
          ... on VideoDeleteThumbnailHistoryItem {
            thumbnail
          }
          ... on VideoChangePrimaryThumbnailHistoryItem {
            from
            to
          }
          ... on VideoAddTagHistoryItem {
            tag {
              id
              name
              type: pseudoType
              explicitParent {
                id
                name
              }
            }
          }
          ... on VideoDeleteTagHistoryItem {
            tag {
              id
              name
              type: pseudoType
              explicitParent {
                id
                name
              }
            }
          }
          ... on VideoAddNicovideoVideoSourceHistoryItem {
            source {
              id
            }
          }
        }
      }
    }
  }
`);

/* eslint-disable @typescript-eslint/no-empty-function */
export const UpdateableContext = createContext<{
  tags: TagType[];
  updateTags(): void;
  history: HistoryItemType[];
  updateHistory(): void;
}>({
  tags: [],
  updateTags() {},
  history: [],
  updateHistory() {},
});
/* eslint-enable @typescript-eslint/no-empty-function */

export const UpdateableProvider: React.FC<{
  children: ReactNode;
  videoId: string;
  initHistory: HistoryItemType[];
}> = ({ children, videoId, initHistory }) => {
  const gqlClient = useGraphQLClient();
  const [tags] = useState([]);

  const [history, setHistory] = useState<HistoryItemType[]>(initHistory);
  const { mutate: updateHistory } = useSWR(
    [VideoPageRefreshHistoryQueryDocument, videoId],
    ([doc, vid]) => gqlClient.request(doc, { id: vid }),
    {
      suspense: false,
      onSuccess(data) {
        const {
          video: { history },
        } = data;
        setHistory(
          history.nodes.map((item) => {
            const { id, createdAt } = item;
            const user = {
              id: item.user.id,
              name: item.user.name,
              displayName: item.user.displayName,
              icon: item.user.icon,
            };
            switch (item.type) {
              case "VideoRegisterHistoryItem": {
                return { id, createdAt, user, type: "REGISTER" };
              }
              case "VideoAddTitleHistoryItem": {
                const { title } = item;
                return { id, createdAt, user, type: "ADD_TITLE", title };
              }
              case "VideoDeleteTitleHistoryItem": {
                const { title } = item;
                return { id, createdAt, user, type: "DELETE_TITLE", title };
              }
              case "VideoChangePrimaryTitleHistoryItem": {
                const { from, to } = item;
                return {
                  id,
                  createdAt,
                  user,
                  type: "CHANGE_PRIMARY_TITLE",
                  from: from || null,
                  to,
                };
              }
              case "VideoAddThumbnailHistoryItem": {
                const { thumbnail } = item;
                return {
                  id,
                  createdAt,
                  user,
                  type: "ADD_THUMBNAIL",
                  thumbnail,
                };
              }
              case "VideoDeleteThumbnailHistoryItem": {
                const { thumbnail } = item;
                return {
                  id,
                  createdAt,
                  user,
                  type: "DELETE_THUMBNAIL",
                  thumbnail,
                };
              }
              case "VideoChangePrimaryThumbnailHistoryItem": {
                const { from, to } = item;
                return {
                  id,
                  createdAt,
                  user,
                  type: "CHANGE_PRIMARY_THUMBNAIL",
                  from: from || null,
                  to,
                };
              }
              case "VideoAddTagHistoryItem": {
                const { tag } = item;
                return {
                  id,
                  createdAt,
                  user,
                  type: "ADD_TAG",
                  tag: {
                    id: tag.id,
                    name: tag.name,
                    type: tag.type,
                    explicitParent: tag.explicitParent
                      ? {
                          id: tag.explicitParent.id,
                          name: tag.explicitParent.name,
                        }
                      : null,
                  },
                };
              }
              case "VideoDeleteTagHistoryItem": {
                const { tag } = item;
                return {
                  id,
                  createdAt,
                  user,
                  type: "DELETE_TAG",
                  tag: {
                    id: tag.id,
                    name: tag.name,
                    type: tag.type,
                    explicitParent: tag.explicitParent
                      ? {
                          id: tag.explicitParent.id,
                          name: tag.explicitParent.name,
                        }
                      : null,
                  },
                };
              }
              case "VideoAddNicovideoVideoSourceHistoryItem": {
                return {
                  id,
                  createdAt,
                  user,
                  type: "ADD_NICONICO_SOURCE",
                };
              }
            }
          })
        );
      },
    }
  );

  return (
    <UpdateableContext.Provider
      value={{
        tags,
        history,
        updateTags() {},
        updateHistory() {
          updateHistory();
        },
      }}
    >
      {children}
    </UpdateableContext.Provider>
  );
};

type WholeContextValue = {
  videoId: string;
  tags: TagType[] | null;
  refreshTags(t: WTF): void;
};
export const WholeContext = createContext<WholeContextValue>(
  {} as WholeContextValue
);

type WTF = {
  __typename?: "Tag" | undefined;
  id: string;
  name: string;
  type: PseudoTagType;
  explicitParent?:
    | { __typename?: "Tag" | undefined; id: string; name: string }
    | null
    | undefined;
}[];

export const WholeProvider: React.FC<{
  children: ReactNode;
  videoId: string;
  tags: WTF; // TODO: use Fragment
}> = ({ children, videoId, tags: fallbackTags }) => {
  const gqlClient = useGraphQLClient();
  const { data: rawTags, mutate: refreshTags } = useSWR(
    [VideoPageRefreshTagsQueryDocument, videoId],
    ([doc, vid]) =>
      gqlClient.request(doc, { id: vid }).then((v) => v.video.tags),
    { fallbackData: fallbackTags }
  );

  const tags = useMemo<TagType[] | null>(() => {
    if (!rawTags) return null;
    return rawTags.map(({ id, name, type, explicitParent }) => ({
      id,
      name,
      type: parsePseudoTagType(type),
      explicitParent: explicitParent
        ? { id: explicitParent.id, name: explicitParent.name }
        : null,
    }));
  }, [rawTags]);

  return (
    <WholeContext.Provider value={{ videoId, tags, refreshTags }}>
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
  return tags;
};

export const UntagVideoMutationDocument = graphql(`
  mutation UntagVideo($input: UntagVideoInput!) {
    untagVideo(input: $input) {
      video {
        id
        tags {
          id
          name
          type: pseudoType
          explicitParent {
            id
            name
          }
        }
      }
    }
  }
`);

export const useUntagVideo = (tagId: string) => {
  const { videoId, refreshTags } = useContext(WholeContext);
  const gqlClient = useGraphQLClient();

  const { trigger } = useSWRMutation(
    [UntagVideoMutationDocument, tagId, videoId],
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

const TagVideoMutationDocument = graphql(`
  mutation TagVideo($input: TagVideoInput!) {
    tagVideo(input: $input) {
      video {
        id
        tags {
          id
          name
          type: pseudoType
          explicitParent {
            id
            name
          }
        }
      }
    }
  }
`);
export const useTagVideo = (tagId: string | null) => {
  const { videoId, refreshTags } = useContext(WholeContext);
  const gqlClient = useGraphQLClient();

  const { trigger } = useSWRMutation(
    tagId ? [TagVideoMutationDocument, tagId, videoId] : null,
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
