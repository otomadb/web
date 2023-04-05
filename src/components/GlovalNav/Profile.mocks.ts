import { ResultOf } from "@graphql-typed-document-node/core";
import { graphql } from "msw";

import { Fragment as UserIconFragment } from "~/components/common/UserIcon";
import { makeFragmentData } from "~/gql";

import { Fragment as AccordionFragment } from "./Accordion";
import { Fragment, Query } from "./Profile";

export const mockSuccessfulQuery = graphql.query(Query, (req, res, ctx) => {
  return res(
    ctx.data({
      whoami: {
        id: "1",
        ...makeFragmentData(
          {
            ...makeFragmentData(
              {
                name: "user1",
                displayName: "User 1",
                icon: "/512x512.png",
              },
              UserIconFragment
            ),
            ...makeFragmentData(
              {
                name: "user1",
                isEditor: false,
                isAdministrator: false,
              },
              AccordionFragment
            ),
          } as ResultOf<typeof Fragment>,
          Fragment
        ),
      },
    })
  );
});

export const mockUnauthorizedQuery = graphql.query(Query, (req, res, ctx) => {
  return res(ctx.errors([{ message: "Unauthorized" }]));
});

export const mockLoadingQuery = graphql.query(Query, async (req, res, ctx) => {
  return res(ctx.delay("infinite"));
});
