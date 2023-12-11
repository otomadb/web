import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";
import { describe, it } from "vitest";

import * as stories from "./LikeButton.stories";

describe("Storybook", () => {
  it.each(Object.entries(composeStories(stories)))(
    "renders %s",
    (name, Story) => {
      const screen = render(<Story />);
      Story.play?.({ canvasElement: screen.container });
    }
  );
});
