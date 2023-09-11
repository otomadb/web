import { Meta, StoryObj } from "@storybook/react";
import { graphql as mswGraphQL } from "msw";

import { Fragment as CommonTagFragment } from "~/components/CommonTag";
import { mockTagSearcher } from "~/components/TagSearcher/index.mocks";
import { makeFragmentData } from "~/gql";
import { TagType } from "~/gql/graphql";
import { MockedAuth0Provider } from "~/utils/MockedAuth0Provider";
import { MockedUrqlProvider } from "~/utils/MockedUrqlProvider";

import { Query as FormQuery, RegisterTagForm } from "./Form";
import { Query as SelectedTagQuery } from "./SelectedTag";
import { Fragment as SemitagsFragment } from "./Semitags";
import { mockSuccessful } from "./useRegister";

const mockSelectedTagQuery = mswGraphQL.query(
  SelectedTagQuery,
  (req, res, ctx) =>
    res(
      ctx.data({
        getTag: {
          id: req.variables.id,
          ...makeFragmentData(
            {
              name: `Tag ${req.variables.id.split(":")[1]}`,
              type: TagType.Unknown,
              explicitParent: null,
            },
            CommonTagFragment
          ),
        },
      })
    )
);
const meta = {
  component: RegisterTagForm,
  args: {
    style: {
      width: 1536,
      height: 860,
    },
  },
  render(args) {
    return (
      <MockedAuth0Provider>
        <MockedUrqlProvider>
          <RegisterTagForm {...args} />
        </MockedUrqlProvider>
      </MockedAuth0Provider>
    );
  },
  parameters: {
    msw: {
      handlers: [
        mswGraphQL.query(FormQuery, (req, res, ctx) =>
          res(
            ctx.data({
              ...makeFragmentData(
                {
                  findSemitags: {
                    nodes: [...new Array(30)].map((_, i) => {
                      const id = `semitag:${i + 1}`;
                      return {
                        id,
                        name: `Semitag ${i + 1}`,
                        video: {
                          id: `video:1`,
                          title: `Video 1`,
                        },
                      };
                    }),
                  },
                },
                SemitagsFragment
              ),
            })
          )
        ),
        mockSelectedTagQuery,
        mockSuccessful,
        mockTagSearcher,
      ],
    },
  },
} as Meta<typeof RegisterTagForm>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export const Loading: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: [
        mswGraphQL.query(FormQuery, (req, res, ctx) =>
          res(ctx.delay("infinite"))
        ),
        mockSelectedTagQuery,
        mockSuccessful,
        mockTagSearcher,
      ],
    },
  },
};
