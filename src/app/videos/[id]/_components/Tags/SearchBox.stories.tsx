import { Meta, StoryObj } from "@storybook/react";
import { graphql } from "msw";

import { aTag, VideoPage_TagEditor_SearchBoxDocument } from "~/gql/graphql";
import { GraphQLProvider } from "~/hooks/useGraphQLClient";

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
                result: [
                  {
                    matchedName: "タグ1",
                    tag: aTag({ name: "タグ1", explicitParent: undefined }),
                  },
                  {
                    matchedName: "タグ2",
                    tag: aTag({
                      name: "タグ2",
                      canTagTo: false,
                      explicitParent: undefined,
                    }),
                  },
                  {
                    matchedName: "タグ3",
                    tag: aTag({ name: "Tag3", explicitParent: undefined }),
                  },
                  {
                    matchedName: "後藤ひとり",
                    tag: aTag({
                      name: "後藤ひとり",
                      explicitParent: aTag({ name: "ぼっち・ざ・ろっく！" }),
                    }),
                  },
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
      <GraphQLProvider>
        <SearchBox {...args} />
      </GraphQLProvider>
    );
  },
} as Meta<typeof SearchBox>;

export const Primary: StoryObj<typeof TagsList> = {
  args: {},
};
