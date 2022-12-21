import { Meta, StoryObj } from "@storybook/react";
import { screen, userEvent } from "@storybook/testing-library";
import { graphql, rest } from "msw";
import {
  createClient as createUrqlClient,
  Provider as UrqlProvider,
} from "urql";

import {
  aNicovideoVideoSource,
  aRegisterVideoPayload,
  aSearchTagsItem,
  aSearchTagsPayload,
  aTag,
  aUser,
  aVideo,
  RegisterNicovideoPage_AlreadyCheckDocument,
  RegisterNicovideoPage_ExactTagDocument,
  RegisterNicovideoPage_RegisterVideoDocument,
  RegisterNicovideoPage_SearchTagCandidatesDocument,
  RegisterNicovideoPage_SearchTagsDocument,
  ViewerDocument,
} from "~/gql/graphql";

import { RegisterNicovideoForm } from "./Form";

const mockLogin = graphql.query(ViewerDocument, (req, res, ctx) =>
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

const mockUnlogin = graphql.query(ViewerDocument, (req, res, ctx) =>
  res(
    ctx.data({
      whoami: null,
    })
  )
);

const mockRemoteSuccess = rest.get(
  "https://nicovideo-gti-proxy.deno.dev/:id",
  (req, res, ctx) =>
    res(
      ctx.json({
        id: req.params["id"],
        title: "M.C.ドナルドはダンスに夢中なのか？最終鬼畜道化師ドナルド・Ｍ",
        tags: [
          { value: "ドナルド" },
          { value: "U.N.オーエンは彼女なのか？" },
          { value: "最終鬼畜妹フランドール・Ｓ" },
          { value: "エンターテイメント" },
          { value: "東方乱々流" },
          { value: "音mad" },
          { value: "ドナルド教" },
        ],
        thumbnail_url: {
          original: "/storybook/960x540.jpg",
          large: "/storybook/960x540.jpg",
        },
      })
    )
);

const mockRemoteFailed = rest.get(
  "https://nicovideo-gti-proxy.deno.dev/:id",
  (req, res, ctx) => res(ctx.status(404))
);

const mockAlreadyRegistered = graphql.query(
  RegisterNicovideoPage_AlreadyCheckDocument,
  (req, res, ctx) =>
    res(
      ctx.data({
        findNicovideoVideoSource: aNicovideoVideoSource({
          sourceId: "sm2057168",
          video: aVideo({
            id: "video:1",
            title:
              "M.C.ドナルドはダンスに夢中なのか？最終鬼畜道化師ドナルド・Ｍ",
            thumbnailUrl: "/storybook/960x540.jpg",
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
  render(args) {
    return (
      <UrqlProvider
        value={createUrqlClient({
          url: "/graphql",
          requestPolicy: "network-only",
        })}
      >
        <RegisterNicovideoForm {...args} />
      </UrqlProvider>
    );
  },
  parameters: {
    msw: {
      handlers: [
        mockLogin,
        mockRemoteSuccess,
        graphql.query(
          RegisterNicovideoPage_SearchTagCandidatesDocument,
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
                      tag: aTag({
                        id: `tag:2:${req.variables.query}`,
                        explicitParent: null,
                      }),
                    }),
                  ],
                }),
              })
            )
        ),
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
                registerVideo: aRegisterVideoPayload({
                  video: aVideo({
                    id: "video:1",
                    title: req.variables.input.primaryTitle,
                  }),
                }),
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
      handlers: [mockLogin, mockRemoteFailed],
    },
  },
  play: async () => {
    await userEvent.type(screen.getByLabelText("ID入力"), "sm2057168");
    await userEvent.click(screen.getByLabelText("検索"));
  },
};

export const Already: StoryObj<typeof RegisterNicovideoForm> = {
  name: "既にある",
  args: {},
  parameters: {
    msw: {
      handlers: [mockLogin, mockRemoteSuccess, mockAlreadyRegistered],
    },
  },
  play: async () => {
    await userEvent.type(screen.getByLabelText("ID入力"), "sm2057168");
    await userEvent.click(screen.getByLabelText("検索"));
  },
};

export const ValidId: StoryObj<typeof RegisterNicovideoForm> = {
  name: "正しいnicovideoのIDを入力",
  args: {},
  play: async () => {
    await userEvent.type(screen.getByLabelText("ID入力"), "sm2057168");
    await userEvent.click(screen.getByLabelText("検索"));
  },
};
