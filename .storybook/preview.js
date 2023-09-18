import "../src/app/globals.css";
import { rest } from "msw";
import { readFile } from "fs/promises";
import { initialize as initializeMSW, mswDecorator } from "msw-storybook-addon";

initializeMSW({
  onUnhandledRequest: "bypass",
});

export const decorators = [mswDecorator];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextjs: {
    appDirectory: true,
  },
  parameters: {
    msw: {
      handlers: {
        image: [
          rest.get("/mads/:serial/thumbnail", async (req, res, ctx) => {
            const imageBuffer = await readFile(
              path.resolve(__dirname, "./public/800x450.jpg")
            );
            return res(
              ctx.set("Cache-Control", "public, max-age=31536000, immutable"),
              ctx.set("Content-Type", "image/jpeg"),
              ctx.body(imageBuffer)
            );
          }),
        ],
      },
    },
  },
};
