import { Meta, StoryObj } from "@storybook/react";
import { graphql } from "msw";
import {
  createClient as createUrqlClient,
  Provider as UrqlProvider,
} from "urql";

import {
  aSearchTagsItem,
  aTag,
  VideoPage_TagEditor_SearchBoxDocument,
} from "~/gql/graphql";

import { TagsList } from "./List";
import { SearchBox } from "./SearchBox";

export default {
  component: SearchBox,
  args: {},
  parameters: {
    msw: {
      handlers: [
        graphql.query(VideoPage_TagEditor_SearchBoxDocument, (req, res, ctx) =>
          res(
            ctx.data({
              searchTags: {
                items: [
                  aSearchTagsItem({
                    matchedName: "タグ1",
                    tag: aTag({ name: "タグ1", explicitParent: undefined }),
                  }),
                  aSearchTagsItem({
                    matchedName: "タグ2",
                    tag: aTag({
                      name: "タグ2",
                      canTagTo: false,
                      explicitParent: undefined,
                    }),
                  }),
                  aSearchTagsItem({
                    matchedName: "タグ3",
                    tag: aTag({ name: "Tag3", explicitParent: undefined }),
                  }),
                  aSearchTagsItem({
                    matchedName: "後藤ひとり",
                    tag: aTag({
                      name: "後藤ひとり",
                      explicitParent: aTag({ name: "ぼっち・ざ・ろっく！" }),
                    }),
                  }),
                ],
              },
            })
          )
        ),
      ],
    },
  },
  render(args) {
    return (
      <UrqlProvider value={createUrqlClient({ url: "/graphql" })}>
        <SearchBox {...args} />
      </UrqlProvider>
    );
  },
} as Meta<typeof SearchBox>;

export const Primary: StoryObj<typeof TagsList> = {
  args: {},
};
