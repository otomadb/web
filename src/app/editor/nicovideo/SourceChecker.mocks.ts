import { graphql } from "msw";

import {
  RegisterNicovideoPage_SourceCheckerDocument,
  TagType,
} from "~/gql/graphql";
import {
  aNicovideoOriginalSource,
  aNicovideoOriginalSourceTagSearchTagsPayload,
  aNicovideoVideoSource,
  aTag,
  aTagSearchItemByName,
  aVideo,
} from "~/gql/mock";

const source = aNicovideoOriginalSource({
  sourceId: "sm2057168",
  title: "M.C.ドナルドはダンスに夢中なのか？最終鬼畜道化師ドナルド・Ｍ",
  thumbnailUrl: "/960x540.jpg",
  tags: [
    {
      name: "ドナルド",
      searchTags: aNicovideoOriginalSourceTagSearchTagsPayload({
        items: [
          aTagSearchItemByName({
            tag: aTag({
              id: "t1",
              name: "ドナルド・マクドナルド",
              explicitParent: null,
              type: TagType.Character,
            }),
          }),
        ],
      }),
    },
    {
      name: "U.N.オーエンは彼女なのか？",
      searchTags: aNicovideoOriginalSourceTagSearchTagsPayload({
        items: [
          aTagSearchItemByName({
            tag: aTag({
              id: "t2",
              name: "U.N.オーエンは彼女なのか？",
              explicitParent: null,
              type: TagType.Music,
            }),
          }),
        ],
      }),
    },
    {
      name: "最終鬼畜妹フランドール・Ｓ",
      searchTags: aNicovideoOriginalSourceTagSearchTagsPayload({
        items: [
          aTagSearchItemByName({
            tag: aTag({
              id: "t3",
              name: "最終鬼畜妹フランドール・Ｓ",
              explicitParent: null,
              type: TagType.Music,
            }),
          }),
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
        items: [
          aTagSearchItemByName({
            tag: aTag({
              id: "t1",
              name: "ドナルド・マクドナルド",
              explicitParent: null,
              type: TagType.Character,
            }),
          }),
          aTagSearchItemByName({
            tag: aTag({
              id: "t4",
              name: "東方Project",
              explicitParent: null,
              type: TagType.Unknown,
            }),
          }),
        ],
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
        items: [
          aTagSearchItemByName({
            tag: aTag({
              id: "t1",
              name: "ドナルド・マクドナルド",
              explicitParent: null,
              type: TagType.Character,
            }),
          }),
        ],
      }),
    },
  ],
});

export const mockSourceAlreadyExists = graphql.query(
  RegisterNicovideoPage_SourceCheckerDocument,
  (req, res, ctx) =>
    res(
      ctx.data({
        fetchNicovideo: { source },
        findNicovideoVideoSource: aNicovideoVideoSource({
          sourceId: "sm2057168",
          video: aVideo({
            title:
              "M.C.ドナルドはダンスに夢中なのか？最終鬼畜道化師ドナルド・Ｍ",
            thumbnailUrl: "/960x540.jpg",
          }),
        }),
      })
    )
);

export const mockSourceNotExistsYet = graphql.query(
  RegisterNicovideoPage_SourceCheckerDocument,
  (req, res, ctx) =>
    res(
      ctx.data({
        fetchNicovideo: { source },
        findNicovideoVideoSource: null,
      })
    )
);
