import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { graphql as mockGql } from "msw";

import { CommonTagFragment } from "~/components/CommonTag";
import { makeFragmentData } from "~/gql";

import { RegisterTagForm } from "../Form";
import { Query, SelectedTag } from "./SelectedTag";

const meta = {
  component: RegisterTagForm,
  args: {
    style: {
      width: 360,
    },
    tagId: "id:tag1",
    remove: action("remove"),
  },
} as Meta<typeof SelectedTag>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  parameters: {
    msw: {
      handlers: [
        mockGql.query(Query, (req, res, ctx) =>
          res(
            ctx.data({
              getTag: {
                id: "id:tag1",
                ...makeFragmentData(
                  {
                    name: "Tag 1",
                    belongTo: { keyword: "character" },
                    explicitParent: {
                      id: "id:tag2",
                      name: "Tag 2",
                    },
                  },
                  CommonTagFragment
                ),
              },
            })
          )
        ),
      ],
    },
  },
};

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        mockGql.query(Query, (req, res, ctx) => res(ctx.delay("infinite"))),
      ],
    },
  },
};
