import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";

import { makeFragmentData } from "~/gql";

import { RegisterContext } from "../Original/Context";
import { RequestContext } from "./Context";
import { Exists, Fragment } from "./Exists";

const meta = {
  component: Exists,
  args: {},
  render(args) {
    return (
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
          <Exists {...args} />
        </RequestContext.Provider>
      </RegisterContext.Provider>
    );
  },
} as Meta<typeof Exists>;
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
          { id: "semitagging1", name: "Semitag 1", note: "Semitag 1 note" },
          { id: "semitagging2", name: "Semitag 2", note: null },
        ],
      },
      Fragment
    ),
  },
};
