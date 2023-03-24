import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import {
  createClient as createUrqlClient,
  Provider as UrqlProvider,
} from "urql";

import { makeFragmentData } from "~/gql";
import { aNicovideoVideoSource, aVideo } from "~/gql/graphql";

import { AlreadyRegistered, Fragment } from "./AlreadyRegistered";

const meta = {
  component: AlreadyRegistered,
  args: {
    toggleTag: action("toggleTag"),
  },
  render(args) {
    return (
      <UrqlProvider value={createUrqlClient({ url: "/graphql" })}>
        <AlreadyRegistered {...args} />
      </UrqlProvider>
    );
  },
  parameters: {
    msw: { handlers: [] },
  },
} as Meta<typeof AlreadyRegistered>;
export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {
    fragment: makeFragmentData(
      aNicovideoVideoSource({
        sourceId: "sm2057168",
        video: aVideo({
          title: "M.C.ドナルドはダンスに夢中なのか？最終鬼畜道化師ドナルド・Ｍ",
          thumbnailUrl: "/960x540.jpg",
        }),
      }),
      Fragment
    ),
  },
};
