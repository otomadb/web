import { ResultOf } from "@graphql-typed-document-node/core";
import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { expect, fn } from "@storybook/test";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { graphql as mockGql } from "msw";

import { mockCommonMadBlockFragment } from "~/components/CommonMadBlock/index.stories";
import { makeFragmentData } from "~/gql";
import { isTest } from "~/test/isTest";

import { Current, FormModalContext } from "../..";
import SourceIDForm from ".";
import { AlreadyRegisteredFragment } from "./AlreadyRegistered";
import { AlreadyRequestedFragment } from "./AlreadyRequested";
import { queryFetchBilibili } from "./BilibiliConfirmForm";
import { queryFetchNicovideo } from "./NicovideoConfirmForm";
import { queryFetchSoundcloudByUrl } from "./SoundcloudConfirmForm";
import { queryFetchYoutube } from "./YoutubeConfirmForm";

const mkStory = (name: string, url: string, expected: unknown): Story => ({
  name,
  args: {
    mode: "request",
  },
  parameters: {
    openFormModal: fn(),
  },
  play: async ({ canvasElement, parameters }) => {
    if (isTest) return;

    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByRole("textbox"), url);
    await waitFor(() => {
      expect(canvas.getByRole("button", { name: "検索" })).toBeEnabled();
    });
    await userEvent.click(canvas.getByRole("button", { name: "検索" }));

    await waitFor(() => {
      expect(
        canvas.getByRole("button", { name: "リクエストする" })
      ).toBeEnabled();
    });
    canvas.getByRole("button", { name: "リクエストする" }).click();

    await waitFor(() => {
      expect(parameters.openFormModal).toBeCalledWith({
        type: (expected as any).type,
        props: expect.anything(),
      });
    });
  },
});

const meta = {
  component: SourceIDForm,
  args: {
    mode: "register",
    style: { width: 512, height: 384 },
  },
  decorators: [
    (Story, { parameters }) => {
      return (
        <FormModalContext.Provider
          value={{
            current: undefined,
            open:
              typeof parameters.openFormModal === "function"
                ? parameters.openFormModal
                : action("Open form modal"),
            close: action("Close form modal"),
          }}
        >
          <Story />
        </FormModalContext.Provider>
      );
    },
  ],
  parameters: {
    msw: {
      handlers: [
        mockGql.query(queryFetchNicovideo, (req, res, ctx) =>
          res(
            ctx.data({
              fetchNicovideo: {
                source: {
                  sourceId: "sm2057168",
                  url: "https://www.nicovideo.jp/watch/sm2057168",
                  info: {
                    title: "Title",
                    thumbnailUrl: "/thumbnail.jpg",
                  },
                },
              },
            })
          )
        ),
        mockGql.query(queryFetchYoutube, (req, res, ctx) =>
          res(
            ctx.data({
              fetchYoutube: {
                source: {
                  url: "https://www.youtube.com/watch?v=Q16KpquGsIc",
                  thumbnailUrl: "/thumbnail.jpg",
                  sourceId: "Q16KpquGsIc",
                },
              },
            })
          )
        ),
        mockGql.query(queryFetchBilibili, (req, res, ctx) =>
          res(
            ctx.data({
              fetchBilibili: {
                source: {
                  sourceId: "BV1xx411c7mu",
                  thumbnailUrl: "/thumbnail.jpg",
                  title: "Title",
                  url: "https://www.bilibili.com/video/BV1xx411c7mu",
                },
              },
            })
          )
        ),
        mockGql.query(queryFetchSoundcloudByUrl, (req, res, ctx) =>
          res(
            ctx.data({
              fetchSoundcloudByUrl: {
                source: {
                  originalThumbnailUrl: "/thumbnail.jpg",
                  title: "Title",
                  url: "https://soundcloud.com/keigoooo/hyperflip-donaldcore",
                },
              },
            })
          )
        ),
      ],
    },
  },
} as Meta<typeof SourceIDForm>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const RegisterNicovideo: Story = {
  name: "ニコニコ動画から登録する",
  args: {
    initProp: {
      type: "nicovideo",
      sourceId: "sm2057168",
    },
    mode: "register",
  },
  parameters: {
    openFormModal: fn(),
  },
  play: async ({ canvasElement, parameters }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(canvas.getByRole("button", { name: "登録する" })).toBeEnabled();
    });

    canvas.getByRole("button", { name: "登録する" }).click();

    await waitFor(() => {
      expect(parameters.openFormModal).toBeCalledWith({
        type: "REGISTER_FROM_NICOVIDEO",
        props: expect.objectContaining({
          sourceFragment: expect.anything(),
          requestFragment: undefined,
        }),
      });
    });
  },
};

