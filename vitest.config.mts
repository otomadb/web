import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr({ include: "**/*.svg" })],
  test: {
    environment: "jsdom",
    setupFiles: ["test/setup.ts"],
  },
});
