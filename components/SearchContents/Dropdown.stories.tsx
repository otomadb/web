import { Meta, StoryObj } from "@storybook/react";

import { Dropdown } from "./Dropdown";
import {
  $handlerNicovideoLoading,
  $handlerSourceAndRequests as $handlerNicovideoSourceAndRequests,
} from "./Nicovideo.stories";
import {
  $handlerMadsSearching,
  $handlerSomeMadsHit,
} from "./SearchMads.stories";
import {
  $handlerSomeTagsHit,
  $handlerTagsSearching,
} from "./SearchTags.stories";

const meta = {
  component: Dropdown,
  args: {
    style: {
      width: 640,
      size: "md",
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
} as Meta<typeof Dropdown>;
export default meta;

export const Loading: StoryObj<typeof meta> = {
  parameters: {
    msw: {
      handlers: [
        $handlerMadsSearching,
        $handlerTagsSearching,
        $handlerNicovideoLoading,
      ],
    },
  },
};

export const Primary: StoryObj<typeof meta> = {
  args: {},
};

export const NicovideoId: StoryObj<typeof meta> = {
  args: { query: "sm2057168" },
};
