import { graphql } from "msw";

import { Fragment as CommonTagFragment } from "~/components/CommonTag";
import { makeFragmentData } from "~/gql";
import { TagType } from "~/gql/graphql";

import { Fragment, Query as TagButtonQuery } from "./TagButton";

export const mockTagButton = graphql.query(TagButtonQuery, (req, res, ctx) => {
  return res(
    ctx.data({
      getTag: {
        id: req.variables.id,
        ...makeFragmentData(
          {
            id: req.variables.id,
            ...makeFragmentData(
              {
                name: req.variables.id,
                type: TagType.Character,
                explicitParent: {
                  id: `${req.variables.id}-p`,
                  name: `${req.variables.id}-p`,
                },
              },
              CommonTagFragment
            ),
          },
          Fragment
        ),
      },
    })
  );
});
