import { graphql } from "msw";

import { makeFragmentData } from "~/gql";

import { Fragment as SucceededToastFragment } from "./SucceededToast";
import { Mutation } from "./useRequestFromYoutube";

export const mockVideoAlreadyRegistered = graphql.mutation(
  Mutation,
  (req, res, ctx) =>
    res(
      ctx.data({
        requestYoutubeRegistration: {
          __typename: "RequestYoutubeRegistrationVideoAlreadyRegisteredError",
          source: {
            id: "s1",
            sourceId: "sm2057168",
            video: {
              id: "v1",
            },
          },
        },
      })
    )
);

export const mockRegisterSuccessfully = graphql.mutation(
  Mutation,
  (req, res, ctx) =>
    res(
      ctx.data({
        requestYoutubeRegistration: {
          __typename: "RequestYoutubeRegistrationSucceededPayload",
          ...makeFragmentData(
            {
              request: {
                id: "r1",
                sourceId: "sm2057168",
              },
            },
            SucceededToastFragment
          ),
        },
      })
    )
);
