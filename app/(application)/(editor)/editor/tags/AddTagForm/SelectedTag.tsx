"use client";
import clsx from "clsx";
import { graphql as mswGql } from "msw";
import React from "react";
import { useQuery } from "urql";

import Button from "~/components/Button";
import CommonTag from "~/components/CommonTag";
import { CommonTagFragment } from "~/components/CommonTag";
import { graphql, makeFragmentData } from "~/gql";
import { TagType } from "~/gql/graphql";

export const Query = graphql(`
  query RegisterTagPage_SelectedTag($id: ID!) {
    getTag(id: $id) {
      id
      ...CommonTag
    }
  }
`);
export const SelectedTag: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  tagId: string;
  remove(): void;
}> = ({ className, style, tagId, remove }) => {
  const [{ data }] = useQuery({ query: Query, variables: { id: tagId } });
  return (
    <div className={clsx(className, ["flex", "gap-x-2"])} style={style}>
      <div className={clsx(["grow"])}>
        {data && <CommonTag size="small" fragment={data.getTag} />}
      </div>
      <Button
        className={clsx(["shrink-0"])}
        onClick={() => remove()}
        icon="x"
        size="small"
        color="red"
      />
    </div>
  );
};

export const commonMock = mswGql.query(Query, (req, res, ctx) =>
  res(
    ctx.data({
      getTag: {
        id: req.variables.id,
        ...makeFragmentData(
          {
            name: `Tag ${req.variables.id.split(":")[1]}`,
            type: TagType.Character,
            explicitParent: null,
          },
          CommonTagFragment
        ),
      },
    })
  )
);