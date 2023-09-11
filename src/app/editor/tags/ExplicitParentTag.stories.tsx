import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { graphql as mockGql } from "msw";

import { Fragment as CommonTagFragment } from "~/components/CommonTag";
import { mockTagSearcher } from "~/components/TagSearcher/index.mocks";
import { makeFragmentData } from "~/gql";
import { TagType } from "~/gql/graphql";
import { MockUrqlProvider } from "~/utils/MockUrqlProvider";

import { ExplicitParentTag } from "./ExplicitParentTag";
import { RegisterTagForm } from "./Form";
import { query } from "./SelectedTag";

const meta = {
  component: RegisterTagForm,
  args: {
    style: {
      width: 360,
    },
    implicitParentTagIds: [],
    removeSelected: action("removeSelected"),
    set: action("set"),
  },
  render(args) {
    return (
      <MockUrqlProvider>
        <ExplicitParentTag {...args} />
      </MockUrqlProvider>
    );
  },
} as Meta<typeof ExplicitParentTag>;
export default meta;

type Story = StoryObj<typeof meta>;

export const 検索ボックスに入力: Story = {
  args: {
    explicitParentTagId: "id:tag1",
  },
  parameters: {
    msw: {
      handlers: [mockTagSearcher],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole("textbox"), "Test");
  },
};

export const タグを選択済み: Story = {
  args: {
    explicitParentTagId: "id:tag1",
  },
  parameters: {
    msw: {
      handlers: [
        mockGql.query(query, (req, res, ctx) =>
          res(
            ctx.data({
              getTag: {
                id: req.variables.id,
                ...makeFragmentData(
                  {
                    name: "Tag 1",
                    type: TagType.Character,
                    explicitParent: null,
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
