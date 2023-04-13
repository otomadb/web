import { ResultOf } from "@graphql-typed-document-node/core";
import { graphql } from "msw";

import { Fragment as UserIconFragment } from "~/components/UserIcon";
import { makeFragmentData } from "~/gql";

import { Query } from ".";
import { Fragment as AccordionFragment } from "./ProfileAccordion";
import { Fragment } from "./ProfileIndicator";

export const mockSuccessfulQuery = graphql.query(Query, (req, res, ctx) => {
  return res(
    ctx.data({
      whoami: {
        id: "1",
        name: "user1",
        displayName: "User 1",
        icon: "/512x512.png",
        isEditor: false,
        isAdministrator: false,
      },
      notifications: {
        totalCount: 9,
      },
    } as ResultOf<typeof Query>)
  );
});

export const mockUnauthorizedQuery = graphql.query(Query, (req, res, ctx) => {
  return res(ctx.errors([{ message: "Unauthorized" }]));
});

export const mockLoadingQuery = graphql.query(Query, async (req, res, ctx) => {
  return res(ctx.delay("infinite"));
});