export const RequestNicovideo: Story = {
  name: "ニコニコ動画からリクエストする",
  args: {
    initProp: {
      type: "nicovideo",
      sourceId: "sm2057168",
    },
    mode: "request",
  },
  parameters: {
    openFormModal: fn(),
  },
  play: async ({ canvasElement, parameters }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(
        canvas.getByRole("button", { name: "リクエストする" })
      ).toBeEnabled();
    });

    canvas.getByRole("button", { name: "リクエストする" }).click();

    await waitFor(() => {
      expect(parameters.openFormModal).toBeCalledWith({
        type: "REQUEST_FROM_NICOVIDEO",
        props: expect.objectContaining({
          sourceFragment: expect.anything(),
        }),
      });
    });
  },
};

export const NicovideoAlreadyRegistered: Story = {
  name: "ニコニコ動画から既に登録済み",
  args: {
    initProp: {
      type: "nicovideo",
      sourceId: "sm2057168",
    },
  },
  parameters: {
    msw: {
      handlers: [
        mockGql.query(queryFetchNicovideo, (req, res, ctx) =>
          res(
            ctx.data({
              findNicovideoVideoSource: {
                id: "1",
                ...makeFragmentData(
                  {
                    sourceId: "sm2057168",
                    video: {
                      id: "video:1",
                      ...mockCommonMadBlockFragment({
                        id: "video:1",
                        title: "Video 1",
                        serial: 1,
                      }),
                    },
                  },
                  AlreadyRegisteredFragment
                ),
              } as ResultOf<
                typeof queryFetchNicovideo
              >["findNicovideoVideoSource"],
            } as ResultOf<typeof queryFetchNicovideo>)
          )
        ),
      ],
    },
  },
};

export const NicovideoAlreadyRequested: Story = {
  name: "ニコニコ動画から既にリクエスト済み",
  args: {
    mode: "request",
    initProp: {
      type: "nicovideo",
      sourceId: "sm2057168",
    },
  },
  parameters: {
    msw: {
      handlers: [
        mockGql.query(queryFetchNicovideo, (req, res, ctx) =>
          res(
            ctx.data({
              findNicovideoRegistrationRequest: {
                id: "1",
                ...makeFragmentData(
                  {
                    __typename: "NicovideoRegistrationRequest",
                    title: "Video 1",
                    thumbnailUrl: "/thumbnail.jpg",
                    sourceId: "sm2057168",
                  } as ResultOf<typeof AlreadyRequestedFragment>,
                  AlreadyRequestedFragment
                ),
              } as ResultOf<
                typeof queryFetchNicovideo
              >["findNicovideoRegistrationRequest"],
            } as ResultOf<typeof queryFetchNicovideo>)
          )
        ),
      ],
    },
  },
};

export const NicovideoLoading: Story = {
  name: "ニコニコ動画から情報取得中",
  args: {
    initProp: {
      type: "nicovideo",
      sourceId: "sm2057168",
    },
  },
  parameters: {
    msw: {
      handlers: [
        mockGql.query(queryFetchNicovideo, (req, res, ctx) =>
          res(ctx.delay("infinite"))
        ),
      ],
    },
  },
};

export const NicovideoNoSource: Story = {
  name: "ニコニコ動画からの情報が無い",
  args: {
    initProp: {
      type: "nicovideo",
      sourceId: "sm2057168",
    },
  },
  parameters: {
    msw: {
      handlers: [
        mockGql.query(queryFetchNicovideo, (req, res, ctx) =>
          res(ctx.data({ fetchNicovideo: { source: null } }))
        ),
      ],
    },
  },
};

