import "@testing-library/jest-dom/vitest";

import { setProjectAnnotations } from "@storybook/react";
import { vi } from "vitest";

import preview from "../.storybook/preview";

const { useRouter } = vi.hoisted(() => {
  const mockedRouterPush = vi.fn();
  return {
    useRouter: () => ({ push: mockedRouterPush }),
  };
});

vi.mock("next/navigation", async () => {
  const actual = await vi.importActual("next/navigation");
  return {
    ...actual,
    useRouter,
  };
});

setProjectAnnotations(preview);
