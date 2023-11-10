"use client";

import "client-only";

import { useAuth0 } from "@auth0/auth0-react";
import clsx from "clsx";
import { useCallback } from "react";
import { useMutation, useQuery } from "urql";

import CommonTag from "~/components/CommonTag";
import { TagSearcher } from "~/components/TagSearcher";
import { FragmentType, graphql, useFragment } from "~/gql";

export const TagsListFragment = graphql(`
  fragment MadPage_TagEditor_TagsList on Video {
    taggings {
      nodes {
        id
        tag {
          id
          ...CommonTag
        }
      }
    }
  }
`);
const TagList: React.FC<{
  className?: string;
  fragment: FragmentType<typeof TagsListFragment>;
}> = ({ className, ...props }) => {
  const { taggings } = useFragment(TagsListFragment, props.fragment);

  return (
    <div className={clsx(className, ["flex", ["gap-x-1", "gap-y-1"]])}>
      {taggings.nodes.map((tagging) => (
        <div key={tagging.id}>
          <CommonTag size="small" fragment={tagging.tag} />
        </div>
      ))}
    </div>
  );
};

export const Query = graphql(`
  query MadPage_TagEditor($madId: ID!) {
    getVideo(id: $madId) {
      id
      ...MadPage_TagEditor_TagsList
      semitags {
        id
        name
      }
    }
  }
`);

export const Mutation = graphql(`
  mutation MadPage_TagEditor_AddTag($madId: ID!, $tagId: ID!) {
    addTagToVideo(input: { videoId: $madId, tagId: $tagId }) {
      __typename
      ... on AddTagToVideoSucceededPayload {
        tag {
          id
        }
        video {
          id
          ...MadPage_TagEditor_TagsList
        }
      }
    }
  }
`);

export default function TagEditor({
  className,
  madId,
}: {
  className?: string;
  madId: string;
  close(): void;
}) {
  const { getAccessTokenSilently } = useAuth0();
  const [{ data }, reload] = useQuery({
    query: Query,
    variables: {
      madId,
    },
  });

  const [, mutateAddTag] = useMutation(Mutation);

  const addTag = useCallback(
    async (tagId: string) => {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: { scope: "create:tagging" },
      });

      const { data, error } = await mutateAddTag(
        { madId, tagId },
        {
          fetchOptions: { headers: { authorization: `Bearer ${accessToken}` } },
        }
      );
      if (error || !data) return;

      switch (data.addTagToVideo.__typename) {
        case "AddTagToVideoFailedPayload":
          break;
        case "AddTagToVideoSucceededPayload":
          reload();
          break;
      }
    },
    [getAccessTokenSilently, madId, mutateAddTag, reload]
  );

  return (
    <div
      className={clsx(
        className,
        ["px-4", "py-4"],
        ["bg-white/75", "backdrop-blur-md"],
        ["border", "rounded-md"]
      )}
    >
      <div className={clsx(["text-lg", "text-slate-900"], ["mb-2"])}>
        タグの編集
      </div>
      {data && (
        <div>
          <TagList fragment={data.getVideo} />
        </div>
      )}
      <TagSearcher
        handleSelect={(tagId) => addTag(tagId)}
        className={clsx(["mt-4"])}
      />
    </div>
  );
}
