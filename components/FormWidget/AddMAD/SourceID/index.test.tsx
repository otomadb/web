/// <reference types="vite/client" />

import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";
import { describe, it } from "vitest";

import * as stories from "./index.stories";

describe("Storybook", () => {
  it.each(Object.entries(composeStories(stories)))(
    "renders %s",
    async async (name, Story) => {
      const screen = render(<Story />);
      await Story.play?.({ canvasElement: screen.container });
    }
  );
});
