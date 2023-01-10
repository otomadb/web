import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";
import { graphql } from "msw";
import {
  createClient as createUrqlClient,
  Provider as UrqlProvider,
} from "urql";

import {
  aRegisterVideoPayload,
  aSearchTagsItem,
  aSearchTagsPayload,
  aTag,
  aVideo,
  RegisterNicovideoPage_RegisterVideoDocument,
  RegisterNicovideoPage_SearchTagsDocument,
} from "~/gql/graphql";

import { RegisterForm } from "./RegisterForm";

export default {
  component: RegisterForm,
  args: {
    className: css`
      width: 620px;
    `,
  },
  render(args) {
    return (
      <UrqlProvider
        value={createUrqlClient({
          url: "/graphql",
          requestPolicy: "network-only",
        })}
      >
        <RegisterForm {...args} />
      </UrqlProvider>
    );
  },
  parameters: {
    layout: "centered",
    msw: {
      handlers: [
        graphql.query(
          RegisterNicovideoPage_SearchTagsDocument,
          (req, res, ctx) =>
            res(
              ctx.data({
                searchTags: aSearchTagsPayload({
                  items: [
                    aSearchTagsItem({
                      matchedName: req.variables.query,
                      tag: aTag({
                        id: `tag:1:${req.variables.query}`,
                        name: req.variables.query,
                        explicitParent: null,
                      }),
                    }),
                    aSearchTagsItem({
                      matchedName: req.variables.query,
                      tag: aTag({
                        id: `tag:2:${req.variables.query}`,
                        name: req.variables.query,
                        explicitParent: null,
                      }),
                    }),
                  ],
                }),
              })
            )
        ),
        graphql.mutation(
          RegisterNicovideoPage_RegisterVideoDocument,
          (req, res, ctx) =>
            res(
              ctx.data({
                registerVideo: aRegisterVideoPayload({
                  video: aVideo({
                    id: "video_1",
                    title: req.variables.input.primaryTitle,
                  }),
                }),
              })
            )
        ),
      ],
    },
  },
} as Meta<typeof RegisterForm>;

export const Primary: StoryObj<typeof RegisterForm> = {
  args: {
    sourceId: "sm2057168",
    title: "M.C.ドナルドはダンスに夢中なのか？最終鬼畜道化師ドナルド・Ｍ",
    tags: [],
    thumbnailUrl: "/storybook/960x540.jpg",
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    selectTag() {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    deselectTag() {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onRegistered() {},
  },
};
