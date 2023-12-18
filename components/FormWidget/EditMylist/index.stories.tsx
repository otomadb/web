import { Meta, StoryObj } from "@storybook/react";
import { graphql as mockGql } from "msw";

import { makeFragmentData } from "~/gql";

import EditMylist, { EditMylistFragment } from ".";
import {
  EditMylistUpdateSlugFragment,
  MutationUpdateSlug,
} from "./UpdateSlugForm";
import {
  EditMylistUpdateTitleFragment,
  MutationUpdateTitle,
} from "./UpdateTitleForm";

export const mockUpdateTitleSuccessful = mockGql.mutation(
  MutationUpdateTitle,
  (req, res, ctx) =>
    res(
      ctx.data({
        updateMylistTitle: {
          __typename: "UpdateMylistTitleSucceededPayload",
          mylist: {
            id: `mylist:${req.variables.newTitle}`,
            ...makeFragmentData(
              {
                id: req.variables.mylistId,
                slug: req.variables.newTitle,
                title: "Test 1",
              } as any,
              EditMylistFragment
            ),
          },
        },
      })
    )
);

export const mockUpdateSlugSuccessful = mockGql.mutation(
  MutationUpdateSlug,
  (req, res, ctx) =>
    res(
      ctx.data({
        updateMylistSlug: {
          __typename: "UpdateMylistSlugSucceededPayload",
          mylist: {
            id: `mylist:${req.variables.newSlug}`,
            ...makeFragmentData(
              {
                id: req.variables.mylistId,
                slug: req.variables.newSlug,
                title: "Test 1",
              } as any,
              EditMylistFragment
            ),
          },
        },
      })
    )
);

const meta = {
  excludeStories: /^mock/,
  component: EditMylist,
  args: {
    style: {
      width: 640,
      height: 360,
    },
    fragment: makeFragmentData(
      {
        ...makeFragmentData(
          { id: "mylist:1", slug: "mylist1" },
          EditMylistUpdateSlugFragment
        ),
        ...makeFragmentData(
          { id: "mylist:1", title: "Mylist 1" },
          EditMylistUpdateTitleFragment
        ),
      } as any,
      EditMylistFragment
    ),
  },
  parameters: {
    msw: {
      handlers: {
        primary: [mockUpdateTitleSuccessful, mockUpdateSlugSuccessful],
      },
    },
  },
} as Meta<typeof EditMylist>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
