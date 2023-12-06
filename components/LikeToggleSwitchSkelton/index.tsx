"use client";

import { useState } from "react";
import { useMutation } from "urql";

import { FragmentType, graphql, useFragment } from "~/gql";

const LikeSwitchSkeltonFragment = graphql(`
  fragment LikeSwitchSkelton on Video {
    id
    isLiked
  }
`);
export type PassThroughProps = {
  className?: string;
  style?: React.CSSProperties;
};
export type LikeButtonPresentation = React.FC<
  PassThroughProps & {
    current: boolean | undefined;
    like(): void;
    unlike(): void;
  }
>;
export const LikeSwitchSkelton: React.FC<
  PassThroughProps & {
    fragment: FragmentType<typeof LikeSwitchSkeltonFragment>;
    Presentation: LikeButtonPresentation;
  }
> = ({ fragment, Presentation, ...props }) => {
  const { id: videoId, isLiked: isLikedInit } = useFragment(
    LikeSwitchSkeltonFragment,
    fragment
  );
  const [isLiked, setIsLiked] = useState(isLikedInit);

  const [, mutateLike] = useMutation(
    graphql(`
      mutation LikeSwitchSkelton_mutateLike($videoId: ID!) {
        likeVideo(input: { videoId: $videoId }) {
          __typename
        }
      }
    `)
  );
  const [, mutateUnlike] = useMutation(
    graphql(`
      mutation LikeSwitchSkelton_mutateUnlike($videoId: ID!) {
        undoLikeVideo(input: { videoId: $videoId }) {
          __typename
        }
      }
    `)
  );

  return (
    <Presentation
      {...props}
      current={typeof isLiked !== "boolean" ? undefined : isLiked}
      like={() => {
        if (typeof isLiked !== "boolean") return;

        setIsLiked(true);
        mutateLike({ videoId }).then((result) => {
          switch (result.data?.likeVideo.__typename) {
            case "LikeVideoSucceededPayload":
              setIsLiked(true);
              break;
            default:
              setIsLiked(false);
              break;
          }
        });
      }}
      unlike={() => {
        if (typeof isLiked !== "boolean") return;

        setIsLiked(false);
        mutateUnlike({ videoId }).then((result) => {
          switch (result.data?.undoLikeVideo.__typename) {
            case "UndoLikeVideoSucceededPayload":
              setIsLiked(false);
              break;
            default:
              setIsLiked(true);
              break;
          }
        });
      }}
    />
  );
};
export default LikeSwitchSkelton;
