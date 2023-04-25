import { Meta, StoryObj } from "@storybook/react";
import { graphql } from "msw";
import {
  createClient as createUrqlClient,
  Provider as UrqlProvider,
} from "urql";

import { SearchContents_SearchNicovideoDocument } from "~/gql/graphql";

import { SearchNicovideo } from "./Nicovideo";

const meta = {
  component: SearchNicovideo,
  args: {
    sourceId: "sm2057168",
  },
  render(args) {
    return (
      <UrqlProvider
        value={createUrqlClient({ url: "/graphql", exchanges: [] })}
      >
        <SearchNicovideo {...args} />
      </UrqlProvider>
    );
  },
} as Meta<typeof SearchNicovideo>;
export default meta;

export const Loading: StoryObj<typeof meta> = {
  parameters: {
    msw: {
      handlers: [
        graphql.query(SearchContents_SearchNicovideoDocument, (req, res, ctx) =>
          res(ctx.delay("infinite"))
        ),
      ],
    },
  },
};

const mockFindNicovideoVideoSource = {
  sourceId: "sm2057168",
  video: {
    id: "v1",
    title: "Title 1",
    thumbnailUrl: "/960x540.jpg",
    taggings: {
      nodes: [
        {
          id: "tagging1",
          tag: {
            id: "t1",
            name: "Tag 1",
            explicitParent: null,
          },
        },
        {
          id: "tagging2",
          tag: {
            id: "t2",
            name: "Tag 2",
            explicitParent: null,
          },
        },
      ],
    },
  },
};

const mockFindNicovideoRegistrationRequest = {
  sourceId: "sm2057168",
  title: "Title 1",
  thumbnailUrl: "/960x540.jpg",
  requestedBy: {
    id: "u1",
    name: "user1",
    displayName: "User 1",
    icon: "/512x512.png",
  },
};

export const SourceExists_And_RequestsExists: StoryObj<typeof meta> = {
  name: "動画ソースとリクエストの両方がある",
  parameters: {
    msw: {
      handlers: [
        graphql.query(SearchContents_SearchNicovideoDocument, (req, res, ctx) =>
          res(
            ctx.data({
              findNicovideoVideoSource: mockFindNicovideoVideoSource,
              findNicovideoRegistrationRequest:
                mockFindNicovideoRegistrationRequest,
            })
          )
        ),
      ],
    },
  },
};

export const SourceExists_But_RequestNotExists: StoryObj<typeof meta> = {
  name: "動画ソースはあるがリクエストは無い",
  parameters: {
    msw: {
      handlers: [
        graphql.query(SearchContents_SearchNicovideoDocument, (req, res, ctx) =>
          res(
            ctx.data({
              findNicovideoVideoSource: mockFindNicovideoVideoSource,
              findNicovideoRegistrationRequest: null,
            })
          )
        ),
      ],
    },
  },
};

export const SourceNotExists_But_RequestExists: StoryObj<typeof meta> = {
  name: "動画ソースは無いがリクエストがある",
  parameters: {
    msw: {
      handlers: [
        graphql.query(SearchContents_SearchNicovideoDocument, (req, res, ctx) =>
          res(
            ctx.data({
              findNicovideoVideoSource: null,
              findNicovideoRegistrationRequest:
                mockFindNicovideoRegistrationRequest,
            })
          )
        ),
      ],
    },
  },
};

export const SourceNotExists_And_RequestNotExists: StoryObj<typeof meta> = {
  name: "動画ソースもリクエストも両方ない",
  parameters: {
    msw: {
      handlers: [
        graphql.query(SearchContents_SearchNicovideoDocument, (req, res, ctx) =>
          res(
            ctx.data({
              findNicovideoVideoSource: null,
              findNicovideoRegistrationRequest: null,
            })
          )
        ),
      ],
    },
  },
};
