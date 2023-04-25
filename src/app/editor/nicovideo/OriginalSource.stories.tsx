import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import {
  createClient as createUrqlClient,
  fetchExchange,
  Provider as UrqlProvider,
} from "urql";

import { makeFragmentData } from "~/gql";
import { TagType } from "~/gql/graphql";

import { Fragment, Original } from "./OriginalSource";
import { RegisterContext } from "./RegisterContext";
import { mockTagButton } from "./TagButton.mocks";

const meta = {
  component: Original,
  render(args) {
    return (
      <UrqlProvider
        value={createUrqlClient({
          url: "/graphql",
          exchanges: [fetchExchange],
        })}
      >
        <RegisterContext.Provider
          value={{
            setTitle: action("setTitle"),
            setSourceId: action("setSourceId"),
            setThumbnailUrl: action("setThumbnailUrl"),
            toggleSemitag: action("toggleSemitag"),
            toggleTag: action("toggleTag"),
          }}
        >
          <Original {...args} />
        </RegisterContext.Provider>
      </UrqlProvider>
    );
  },
  parameters: {
    msw: {
      handlers: {
        unconcern: [mockTagButton],
        concern: [],
      },
    },
  },
} as Meta<typeof Original>;
export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {
    fragment: makeFragmentData(
      {
        sourceId: "sm2057168",
        title: "M.C.ドナルドはダンスに夢中なのか？最終鬼畜道化師ドナルド・Ｍ",
        thumbnailUrl: "/960x540.jpg",
        tags: [
          {
            name: "ドナルド",
            searchTags: {
              items: [
                {
                  tag: {
                    id: "t1",
                    name: "ドナルド・マクドナルド",
                    explicitParent: null,
                    type: TagType.Character,
                  },
                },
              ],
            },
          },
          {
            name: "U.N.オーエンは彼女なのか？",
            searchTags: {
              items: [
                {
                  tag: {
                    id: "t2",
                    name: "U.N.オーエンは彼女なのか？",
                    explicitParent: null,
                    type: TagType.Music,
                  },
                },
              ],
            },
          },
          {
            name: "最終鬼畜妹フランドール・Ｓ",
            searchTags: {
              items: [
                {
                  tag: {
                    id: "t3",
                    name: "最終鬼畜妹フランドール・Ｓ",
                    explicitParent: null,
                    type: TagType.Music,
                  },
                },
              ],
            },
          },
          {
            name: "エンターテイメント",
            searchTags: {
              items: [],
            },
          },
          {
            name: "東方乱々流",
            searchTags: {
              items: [
                {
                  tag: {
                    id: "t1",
                    name: "ドナルド・マクドナルド",
                    explicitParent: null,
                    type: TagType.Character,
                  },
                },
                {
                  tag: {
                    id: "t4",
                    name: "東方Project",
                    explicitParent: null,
                    type: TagType.Unknown,
                  },
                },
              ],
            },
          },
          {
            name: "音mad",
            searchTags: {
              items: [],
            },
          },
          {
            name: "ドナルド教",
            searchTags: {
              items: [
                {
                  tag: {
                    id: "t1",
                    name: "ドナルド・マクドナルド",
                    explicitParent: null,
                    type: TagType.Character,
                  },
                },
              ],
            },
          },
        ],
      },
      Fragment
    ),
  },
};
