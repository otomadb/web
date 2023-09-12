import { Meta, StoryObj } from "@storybook/react";
import { graphql as mswGql } from "msw";

import { mockTagSearcher } from "~/components/TagSearcher/index.mocks";
import { makeFragmentData } from "~/gql";
import { MockedAuth0Provider } from "~/utils/MockedAuth0Provider";
import { MockedUrqlProvider } from "~/utils/MockedUrqlProvider";

import { commonMock as mockAddTagFormSelectedTag } from "./AddTagForm/SelectedTag";
import { mockSuccessful } from "./AddTagForm/useRegister";
import { Query as FormQuery, RegisterTagForm } from "./Form";
import { Fragment as SemitagsFragment } from "./Semitags";

const commonMocks = [
  mockAddTagFormSelectedTag,
  mockSuccessful,
  mockTagSearcher,
];

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
        ...commonMocks,
        mswGql.query(FormQuery, (req, res, ctx) =>
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
        ...commonMocks,
        mswGql.query(FormQuery, (req, res, ctx) => res(ctx.delay("infinite"))),
      ],
    },
  },
};
