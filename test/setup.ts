import "@testing-library/jest-dom/vitest";

import { setProjectAnnotations } from "@storybook/react";

import preview from "../.storybook/preview";

setProjectAnnotations(preview);
