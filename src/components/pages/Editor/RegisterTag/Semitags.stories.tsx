import { css } from "@emotion/css";
import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { graphql } from "msw";
import {
  createClient as createUrqlClient,
  Provider as UrqlProvider,
} from "urql";

import { aSemitag, RegisterTag_FindSemitagsDocument } from "~/gql/graphql";
import { RestProvider } from "~/rest";

import { Semitags } from "./Semitags";

export default {
  component: Semitags,
  args: {
    className: css`
      width: 960px;
    `,
    fields: [],
    append: action("append"),
    remove: action("remove"),
  },
  render(args) {
    return (
      <UrqlProvider value={createUrqlClient({ url: "/graphql" })}>
        <RestProvider value={{ base: window.location.origin }}>
          <Semitags {...args} />
        </RestProvider>
      </UrqlProvider>
    );
  },
  parameters: {
    layout: "centered",
    msw: {
      handlers: [
        graphql.query(RegisterTag_FindSemitagsDocument, (req, res, ctx) =>
          res(
            ctx.data({
              findSemitags: {
                nodes: [...new Array(30)].map((_, i) =>
                  aSemitag({
                    id: `semitag:${i}`,
                  })
                ),
                /*[
                  aSemitag({
                    id: "semitag:1",
                    name: "ドナルド・マクドナルド",
                    video: aVideo({
                      id: "video_1",
                      title:
                        "M.C.ドナルドはダンスに夢中なのか？最終鬼畜道化師ドナルド・Ｍ",
                      thumbnailUrl: "/storybook/960x540.jpg",
                    }),
                  }),
                  aSemitag({
                    id: "semitag:2",
                    name: "U.N.オーエンは彼女なのか？",
                    video: aVideo({
                      id: "video_1",
                      title:
                        "M.C.ドナルドはダンスに夢中なのか？最終鬼畜道化師ドナルド・Ｍ",
                      thumbnailUrl: "/storybook/960x540.jpg",
                    }),
                  }),
                  aSemitag({
                    id: "semitag:3",
                    name: "最終鬼畜妹フランドール・Ｓ",
                    video: aVideo({
                      id: "video_1",
                      title:
                        "M.C.ドナルドはダンスに夢中なのか？最終鬼畜道化師ドナルド・Ｍ",
                      thumbnailUrl: "/storybook/960x540.jpg",
                    }),
                  }),
                ],
                  */
              },
            })
          )
        ),
      ],
    },
  },
} as Meta<typeof Semitags>;

export const Primary: StoryObj<typeof Semitags> = {};