export const Nicovideo1 = mkStory(
  "www.nicovideo.jpから",
  "https://www.nicovideo.jp/watch/sm2057168",
  {
    type: "REQUEST_FROM_NICOVIDEO",
    sourceId: "sm2057168",
  }
);

export const Nicovideo2 = mkStory("ニコニコ動画のIDから", "sm2057168", {
  type: "REQUEST_FROM_NICOVIDEO",
  sourceId: "sm2057168",
});

export const Nicovideo3 = mkStory("nico.msから", "https://nico.ms/sm2057168", {
  type: "REQUEST_FROM_NICOVIDEO",
  sourceId: "sm2057168",
});

export const RegisterYoutube: Story = {
  name: "Youtubeから登録する",
  args: {
    initProp: {
      type: "youtube",
      sourceId: "Q16KpquGsIc",
    },
    mode: "register",
  },
  parameters: {
    openFormModal: fn(),
  },
  play: async ({ canvasElement, parameters }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(canvas.getByRole("button", { name: "登録する" })).toBeEnabled();
    });

    canvas.getByRole("button", { name: "登録する" }).click();

    await waitFor(() => {
      expect(parameters.openFormModal).toBeCalledWith({
        type: "REGISTER_FROM_YOUTUBE",
        props: expect.objectContaining({
          sourceFragment: expect.anything(),
          requestFragment: undefined,
        }),
      });
    });
  },
};

export const RequestYoutube: Story = {
  name: "Youtubeからリクエストする",
  args: {
    initProp: {
      type: "youtube",
      sourceId: "Q16KpquGsIc",
    },
    mode: "request",
  },
  parameters: {
    openFormModal: fn(),
  },
  play: async ({ canvasElement, parameters }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(
        canvas.getByRole("button", { name: "リクエストする" })
      ).toBeEnabled();
    });

    canvas.getByRole("button", { name: "リクエストする" }).click();

    await waitFor(() => {
      expect(parameters.openFormModal).toBeCalledWith({
        type: "REQUEST_FROM_YOUTUBE",
        props: expect.objectContaining({
          sourceFragment: expect.anything(),
        }),
      });
    });
  },
};

export const YoutubeAlreadyRegistered: Story = {
  name: "Youtubeから既に登録済み",
  args: {
    initProp: {
      type: "youtube",
      sourceId: "Q16KpquGsIc",
    },
  },
  parameters: {
    msw: {
      handlers: [
        mockGql.query(queryFetchYoutube, (req, res, ctx) =>
          res(
            ctx.data({
              findYoutubeVideoSource: {
                id: "1",
                ...makeFragmentData(
                  {
                    sourceId: "Q16KpquGsIc",
                    video: {
                      id: "video:1",
                      ...mockCommonMadBlockFragment({
                        id: "video:1",
                        title: "Video 1",
                        serial: 1,
                      }),
                    },
                  },
                  AlreadyRegisteredFragment
                ),
              } as ResultOf<typeof queryFetchYoutube>["findYoutubeVideoSource"],
            } as ResultOf<typeof queryFetchYoutube>)
          )
        ),
      ],
    },
  },
};

export const YoutubeAlreadyRequested: Story = {
  name: "Youtubeから既にリクエスト済み",
  args: {
    mode: "request",
    initProp: {
      type: "youtube",
      sourceId: "Q16KpquGsIc",
    },
  },
  parameters: {
    msw: {
      handlers: [
        mockGql.query(queryFetchYoutube, (req, res, ctx) =>
          res(
            ctx.data({
              findYoutubeRegistrationRequest: {
                id: "1",
                ...makeFragmentData(
                  {
                    __typename: "YoutubeRegistrationRequest",
                    title: "Video 1",
                    thumbnailUrl: "/thumbnail.jpg",
                    sourceId: "Q16KpquGsIc",
                  } as ResultOf<typeof AlreadyRequestedFragment>,
                  AlreadyRequestedFragment
                ),
              } as ResultOf<
                typeof queryFetchYoutube
              >["findYoutubeRegistrationRequest"],
            } as ResultOf<typeof queryFetchYoutube>)
          )
        ),
      ],
    },
  },
};

