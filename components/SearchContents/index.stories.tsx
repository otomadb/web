import { Meta, StoryObj } from "@storybook/react";

import SearchContents from ".";
import { $handlerSourceAndRequests as $handlerNicovideoSourceAndRequests } from "./Nicovideo.stories";
import { $handlerSomeMadsHit } from "./SearchMads.stories";
import { $handlerSomeTagsHit } from "./SearchTags.stories";

const meta = {
  component: SearchContents,
  args: {
    style: {
      width: 640,
    },
  },
  parameters: {
    msw: {
      handlers: [
        $handlerSomeMadsHit,
        $handlerSomeTagsHit,
        $handlerNicovideoSourceAndRequests,
      ],
    },
  },
} satisfies Meta<typeof SearchContents>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
