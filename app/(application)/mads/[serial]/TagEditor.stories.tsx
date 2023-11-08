import { Auth0Context, Auth0ContextInterface } from "@auth0/auth0-react";
import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { graphql } from "msw";
import { createClient, fetchExchange, Provider as UrqlProvider } from "urql";

import { Fragment as CommonTagFragment } from "~/components/CommonTag";
import { mockTagSearcher } from "~/components/TagSearcher/index.mocks";
import { makeFragmentData } from "~/gql";
import { TagType } from "~/gql/graphql";

import Component, { Mutation, Query, TagsListFragment } from "./TagEditor";

const mockTagList = makeFragmentData(
  {
    taggings: {
      nodes: [
        {
          id: "tagging1",
          tag: {
            id: "tag1",
            ...makeFragmentData(
              {
                name: "Tag1",
                type: TagType.Copyright,
                explicitParent: null,
              },
              CommonTagFragment
            ),
          },
        },
        {
          id: "tagging2",
          tag: {
            id: "tag2",
            ...makeFragmentData(
              {
                name: "Tag2",
                type: TagType.Character,
                explicitParent: {
                  id: "tag1",
                  name: "Tag1",
                  type: TagType.Character,
                },
              },
              CommonTagFragment
            ),
          },
        },
      ],
    },
  },
  TagsListFragment
);

const meta = {
  component: Component,
  args: {
    serial: "1",
    close: action("close"),
  },
  render: (args) => (
    <Auth0Context.Provider
      value={
        {
          isAuthenticated: true,
          async getAccessTokenSilently() {
            return "token";
          },
        } as Auth0ContextInterface
      }
    >
      <UrqlProvider
        value={createClient({ url: "/graphql", exchanges: [fetchExchange] })}
      >
        <Component {...args} />
      </UrqlProvider>
    </Auth0Context.Provider>
  ),
  parameters: {
    msw: {
      handlers: {
        unconcern: [mockTagSearcher],
        concern: [
          graphql.query(Query, (req, res, ctx) =>
            res(
              ctx.data({
                getVideo: {
                  id: "video1",
                  ...mockTagList,
                  semitags: [],
                },
              })
            )
          ),
          graphql.mutation(Mutation, (req, res, ctx) =>
            res(
              ctx.data({
                addTagToVideo: {
                  __typename: "AddTagToVideoSucceededPayload",
                  tag: { id: req.variables.tagId },
                  video: {
                    id: req.variables.madId,
                  },
                },
              })
            )
          ),
        ],
      },
    },
  },
} as Meta<typeof Component>;
export default meta;

export const Primary: StoryObj<typeof meta> = {};