export const YoutubeLoading: Story = {
  name: "Youtubeから情報取得中",
  args: {
    initProp: {
      type: "youtube",
      sourceId: "Q16KpquGsIc",
    },
  },
  parameters: {
    msw: {
      handlers: [
        mockGql.query(queryFetchYoutube, (req, res, ctx) =>
          res(ctx.delay("infinite"))
        ),
      ],
    },
  },
};

export const YoutubeNoSource: Story = {
  name: "Youtubeからの情報が無い",
  args: {
    initProp: {
      type: "youtube",
      sourceId: "Q16KpquGsIc",
    },
  },
  parameters: {
    msw: {
      handlers: [
        mockGql.query(queryFetchYoutube, (req, res, ctx) =>
          res(ctx.data({ fetchYoutube: { source: null } }))
        ),
      ],
    },
  },
};

export const Youtube1 = mkStory("Youtubeの動画IDから", "Q16KpquGsIc", {
  type: "REQUEST_FROM_YOUTUBE",
  sourceId: "Q16KpquGsIc",
});

export const Youtube2 = mkStory(
  "www.youtube.comから",
  "https://www.youtube.com/watch?v=Q16KpquGsIc",
  {
    type: "REQUEST_FROM_YOUTUBE",
    sourceId: "Q16KpquGsIc",
  }
);

export const Youtube3 = mkStory("youtu.beから", "http://youtu.be/Q16KpquGsIc", {
  type: "REQUEST_FROM_YOUTUBE",
  sourceId: "Q16KpquGsIc",
});

export const RegisterSoundcloud: Story = {
  name: "SoundCloudから登録する",
  args: {
    initProp: {
      type: "soundcloud",
      url: "https://soundcloud.com/keigoooo/hyperflip-donaldcore",
    },
    mode: "register",
  },
  parameters: {
    openFormModal: fn(),
  },
  play: async ({ canvasElement, parameters }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(canvas.getByRole("button", { name: "登録する" })).toBeEnabled();
    });

    canvas.getByRole("button", { name: "登録する" }).click();

    await waitFor(() => {
      expect(parameters.openFormModal).toBeCalledWith({
        type: "REGISTER_FROM_SOUNDCLOUD",
        props: expect.objectContaining({
          sourceFragment: expect.anything(),
          requestFragment: undefined,
        }),
      });
    });
  },
};

export const RequestSoundcloud: Story = {
  name: "SoundCloudからリクエストする",
  args: {
    initProp: {
      type: "soundcloud",
      url: "https://soundcloud.com/keigoooo/hyperflip-donaldcore",
    },
    mode: "request",
  },
  parameters: {
    openFormModal: fn(),
  },
  play: async ({ canvasElement, parameters }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(
        canvas.getByRole("button", { name: "リクエストする" })
      ).toBeEnabled();
    });

    canvas.getByRole("button", { name: "リクエストする" }).click();

    await waitFor(() => {
      expect(parameters.openFormModal).toBeCalledWith({
        type: "REQUEST_FROM_SOUNDCLOUD",
        props: expect.objectContaining({
          sourceFragment: expect.anything(),
        }),
      } satisfies Current);
    });
  },
};

export const SoundcloudAlreadyRegistered: Story = {
  name: "SoundCloudから既に登録済み",
  args: {
    initProp: {
      type: "soundcloud",
      url: "https://soundcloud.com/keigoooo/hyperflip-donaldcore",
    },
    mode: "register",
  },
  parameters: {
    msw: {
      handlers: [
        mockGql.query(queryFetchSoundcloudByUrl, (req, res, ctx) =>
          res(
            ctx.data({
              findSoundcloudMADSourceByUrl: {
                id: "1",
                ...makeFragmentData(
                  {
                    sourceId: "Q16KpquGsIc",
                    video: {
                      id: "video:1",
                      ...mockCommonMadBlockFragment({
                        id: "video:1",
                        title: "Video 1",
                        serial: 1,
                      }),
                    },
                  },
                  AlreadyRegisteredFragment
                ),
              } as ResultOf<
                typeof queryFetchSoundcloudByUrl
              >["findSoundcloudMADSourceByUrl"],
            } as ResultOf<typeof queryFetchSoundcloudByUrl>)
          )
        ),
      ],
    },
  },
};

