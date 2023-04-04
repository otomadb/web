import { Meta, StoryObj } from "@storybook/react";
import { graphql } from "msw";
import {
  createClient as createUrqlClient,
  Provider as UrqlProvider,
} from "urql";

import {
  aNicovideoRegistrationRequest,
  aNicovideoVideoSource,
  aSearchTagsPayload,
  aSearchVideosPayload,
  aTag,
  aTagName,
  aTagSearchItemByName,
  aVideo,
  aVideoSearchItemByTitle,
  aVideoTag,
  aVideoTagConnection,
  aVideoTitle,
  SearchContents_SearchNicovideoDocument,
  SearchContentsDocument,
} from "~/gql/graphql";

import { Dropdown } from "./Dropdown";

const meta = {
  component: Dropdown,
  args: {},
  render(args) {
    return (
      <UrqlProvider
        value={createUrqlClient({ url: "/graphql", exchanges: [] })}
      >
        <Dropdown {...args} />
      </UrqlProvider>
    );
  },
  parameters: {
    msw: {
      handlers: [
        graphql.query(SearchContentsDocument, (req, res, ctx) =>
          res(
            ctx.data({
              searchTags: aSearchTagsPayload({
                items: [
                  aTagSearchItemByName({
                    name: aTagName({
                      name: "name1",
                    }),
                    tag: aTag({
                      id: "t1",
                    }),
                  }),
                  aTagSearchItemByName({
                    name: aTagName({
                      name: "name2",
                    }),
                    tag: aTag({
                      id: "t2",
                    }),
                  }),
                ],
              }),
              searchVideos: aSearchVideosPayload({
                items: [
                  aVideoSearchItemByTitle({
                    title: aVideoTitle({
                      title: "title1",
                    }),
                    video: aVideo({
                      id: "v1",
                      title: "Title 1",
                      thumbnailUrl: "/960x540.jpg",
                    }),
                  }),
                  aVideoSearchItemByTitle({
                    title: aVideoTitle({
                      title: "title2",
                    }),
                    video: aVideo({
                      id: "v2",
                      title: "Title 2",
                      thumbnailUrl: "/960x540.jpg",
                    }),
                  }),
                ],
              }),
            })
          )
        ),
        graphql.query(SearchContents_SearchNicovideoDocument, (req, res, ctx) =>
          res(
            ctx.data({
              findNicovideoVideoSource: aNicovideoVideoSource({
                video: aVideo({
                  id: "v1",
                  title: "Title 1",
                  thumbnailUrl: "/960x540.jpg",
                  taggings: aVideoTagConnection({
                    nodes: [
                      aVideoTag({
                        tag: aTag({
                          id: "t1",
                          name: "Tag 1",
                          explicitParent: null,
                        }),
                      }),
                      aVideoTag({
                        tag: aTag({
                          id: "t2",
                          name: "Tag 2",
                          explicitParent: null,
                        }),
                      }),
                    ],
                  }),
                }),
              }),
              findNicovideoRegistrationRequest: aNicovideoRegistrationRequest(
                {}
              ),
            })
          )
        ),
      ],
    },
  },
} as Meta<typeof Dropdown>;
export default meta;

export const Loading: StoryObj<typeof meta> = {
  parameters: {
    msw: {
      handlers: [
        graphql.query(SearchContentsDocument, (req, res, ctx) =>
          res(ctx.delay("infinite"))
        ),
      ],
    },
  },
};

export const Primary: StoryObj<typeof meta> = {
  args: {},
};

export const NicovideoId: StoryObj<typeof meta> = {
  args: {
    query: "sm2057168",
  },
};

/*
export const Click: StoryObj<typeof meta> = {
  play: async () => {
    await userEvent.click(screen.getByLabelText("Search box input"));
  },
};
*/
