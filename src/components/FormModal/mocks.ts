import { graphql as mswGql } from "msw";

import { Fragment as CommonTagFragment } from "~/components/CommonTag";
import { Query as RequestFromNicovideoFormCheckQuery } from "~/components/Form/RequestMAD/FromNicovideo";
import { Query as RegisterFromNicovideoFormCheckQuery } from "~/components/RegisterFromNicovideoForm";
import { Fragment as SourceFragment } from "~/components/RegisterFromNicovideoForm/OriginalSource";
import { Fragment as RegReqFragment } from "~/components/RegisterFromNicovideoForm/Request";
import { Fragment as UserIconFragment } from "~/components/UserIcon";
import { makeFragmentData } from "~/gql";
import { TagType } from "~/gql/graphql";

export const mocksRegisterFromNicovideo = [
  mswGql.query(RegisterFromNicovideoFormCheckQuery, (req, res, ctx) =>
    res(
      ctx.data({
        fetchNicovideo: {
          source: {
            title: "Title",
            thumbnailUrl: "/960x540.jpg",
            ...makeFragmentData(
              {
                title: "Title",
                sourceId: "sm2057168",
                url: "https://www.nicovideo.jp/watch/sm2057168",
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
              SourceFragment
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
            RegReqFragment
          ),
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
            title: "Title",
            thumbnailUrl: "/960x540.jpg",
            ...makeFragmentData(
              {
                title: "Title",
                sourceId: "sm2057168",
                url: "https://www.nicovideo.jp/watch/sm2057168",
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
              SourceFragment
            ),
          },
        },
      })
    )
  ),
];
