import { ResultOf } from "@graphql-typed-document-node/core";
import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import {
  createClient as createUrqlClient,
  fetchExchange,
  Provider as UrqlProvider,
} from "urql";

import { Fragment as UserIconFragment } from "~/components/UserIcon";
import { makeFragmentData } from "~/gql";
import { Link_UserFragmentDoc } from "~/gql/graphql";

import { RegisterContext } from "./RegisterContext";
import { RequestContext } from "./RequestContext";
import { Fragment, RequestExists } from "./RequestExists";
import { mockTagButton } from "./TagButton.mocks";
import { Fragment as ToggleSemitagButtonFragment } from "./ToggleSemitagButton";

const meta = {
  component: RequestExists,
  args: {},
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
          <RequestContext.Provider
            value={{ setRequestId: action("setRequestId") }}
          >
            <RequestExists {...args} />
          </RequestContext.Provider>
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
} as Meta<typeof RequestExists>;
export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {
    fragment: makeFragmentData(
      {
        id: "req1",
        title: "Title 1",
        checked: false,
        taggings: [
          {
            id: "tagging1",
            tag: {
              id: "tag1",
            },
          },
          {
            id: "tagging2",
            tag: {
              id: "tag2",
            },
          },
          {
            id: "tagging3",
            tag: {
              id: "tag3",
            },
          },
          {
            id: "tagging4",
            tag: {
              id: "tag4",
            },
          },
          {
            id: "tagging5",
            tag: {
              id: "tag5",
            },
          },
        ],
        semitaggings: [
          {
            id: "semitagging1",
            ...makeFragmentData(
              {
                name: "Semitag 1",
              },
              ToggleSemitagButtonFragment
            ),
          },
          {
            id: "semitagging2",
            ...makeFragmentData(
              {
                name: "Semitag 2",
              },
              ToggleSemitagButtonFragment
            ),
          },
        ],
        requestedBy: {
          id: "user1",
          displayName: "User 1",
          ...makeFragmentData(
            {
              icon: "/512x512.png",
              displayName: "User 1",
            },
            UserIconFragment
          ),
          ...makeFragmentData(
            {
              name: "user1",
            },
            Link_UserFragmentDoc
          ),
        } as ResultOf<typeof Fragment>["requestedBy"],
      },
      Fragment
    ),
  },
};
