import { Meta, StoryObj } from "@storybook/react";
import { userEvent } from "@storybook/testing-library";
import { screen } from "@storybook/testing-library";
import { graphql } from "msw";
import {
  createClient as createUrqlClient,
  Provider as UrqlProvider,
} from "urql";

import {
  aSearchTagsPayload,
  aSearchTagsResultItem,
  aSearchVideosPayload,
  aSearchVideosResultItem,
  aTag,
  aVideo,
  GlobalNav_SearchBoxDocument,
  PseudoTagType,
} from "~/gql/graphql";

import { SearchBox } from "./SearchBox";

export default {
  component: SearchBox,
  args: {},
  parameters: {
    msw: {
      handlers: [
        graphql.query(GlobalNav_SearchBoxDocument, (req, res, ctx) =>
          res(
            ctx.data({
              tags: aSearchTagsPayload({ result: [] }),
              videos: aSearchVideosPayload({ result: [] }),
            })
          )
        ),
      ],
    },
  },
} as Meta<typeof SearchBox>;

export const Primary: StoryObj<typeof SearchBox> = {
  args: {},
  render(args) {
    return (
      <UrqlProvider value={createUrqlClient({ url: "/graphql" })}>
        <SearchBox {...args} />
      </UrqlProvider>
    );
  },
  parameters: {
    msw: {
      handlers: [
        graphql.query(GlobalNav_SearchBoxDocument, (req, res, ctx) =>
          res(
            ctx.data({
              tags: aSearchTagsPayload({ result: [] }),
              videos: aSearchVideosPayload({ result: [] }),
            })
          )
        ),
      ],
    },
  },
};

export const Click: StoryObj<typeof SearchBox> = {
  args: {},
  render(args) {
    return (
      <UrqlProvider value={createUrqlClient({ url: "/graphql" })}>
        <SearchBox {...args} />
      </UrqlProvider>
    );
  },
  play: async () => {
    await userEvent.click(screen.getByLabelText("Search box input"));
  },
};

export const Type: StoryObj<typeof SearchBox> = {
  args: {},
  render(args) {
    return (
      <UrqlProvider value={createUrqlClient({ url: "/graphql" })}>
        <SearchBox {...args} />
      </UrqlProvider>
    );
  },
  play: async () => {
    await userEvent.type(
      screen.getByLabelText("Search box input"),
      "ぼっち・ざ・ろっく！"
    );
  },
  parameters: {
    msw: {
      handlers: [
        graphql.query(GlobalNav_SearchBoxDocument, (req, res, ctx) =>
          res(
            ctx.data({
              tags: aSearchTagsPayload({
                result: [
                  aSearchTagsResultItem({
                    matchedName: "ぼっち・ざ・ろっく！",
                    tag: aTag({
                      id: "tag:1",
                      name: "ぼっち・ざ・ろっく！",
                      pseudoType: PseudoTagType.Character,
                    }),
                  }),
                  aSearchTagsResultItem({
                    matchedName: "後藤ひとり",
                    tag: aTag({
                      id: "tag:2",
                      name: "後藤ひとり",
                      pseudoType: PseudoTagType.Character,
                    }),
                  }),
                  aSearchTagsResultItem({
                    matchedName: "伊地知虹夏",
                    tag: aTag({
                      id: "tag:3",
                      name: "伊地知虹夏",
                      pseudoType: PseudoTagType.Character,
                    }),
                  }),
                  aSearchTagsResultItem({
                    matchedName: "山田リョウ",
                    tag: aTag({
                      id: "tag:4",
                      name: "山田リョウ",
                      pseudoType: PseudoTagType.Character,
                    }),
                  }),
                  aSearchTagsResultItem({
                    matchedName: "喜多郁代",
                    tag: aTag({
                      id: "tag:5",
                      name: "喜多郁代",
                      pseudoType: PseudoTagType.Character,
                    }),
                  }),
                  aSearchTagsResultItem({
                    matchedName: "草を食べて生きていきます",
                    tag: aTag({
                      id: "tag:6",
                      name: "これで私は所持金が底を尽きたので草を食べて生きていきます",
                      pseudoType: PseudoTagType.Phrase,
                    }),
                  }),
                ],
              }),
              videos: aSearchVideosPayload({
                result: [
                  aSearchVideosResultItem({ video: aVideo({ id: "video:1" }) }),
                  aSearchVideosResultItem({ video: aVideo({ id: "video:2" }) }),
                  aSearchVideosResultItem({ video: aVideo({ id: "video:3" }) }),
                  aSearchVideosResultItem({ video: aVideo({ id: "video:4" }) }),
                ],
              }),
            })
          )
        ),
      ],
    },
  },
};
