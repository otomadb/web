"use client";

import { useMemo } from "react";
import { useMutation, useQuery } from "urql";

import { FragmentType, graphql, useFragment } from "~/gql";

const LikeSwitchSkeltonFragment = graphql(`
  fragment LikeSwitchSkelton on Video {
    id
  }
`);
const LikeSwitchSkeltonInnerFragment = graphql(`
  fragment LikeSwitchSkeltonInner on User {
    like(videoId: $videoId) {
      id
    }
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
  const { id: videoId } = useFragment(LikeSwitchSkeltonFragment, fragment);

  const [{ data: currentData }, updateCurrent] = useQuery({
    query: graphql(`
      query LikeSwitchSkeltonCurrent($videoId: ID!) {
        viewer {
          ...LikeSwitchSkeltonInner
          id
        }
      }
    `),
    variables: { videoId },
    requestPolicy: "cache-first",
  });
  const innerFragment = useFragment(
    LikeSwitchSkeltonInnerFragment,
    currentData?.viewer
  );
  const currentStatus = useMemo<boolean | undefined>(() => {
    if (!innerFragment) return undefined;
    return !!innerFragment.like;
  }, [innerFragment]);

  const [, mutateLike] = useMutation(
    graphql(`
      mutation LikeSwitchSkelton_mutateLike($videoId: ID!) {
        likeVideo(input: { videoId: $videoId }) {
          __typename
          ... on LikeVideoSucceededPayload {
            user {
              ...LikeSwitchSkeltonInner
            }
          }
        }
      }
    `)
  );
  const [, mutateUnlike] = useMutation(
    graphql(`
      mutation LikeSwitchSkelton_mutateUnlike($videoId: ID!) {
        undoLikeVideo(input: { videoId: $videoId }) {
          __typename
          ... on UndoLikeVideoSucceededPayload {
            user {
              ...LikeSwitchSkeltonInner
            }
          }
        }
      }
    `)
  );

  return (
    <Presentation
      {...props}
      current={currentStatus}
      like={() => {
        mutateLike({ videoId }).then((result) => {
          switch (result.data?.likeVideo.__typename) {
            case "LikeVideoSucceededPayload":
              updateCurrent({ requestPolicy: "cache-and-network" });
              break;
            default:
              break;
          }
        });
      }}
      unlike={() =>
        mutateUnlike({ videoId }).then((result) => {
          switch (result.data?.undoLikeVideo.__typename) {
            case "UndoLikeVideoSucceededPayload":
              updateCurrent({ requestPolicy: "cache-and-network" });
              break;
            default:
              break;
          }
        })
      }
    />
  );
};
export default LikeSwitchSkelton;
