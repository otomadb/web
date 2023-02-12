import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { graphql, rest } from "msw";
import {
  createClient as createUrqlClient,
  Provider as UrqlProvider,
} from "urql";

import {
  aFetchNicovideoPayload,
  aNicovideoOriginalSource,
  aNicovideoOriginalSourceTagSearchTagsPayload,
  aNicovideoVideoSource,
  aSearchTagsItem,
  aSearchTagsPayload,
  aTag,
  aUser,
  aVideo,
  RegisterNicovideoPage_AlreadyCheckDocument,
  RegisterNicovideoPage_ExactTagDocument,
  RegisterNicovideoPage_FetchNicovideoDocument,
  RegisterNicovideoPage_RegisterVideoDocument,
  RegisterNicovideoPage_SearchTagsDocument,
  UseViewerDocument,
} from "~/gql/graphql";
import { RestProvider } from "~/rest";

import { RegisterNicovideoForm } from "./Form";

const mockLogin = graphql.query(UseViewerDocument, (req, res, ctx) =>
  res(
    ctx.data({
      whoami: aUser({
        id: "user:1",
        name: "Name",
        displayName: "Displayname",
        icon: "/storybook/512x512.png",
      }),
    })
  )
);

const mockUnlogin = graphql.query(UseViewerDocument, (req, res, ctx) =>
  res(
    ctx.data({
      whoami: null,
    })
  )
);

const mockRemoteSuccess = graphql.query(
  RegisterNicovideoPage_FetchNicovideoDocument,
  (req, res, ctx) =>
    res(
      ctx.data({
        fetchNicovideo: aFetchNicovideoPayload({
          source: aNicovideoOriginalSource({
            sourceId: "sm2057168",
            title:
              "M.C.ドナルドはダンスに夢中なのか？最終鬼畜道化師ドナルド・Ｍ",
            thumbnailUrl: "/storybook/960x540.jpg",
            tags: [
              {
                name: "ドナルド",
                searchTags: aNicovideoOriginalSourceTagSearchTagsPayload({
                  items: [
                    {
                      tag: aTag({
                        id: "t1",
                        name: "ドナルド・マクドナルド",
                      }),
                    },
                  ],
                }),
              },
              {
                name: "U.N.オーエンは彼女なのか？",
                searchTags: aNicovideoOriginalSourceTagSearchTagsPayload({
                  items: [
                    {
                      tag: aTag({
                        id: "t2",
                        name: "U.N.オーエンは彼女なのか？",
                      }),
                    },
                  ],
                }),
              },
              {
                name: "最終鬼畜妹フランドール・Ｓ",
                searchTags: aNicovideoOriginalSourceTagSearchTagsPayload({
                  items: [
                    {
                      tag: aTag({
                        id: "t3",
                        name: "最終鬼畜妹フランドール・Ｓ",
                      }),
                    },
                  ],
                }),
              },
              {
                name: "エンターテイメント",
                searchTags: aNicovideoOriginalSourceTagSearchTagsPayload({
                  items: [],
                }),
              },
              {
                name: "東方乱々流",
                searchTags: aNicovideoOriginalSourceTagSearchTagsPayload({
                  items: [],
                }),
              },
              {
                name: "音mad",
                searchTags: aNicovideoOriginalSourceTagSearchTagsPayload({
                  items: [],
                }),
              },
              {
                name: "ドナルド教",
                searchTags: aNicovideoOriginalSourceTagSearchTagsPayload({
                  items: [],
                }),
              },
            ],
          }),
        }),
      })
    )
);

const mockYetUnregistered = graphql.query(
  RegisterNicovideoPage_AlreadyCheckDocument,
  (req, res, ctx) =>
    res(
      ctx.data({
        findNicovideoVideoSource: null,
      })
    )
);

const mockSearchTag = graphql.query(
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
);

export default {
  component: RegisterNicovideoForm,
  args: {
    className: css`
      width: 1280px;
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
        <RestProvider value={{ base: window.location.origin }}>
          <RegisterNicovideoForm {...args} />
        </RestProvider>
      </UrqlProvider>
    );
  },
  parameters: {
    layout: "centered",
    msw: {
      handlers: [
        mockLogin,
        mockRemoteSuccess,
        graphql.query(RegisterNicovideoPage_ExactTagDocument, (req, res, ctx) =>
          res(
            ctx.data({
              tag: aTag({
                id: `tag:1:${req.variables.id}`,
                explicitParent: null,
              }),
            })
          )
        ),
        mockYetUnregistered,
        graphql.mutation(
          RegisterNicovideoPage_RegisterVideoDocument,
          (req, res, ctx) =>
            res(
              ctx.data({
                registerVideo: {
                  __typename: "RegisterVideoSucceededPayload",
                  video: aVideo({
                    id: "video_1",
                    title: req.variables.input.primaryTitle,
                  }),
                },
              })
            )
        ),
        mockSearchTag,
      ],
    },
  },
} as Meta<typeof RegisterNicovideoForm>;

export const Primary: StoryObj<typeof RegisterNicovideoForm> = {
  args: {},
};

export const Unlogin: StoryObj<typeof RegisterNicovideoForm> = {
  name: "未ログイン",
  args: {},
  parameters: {
    msw: {
      handlers: [mockUnlogin],
    },
  },
};

export const NoRemote: StoryObj<typeof RegisterNicovideoForm> = {
  name: "リモートからの取得に失敗",
  args: {},
  parameters: {
    msw: {
      handlers: [
        mockLogin,
        rest.get("/remote/nicovideo", (req, res, ctx) => res(ctx.status(404))),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByLabelText("ID入力"), "sm2057168");
    await userEvent.click(canvas.getByLabelText("検索"));
  },
};

export const Already: StoryObj<typeof RegisterNicovideoForm> = {
  name: "既にある",
  args: {},
  parameters: {
    msw: {
      handlers: [
        mockLogin,
        mockRemoteSuccess,
        graphql.query(
          RegisterNicovideoPage_AlreadyCheckDocument,
          (req, res, ctx) =>
            res(
              ctx.data({
                findNicovideoVideoSource: aNicovideoVideoSource({
                  sourceId: "sm2057168",
                  video: aVideo({
                    id: "video_1",
                    title:
                      "M.C.ドナルドはダンスに夢中なのか？最終鬼畜道化師ドナルド・Ｍ",
                    thumbnailUrl: "/storybook/960x540.jpg",
                  }),
                }),
              })
            )
        ),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByLabelText("ID入力"), "sm2057168");
    await userEvent.click(canvas.getByLabelText("検索"));
  },
};

export const ValidId: StoryObj<typeof RegisterNicovideoForm> = {
  name: "正しいnicovideoのIDを入力",
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByLabelText("ID入力"), "sm2057168");
    await userEvent.click(canvas.getByLabelText("検索"));
  },
};