export const SoundcloudAlreadyRequested: Story = {
  name: "SoundCloudから既にリクエスト済み",
  args: {
    initProp: {
      type: "soundcloud",
      url: "https://soundcloud.com/keigoooo/hyperflip-donaldcore",
    },
    mode: "request",
  },
  parameters: {
    msw: {
      handlers: [
        mockGql.query(queryFetchSoundcloudByUrl, (req, res, ctx) =>
          res(
            ctx.data({
              findSoundcloudRegistrationRequestByUrl: {
                id: "1",
                ...makeFragmentData(
                  {
                    __typename: "SoundcloudRegistrationRequest",
                    title: "Video 1",
                    thumbnailUrl: "/thumbnail.jpg",
                    sourceId: "Q16KpquGsIc",
                  } as ResultOf<typeof AlreadyRequestedFragment>,
                  AlreadyRequestedFragment
                ),
              } as ResultOf<
                typeof queryFetchSoundcloudByUrl
              >["findSoundcloudRegistrationRequestByUrl"],
            } as ResultOf<typeof queryFetchSoundcloudByUrl>)
          )
        ),
      ],
    },
  },
};

export const SoundcloudLoading: Story = {
  name: "SoundCloudから情報取得中",
  args: {
    initProp: {
      type: "soundcloud",
      url: "https://soundcloud.com/keigoooo/hyperflip-donaldcore",
    },
  },
  parameters: {
    msw: {
      handlers: [
        mockGql.query(queryFetchSoundcloudByUrl, (req, res, ctx) =>
          res(ctx.delay("infinite"))
        ),
      ],
    },
  },
};

export const SoundcloudNoSource: Story = {
  name: "SoundCloudからの情報が無い",
  args: {
    initProp: {
      type: "soundcloud",
      url: "https://soundcloud.com/keigoooo/hyperflip-donaldcore",
    },
  },
  parameters: {
    msw: {
      handlers: [
        mockGql.query(queryFetchSoundcloudByUrl, (req, res, ctx) =>
          res(ctx.data({ fetchSoundcloudByUrl: { source: null } }))
        ),
      ],
    },
  },
};

export const Soundcloud1 = mkStory(
  "SoundCloudの投稿者/曲名から",
  "keigoooo/hyperflip-donaldcore",
  {
    type: "REQUEST_FROM_SOUNDCLOUD",
    url: "https://soundcloud.com/keigoooo/hyperflip-donaldcore",
  }
);

export const Soundcloud2 = mkStory(
  "SoundCloudのURLから",
  "keigoooo/hyperflip-donaldcore",
  {
    type: "REQUEST_FROM_SOUNDCLOUD",
    url: "https://soundcloud.com/keigoooo/hyperflip-donaldcore",
  }
);

export const Soundcloud3 = mkStory(
  "SoundCloudのURLから",
  "https://soundcloud.com/keigoooo/hyperflip-donaldcore?in=sno2wman/sets/mad",
  {
    type: "REQUEST_FROM_SOUNDCLOUD",
    url: "https://soundcloud.com/keigoooo/hyperflip-donaldcore",
  }
);

export const RegisterBilibili: Story = {
  name: "Bilibiliから登録する",
  args: {
    initProp: {
      type: "bilibili",
      sourceId: "BV1xx411c7mu",
    },
    mode: "register",
  },
  parameters: {
    openFormModal: fn(),
  },
  play: async ({ canvasElement, parameters }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(canvas.getByRole("button", { name: "登録する" })).toBeEnabled();
    });

    canvas.getByRole("button", { name: "登録する" }).click();

    await waitFor(() => {
      expect(parameters.openFormModal).toBeCalledWith({
        type: "REGISTER_FROM_BILIBILI",
        props: expect.objectContaining({
          sourceFragment: expect.anything(),
          requestFragment: undefined,
        }),
      });
    });
  },
};

