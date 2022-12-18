import { Meta, StoryObj } from "@storybook/react";
import { screen, userEvent } from "@storybook/testing-library";
import { graphql, rest } from "msw";
import {
  createClient as createUrqlClient,
  Provider as UrqlProvider,
} from "urql";

import {
  aSearchTagsPayload,
  aSearchTagsResultItem,
  aTag,
  aUser,
  RegisterNicovideoPage_ExactTagDocument,
  RegisterNicovideoPage_SearchTagCandidatesDocument,
  ViewerDocument,
} from "~/gql/graphql";

import { Form2 } from "./Form2";

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

export default {
  component: Form2,
  render(args) {
    return (
      <UrqlProvider
        value={createUrqlClient({
          url: "/graphql",
          requestPolicy: "network-only",
        })}
      >
        <Form2 {...args} />
      </UrqlProvider>
    );
  },
  parameters: {
    msw: {
      handlers: [
        mockLogin,
        rest.get("https://nicovideo-gti-proxy.deno.dev/:id", (req, res, ctx) =>
          res(
            ctx.json({
              id: req.params["id"],
              title:
                "M.C.ドナルドはダンスに夢中なのか？最終鬼畜道化師ドナルド・Ｍ",
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
        ),
        graphql.query(
          RegisterNicovideoPage_SearchTagCandidatesDocument,
          (req, res, ctx) =>
            res(
              ctx.data({
                searchTags: aSearchTagsPayload({
                  result: [
                    aSearchTagsResultItem({
                      matchedName: req.variables.query,
                      tag: aTag({
                        id: `tag:1:${req.variables.query}`,
                        name: req.variables.query,
                        explicitParent: null,
                      }),
                    }),
                    aSearchTagsResultItem({
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
      ],
    },
  },
} as Meta<typeof Form2>;

export const Primary: StoryObj<typeof Form2> = {
  args: {},
};

export const Unlogin: StoryObj<typeof Form2> = {
  name: "未ログイン",
  args: {},
  parameters: {
    msw: {
      handlers: [mockUnlogin],
    },
  },
};

export const NoRemote: StoryObj<typeof Form2> = {
  name: "リモートからの取得に失敗",
  args: {},
  parameters: {
    msw: {
      handlers: [
        mockLogin,
        rest.get("https://nicovideo-gti-proxy.deno.dev/:id", (req, res, ctx) =>
          res(ctx.status(404))
        ),
      ],
    },
  },
  play: async () => {
    await userEvent.type(screen.getByLabelText("ID入力"), "sm2057168");
    await userEvent.click(screen.getByLabelText("検索"));
  },
};

export const ValidId: StoryObj<typeof Form2> = {
  name: "正しいnicovideoのIDを入力",
  args: {},
  play: async () => {
    await userEvent.type(screen.getByLabelText("ID入力"), "sm2057168");
    await userEvent.click(screen.getByLabelText("検索"));
  },
};
