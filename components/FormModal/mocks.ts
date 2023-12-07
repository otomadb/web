import { graphql as mswGql } from "msw";

import { CommonTagFragment } from "~/components/CommonTag";
import { Query as RegisterFromBilibiliFormCheckQuery } from "~/components/Form/RegisterMAD/FromBilibili";
import { BilibiliRegisterOriginalSourceFragment as BilibiliOriginalSourceFragment } from "~/components/Form/RegisterMAD/FromBilibili/OriginalSource";
import { Query as RegisterFromNicovideoFormCheckQuery } from "~/components/Form/RegisterMAD/FromNicovideo";
import { NicovideoRegisterOriginalSourceFragment as NicovideoOriginalSourceFragment } from "~/components/Form/RegisterMAD/FromNicovideo/OriginalSource";
import { Fragment as NicovideoRegReqFragment } from "~/components/Form/RegisterMAD/FromNicovideo/Request";
import { Query as RegisterFromYoutubeFormCheckQuery } from "~/components/Form/RegisterMAD/FromYoutube";
import { YoutubeRegisterOriginalSourceFragment as YoutubeOriginalSourceFragment } from "~/components/Form/RegisterMAD/FromYoutube/OriginalSource";
import { Fragment as YoutubeRegReqFragment } from "~/components/Form/RegisterMAD/FromYoutube/Request";
import { Query as RequestFromNicovideoFormCheckQuery } from "~/components/Form/RequestMAD/FromNicovideo";
import { Fragment as UserIconFragment } from "~/components/UserIcon";
import { makeFragmentData } from "~/gql";
import { TagType } from "~/gql/graphql";

export const mocksRegisterFromNicovideo = [
  mswGql.query(RegisterFromNicovideoFormCheckQuery, (req, res, ctx) =>
    res(
      ctx.data({
        fetchNicovideo: {
          source: {
            info: {
              title: "Title",
              thumbnailUrl: "/960x540.jpg",
            },
            ...makeFragmentData(
              {
                sourceId: "sm2057168",
                url: "https://www.nicovideo.jp/watch/sm2057168",
                info: {
                  title: "Title",
                  thumbnailUrl: "/960x540.jpg",
                  tags: [...new Array(11)].map((_, i) => ({
                    name: `Tag ${i + 1}`,
                    searchTags: {
                      items: [...new Array(3)].map((_, j) => ({
                        tag: {
                          id: `tag:${j + 1}`,
                          ...makeFragmentData(
                            {
                              name: `Tag ${j + 1}`,
                              type: TagType.Character,
                              explicitParent: {
                                id: `tag:0`,
                                name: "Tag 0",
                              },
                            },
                            CommonTagFragment
                          ),
                        },
                      })),
                    },
                  })),
                },
              },
              NicovideoOriginalSourceFragment
            ),
          },
        },
        findNicovideoRegistrationRequest: {
          id: "reqreq:1",
          ...makeFragmentData(
            {
              title: "Title 1",
              checked: false,
              requestedBy: {
                id: "user:1",
                displayName: "User 1",
                ...makeFragmentData(
                  {
                    displayName: "User 1",
                    icon: "/512x512.png",
                  },
                  UserIconFragment
                ),
              } as never,
              taggings: [...new Array(10)].map((_, i) => ({
                id: `tagging:${i + 1}`,
                tag: {
                  id: `tag:${i + 1}`,
                  ...makeFragmentData(
                    {
                      name: `Tag ${i + 1}`,
                      type: TagType.Character,
                      explicitParent: {
                        id: `tag:0`,
                        name: "Tag 0",
                      },
                    },
                    CommonTagFragment
                  ),
                },
              })),
              semitaggings: [...new Array(10)].map((_, i) => ({
                id: `semitaggings:${i + 1}`,
                name: `Semitag ${i + 1}`,
              })),
            },
            NicovideoRegReqFragment
          ),
        },
      })
    )
  ),
];

