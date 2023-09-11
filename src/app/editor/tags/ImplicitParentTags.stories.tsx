import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { graphql as mockGql } from "msw";

import { Fragment as CommonTagFragment } from "~/components/CommonTag";
import { mockTagSearcher } from "~/components/TagSearcher/index.mocks";
import { makeFragmentData } from "~/gql";
import { TagType } from "~/gql/graphql";
import { MockUrqlProvider } from "~/utils/MockUrqlProvider";

import { RegisterTagForm } from "./Form";
import { ImplictParentTags } from "./ImplicitParentTags";
import { query } from "./SelectedTag";

const meta = {
  component: RegisterTagForm,
  args: {
    style: {
      width: 360,
    },
    implicitParents: [],
    append: action("append"),
    remove: action("remove"),
  },
  render(args) {
    return (
      <MockUrqlProvider>
        <ImplictParentTags {...args} />
      </MockUrqlProvider>
    );
  },
} as Meta<typeof ImplictParentTags>;
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
    implicitParents: [
      {
        id: "1",
        tagId: "id:tag1",
      },
      {
        id: "2",
        tagId: "id:tag2",
      },
    ],
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
