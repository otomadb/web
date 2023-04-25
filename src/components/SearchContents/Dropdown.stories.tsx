import { Meta, StoryObj } from "@storybook/react";
import { graphql } from "msw";
import {
  createClient as createUrqlClient,
  Provider as UrqlProvider,
} from "urql";

import {
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
              searchTags: {
                items: [
                  {
                    name: {
                      name: "name1",
                    },
                    tag: {
                      id: "t1",
                    },
                  },
                  {
                    name: {
                      name: "name2",
                    },
                    tag: {
                      id: "t2",
                    },
                  },
                ],
              },
              searchVideos: {
                items: [
                  {
                    title: {
                      title: "title1",
                    },
                    video: {
                      id: "v1",
                      title: "Title 1",
                      thumbnailUrl: "/960x540.jpg",
                    },
                  },
                  {
                    title: {
                      title: "title2",
                    },
                    video: {
                      id: "v2",
                      title: "Title 2",
                      thumbnailUrl: "/960x540.jpg",
                    },
                  },
                ],
              },
            })
          )
        ),
        graphql.query(SearchContents_SearchNicovideoDocument, (req, res, ctx) =>
          res(
            ctx.data({
              findNicovideoVideoSource: aNicovideoVideoSource({
                video: {
                  id: "v1",
                  title: "Title 1",
                  thumbnailUrl: "/960x540.jpg",
                  taggings: TagConnection({
                    nodes: [
                      Tag({
                        tag: {
                          id: "t1",
                          name: "Tag 1",
                          explicitParent: null,
                        },
                      }),
                      Tag({
                        tag: {
                          id: "t2",
                          name: "Tag 2",
                          explicitParent: null,
                        },
                      }),
                    ],
                  }),
                },
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