export const mocksRegisterFromYoutube = [
  mswGql.query(RegisterFromYoutubeFormCheckQuery, (req, res, ctx) =>
    res(
      ctx.data({
        fetchYoutube: {
          source: {
            thumbnailUrl: "/960x540.jpg",
            ...makeFragmentData(
              {
                url: "https://www.Youtube.jp/watch?v=Q16KpquGsIc",
                thumbnailUrl: "/960x540.jpg",
                sourceId: "Q16KpquGsIc",
              },
              YoutubeOriginalSourceFragment
            ),
          },
        },
        findYoutubeRegistrationRequest: {
          id: "reqreq:1",
          ...makeFragmentData(
            {
              title: "Title 1",
              checked: false,
              requestedBy: {
                id: "user:1",
                displayName: "User 1",
                ...makeFragmentData(
                  {
                    displayName: "User 1",
                    icon: "/512x512.png",
                  },
                  UserIconFragment
                ),
              } as never,
              taggings: [...new Array(10)].map((_, i) => ({
                id: `tagging:${i + 1}`,
                tag: {
                  id: `tag:${i + 1}`,
                  ...makeFragmentData(
                    {
                      name: `Tag ${i + 1}`,
                      type: TagType.Character,
                      explicitParent: {
                        id: `tag:0`,
                        name: "Tag 0",
                      },
                    },
                    CommonTagFragment
                  ),
                },
              })),
              semitaggings: [...new Array(10)].map((_, i) => ({
                id: `semitaggings:${i + 1}`,
                name: `Semitag ${i + 1}`,
              })),
            },
            YoutubeRegReqFragment
          ),
        },
      })
    )
  ),
];

export const mocksRegisterFromBilibili = [
  mswGql.query(RegisterFromBilibiliFormCheckQuery, (req, res, ctx) =>
    res(
      ctx.data({
        fetchBilibili: {
          source: {
            title: "Title",
            originalThumbnailUrl: "/960x540.jpg",
            ...makeFragmentData(
              {
                title: "Title",
                sourceId: "BV1xx411c7mu",
                url: "https://www.bilibili.com/video/BV1xx411c7mu",
                thumbnailUrl: "/960x540.jpg",
                tags: [...new Array(10)].map((_, i) => ({
                  name: `Tag ${i + 1}`,
                  searchTags: {
                    items: [...new Array(3)].map((_, j) => ({
                      tag: {
                        id: `tag:${j + 1}`,
                        ...makeFragmentData(
                          {
                            name: `Tag ${j + 1}`,
                            type: TagType.Character,
                            explicitParent: {
                              id: `tag:0`,
                              name: "Tag 0",
                            },
                          },
                          CommonTagFragment
                        ),
                      },
                    })),
                  },
                })),
              },
              BilibiliOriginalSourceFragment
            ),
          } as never,
        },
      })
    )
  ),
];

export const mocksRequestFromNicovideo = [
  mswGql.query(RequestFromNicovideoFormCheckQuery, (req, res, ctx) =>
    res(
      ctx.data({
        findNicovideoRegistrationRequest: null,
        findNicovideoVideoSource: null,
        fetchNicovideo: {
          source: {
            info: {
              title: "Title",
              thumbnailUrl: "/960x540.jpg",
            },
            ...makeFragmentData(
              {
                sourceId: "sm2057168",
                url: "https://www.nicovideo.jp/watch/sm2057168",
                info: {
                  title: "Title",
                  thumbnailUrl: "/960x540.jpg",
                  tags: [...new Array(11)].map((_, i) => ({
                    name: `Tag ${i + 1}`,
                    searchTags: {
                      items: [...new Array(3)].map((_, j) => ({
                        tag: {
                          id: `tag:${j + 1}`,
                          ...makeFragmentData(
                            {
                              name: `Tag ${j + 1}`,
                              type: TagType.Character,
                              explicitParent: {
                                id: `tag:0`,
                                name: "Tag 0",
                              },
                            },
                            CommonTagFragment
                          ),
                        },
                      })),
                    },
                  })),
                },
              },
              NicovideoOriginalSourceFragment
            ),
          },
        },
      })
    )
  ),
];
