import { graphql } from "msw";

import { LikeMutation, Query, UndoLikeMutation } from "./LikeButton";

export const mockNotLikedYet = graphql.query(Query, (req, res, ctx) =>
  res(ctx.data({ getVideo: { id: "v1", isLiked: false } }))
);

export const mockLikedAlready = graphql.query(Query, (req, res, ctx) =>
  res(ctx.data({ getVideo: { id: "v1", isLiked: true } }))
);

export const mockLikeSuccessfully = graphql.mutation(
  LikeMutation,
  (req, res, ctx) =>
    res(
      ctx.data({
        likeVideo: {
          __typename: "LikeVideoSucceededPayload",
          registration: {
            id: "r1",
            video: {
              id: req.variables.videoId,
              isLiked: true,
            },
          },
        },
      })
    )
);

export const mockUndoLikeSuccessfully = graphql.mutation(
  UndoLikeMutation,
  (req, res, ctx) =>
    res(
      ctx.data({
        undoLikeVideo: {
          __typename: "UndoLikeVideoSucceededPayload",
          registration: {
            id: "r1",
            video: {
              id: req.variables.videoId,
              isLiked: true,
            },
          },
        },
      })
    )
);
