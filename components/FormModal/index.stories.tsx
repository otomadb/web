import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { graphql as mswGql } from "msw";
import { ComponentProps } from "react";

import { Fragment as CommonTagFragment } from "~/components/CommonTag";
import { Query as TagSearcherQuery } from "~/components/TagSearcher2";
import { Fragment as TagSearcherSuggestItemFragment } from "~/components/TagSearcher2/SuggestItem";
import { Fragment as TagSearcherSuggestsFragment } from "~/components/TagSearcher2/Suggests";
import { makeFragmentData } from "~/gql";
import { TagType } from "~/gql/graphql";
import { MockedUrqlProvider } from "~/utils/MockedUrqlProvider";

import FormModal, { Current, FormModalContext } from ".";
import {
  mocksRegisterFromNicovideo,
  mocksRegisterFromYoutube,
  mocksRequestFromNicovideo,
} from "./mocks";

const meta = {
  component: FormModal,
  render: ({ current, ...args }) => (
    <MockedUrqlProvider>
      <FormModalContext.Provider
        value={{
          current,
          open: action("open"),
          close: action("close"),
        }}
      >
        <FormModal {...args} />
      </FormModalContext.Provider>
    </MockedUrqlProvider>
  ),
  parameters: {
    msw: {
      handlers: {
        unconcern: [
          mswGql.query(TagSearcherQuery, (req, res, ctx) =>
            res(
              ctx.data({
                searchTags: {
                  ...makeFragmentData(
                    {
                      items: [...new Array(5)].map((_, i) => ({
                        ...makeFragmentData(
                          {
                            name: {
                              id: `tagname:${i + 1}`,
                              primary: true,
                              name: `Tag ${i + 1}`,
                            },
                            tag: {
                              id: `tag:${i + 1}`,
                              ...makeFragmentData(
                                {
                                  name: `Tag ${i + 1}`,
                                  type: TagType.Character,
                                  explicitParent: {
                                    id: "tag:0",
                                    name: "Tag 0",
                                  },
                                },
                                CommonTagFragment
                              ),
                            },
                          },
                          TagSearcherSuggestItemFragment
                        ),
                      })),
                    },
                    TagSearcherSuggestsFragment
                  ),
                },
              })
            )
          ),
        ],
      },
    },
  },
} as Meta<
  ComponentProps<typeof FormModal> & { current: Exclude<Current, undefined> }
>;

export default meta;

export type Story = StoryObj<typeof meta>;

export const ニコニコ動画からIDを入力して登録: Story = {
  args: {
    current: { type: "REGISTER_FROM_NICOVIDEO" },
  },
  parameters: {
    msw: {
      handlers: {
        concern: mocksRegisterFromNicovideo,
      },
    },
  },
};

export const ニコニコ動画から直接登録: Story = {
  args: {
    current: { type: "REGISTER_FROM_NICOVIDEO_WITH_ID", sourceId: "sm2057168" },
  },
  parameters: {
    msw: {
      handlers: {
        concern: mocksRegisterFromNicovideo,
      },
    },
  },
};

export const YoutubeからIDを入力して登録: Story = {
  args: {
    current: { type: "REGISTER_FROM_YOUTUBE", sourceId: null },
  },
  parameters: {
    msw: {
      handlers: {
        concern: mocksRegisterFromYoutube,
      },
    },
  },
};

export const Youtubeから直接登録: Story = {
  args: {
    current: { type: "REGISTER_FROM_YOUTUBE", sourceId: "sm2057168" },
  },
  parameters: {
    msw: {
      handlers: {
        concern: mocksRegisterFromYoutube,
      },
    },
  },
};

export const ニコニコ動画からIDを入力してリクエスト: Story = {
  args: {
    current: { type: "REQUEST_FROM_NICOVIDEO" },
  },
  parameters: {
    msw: {
      handlers: {
        concern: mocksRequestFromNicovideo,
      },
    },
  },
};

export const ニコニコ動画から直接リクエスト: Story = {
  args: {
    current: { type: "REQUEST_FROM_NICOVIDEO_WITH_ID", sourceId: "sm2057168" },
  },
  parameters: {
    msw: {
      handlers: {
        concern: mocksRequestFromNicovideo,
      },
    },
  },
};
