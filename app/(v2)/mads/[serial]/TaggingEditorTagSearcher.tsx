"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useMutation } from "urql";

import TagSearcher from "~/components/TagSearcher";
import useToaster from "~/components/Toaster/useToaster";
import { FragmentType, graphql, useFragment } from "~/gql";

export const FM = graphql(`
  fragment MadPageLayout_TaggingsEditor_TagSearcher on Video {
    id
    allTaggings {
      tag {
        id
      }
    }
  }
`);
const TaggingSearcher = ({
  className,
  fragment,
}: {
  className?: string;
  fragment: FragmentType<typeof FM>;
}) => {
  const { id: madId, allTaggings: taggings } = useFragment(FM, fragment);

  const toast = useToaster();
  const router = useRouter();

  const [, add] = useMutation(
    graphql(`
      mutation MadPageLayout_TaggingsEditor_Add($madId: ID!, $tagId: ID!) {
        addTagToVideo(input: { videoId: $madId, tagId: $tagId }) {
          __typename
        }
      }
    `)
  );
  const [, remove] = useMutation(
    graphql(`
      mutation MadPageLayout_TaggingsEditor_Remove($madId: ID!, $tagId: ID!) {
        removeTagFromVideo(input: { videoId: $madId, tagId: $tagId }) {
          __typename
        }
      }
    `)
  );

  const isSelected = useMemo(
    () => (tagId: string) => !!taggings.some(({ tag }) => tag.id === tagId),
    [taggings]
  );

  return (
    <TagSearcher
      size="small"
      limit={3}
      behavior={{
        mode: "always-selectable",
        isSelected,
        NotSelected: ({ Tag }) => <>{Tag}を追加</>,
        Selected: ({ Tag }) => <>{Tag}を削除</>,
        async handleSelect(tagId, selected) {
          if (selected) {
            const result = await remove({ madId, tagId });
            if (!result.data?.removeTagFromVideo || result.error) {
              return;
            }
            switch (result.data.removeTagFromVideo.__typename) {
              case "RemoveTagFromVideoSucceededPayload":
                router.refresh();
                break;
              default:
                toast("タグの削除に失敗しました", { type: "error" });
                break;
            }
          } else {
            const result = await add({ madId, tagId });
            if (!result.data?.addTagToVideo || result.error) {
              return;
            }
            switch (result.data.addTagToVideo.__typename) {
              case "AddTagToVideoSucceededPayload":
                router.refresh();
                break;
              default:
                toast("タグの追加に失敗しました", { type: "error" });
                break;
            }
          }
        },
      }}
      className={clsx(className)}
    />
  );
};
export default TaggingSearcher;