export const RequestBilibili: Story = {
  name: "Bilibiliからリクエストする",
  args: {
    initProp: {
      type: "bilibili",
      sourceId: "BV1xx411c7mu",
    },
    mode: "request",
  },
  parameters: {
    openFormModal: fn(),
  },
  play: async ({ canvasElement, parameters }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(
        canvas.getByRole("button", { name: "リクエストする" })
      ).toBeEnabled();
    });

    canvas.getByRole("button", { name: "リクエストする" }).click();

    await waitFor(() => {
      expect(parameters.openFormModal).toBeCalledWith({
        type: "REQUEST_FROM_BILIBILI",
        props: expect.objectContaining({
          sourceFragment: expect.anything(),
        }),
      } satisfies Current);
    });
  },
};

export const BilibiliAlreadyRegistered: Story = {
  name: "Bilibiliから既に登録済み",
  args: {
    initProp: {
      type: "bilibili",
      sourceId: "BV1xx411c7mu",
    },
    mode: "register",
  },
  parameters: {
    msw: {
      handlers: [
        mockGql.query(queryFetchBilibili, (req, res, ctx) =>
          res(
            ctx.data({
              findBilibiliMADSource: {
                id: "1",
                ...makeFragmentData(
                  {
                    sourceId: "Q16KpquGsIc",
                    video: {
                      id: "video:1",
                      ...mockCommonMadBlockFragment({
                        id: "video:1",
                        title: "Video 1",
                        serial: 1,
                      }),
                    },
                  },
                  AlreadyRegisteredFragment
                ),
              } as ResultOf<typeof queryFetchBilibili>["findBilibiliMADSource"],
            } as ResultOf<typeof queryFetchBilibili>)
          )
        ),
      ],
    },
  },
};

export const BilibiliAlreadyRequested: Story = {
  name: "Bilibiliから既にリクエスト済み",
  args: {
    initProp: {
      type: "bilibili",
      sourceId: "BV1xx411c7mu",
    },
    mode: "request",
  },
  parameters: {
    msw: {
      handlers: [
        mockGql.query(queryFetchBilibili, (req, res, ctx) =>
          res(
            ctx.data({
              findBilibiliRegistrationRequestBySourceId: {
                id: "1",
                ...makeFragmentData(
                  {
                    __typename: "BilibiliRegistrationRequest",
                    title: "Video 1",
                    thumbnailUrl: "/thumbnail.jpg",
                    sourceId: "Q16KpquGsIc",
                  } as ResultOf<typeof AlreadyRequestedFragment>,
                  AlreadyRequestedFragment
                ),
              } as ResultOf<
                typeof queryFetchBilibili
              >["findBilibiliRegistrationRequestBySourceId"],
            } as ResultOf<typeof queryFetchBilibili>)
          )
        ),
      ],
    },
  },
};

export const BilibiliLoading: Story = {
  name: "Bilibiliから情報取得中",
  args: {
    initProp: {
      type: "bilibili",
      sourceId: "BV1xx411c7mu",
    },
  },
  parameters: {
    msw: {
      handlers: [
        mockGql.query(queryFetchBilibili, (req, res, ctx) =>
          res(ctx.delay("infinite"))
        ),
      ],
    },
  },
};

export const BilibiliNoSource: Story = {
  name: "Bilibiliからの情報が無い",
  args: {
    initProp: {
      type: "bilibili",
      sourceId: "BV1xx411c7mu",
    },
  },
  parameters: {
    msw: {
      handlers: [
        mockGql.query(queryFetchBilibili, (req, res, ctx) =>
          res(ctx.data({ fetchBilibili: { source: null } }))
        ),
      ],
    },
  },
};

export const Bilibili1 = mkStory("Bilibiliの動画IDから", "BV1xx411c7mu", {
  type: "REQUEST_FROM_BILIBILI",
  sourceId: "BV1xx411c7mu",
});

export const Bilibili2 = mkStory(
  "www.bilibili.comから",
  "https://www.bilibili.com/video/BV1xx411c7mu",
  {
    type: "REQUEST_FROM_BILIBILI",
    sourceId: "BV1xx411c7mu",
  }
);
