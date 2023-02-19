import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import {
  createClient as createUrqlClient,
  Provider as UrqlProvider,
} from "urql";

import { aNicovideoVideoSource, aVideo } from "~/gql/graphql";

import { SourceAlreadyExists } from "./SourceAlreadyRegistered";

const meta = {
  component: SourceAlreadyExists,
  args: {
    toggleTag: action("toggleTag"),
  },
  render(args) {
    return (
      <UrqlProvider value={createUrqlClient({ url: "/graphql" })}>
        <SourceAlreadyExists {...args} />
      </UrqlProvider>
    );
  },
  parameters: {
    layout: "centered",
    msw: { handlers: [] },
  },
} as Meta<typeof SourceAlreadyExists>;
export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {
    fragment: aNicovideoVideoSource({
      sourceId: "sm2057168",
      video: aVideo({
        title: "M.C.ドナルドはダンスに夢中なのか？最終鬼畜道化師ドナルド・Ｍ",
        thumbnailUrl: "/960x540.jpg",
      }),
    }),
  },
};
