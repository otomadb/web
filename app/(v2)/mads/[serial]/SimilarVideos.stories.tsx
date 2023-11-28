import { Meta, StoryObj } from "@storybook/react";

import { TagPageLinkFragment } from "~/app/(application)/tags/[serial]/Link";
import { MadPageLinkFragment } from "~/app/(v2)/mads/[serial]/Link";
import { CommonTagFragment } from "~/components/CommonTag";
import { CommonTagLinkFragment } from "~/components/CommonTagLink";
import { Fragment } from "~/components/VideoThumbnail";
import { makeFragmentData } from "~/gql";
import { TagType } from "~/gql/graphql";

import { SimilarVideosPresentation } from "./SimilarVideos";

const meta = {
  component: SimilarVideosPresentation,
} satisfies Meta<typeof SimilarVideosPresentation>;
export default meta;

type Story = StoryObj<typeof meta>;

export const NoSimilar: Story = {
  name: "似ている動画が存在しない",
  args: {
    data: {
      getVideo: { similarVideos: { items: [] } },
    },
  },
};

export const Similars: Story = {
  name: "似ている動画が存在する",
  args: {
    data: {
      getVideo: {
        similarVideos: {
          items: [...new Array(12)].map(
            (_, i) =>
              ({
                to: {
                  id: `video:${i}`,
                  title: `Video ${i}`,
                  taggings: {
                    nodes: [...new Array(3)].map((_, j) => ({
                      id: `tagging:${i}:${j}`,
                      tag: {
                        id: `tag:${i}:${j}`,
                        ...makeFragmentData(
                          {
                            ...makeFragmentData(
                              { serial: i * 3 + j },
                              TagPageLinkFragment
                            ),
                            ...makeFragmentData(
                              {
                                name: `Tag ${i}.${j}`,
                                type: TagType.Character,
                              },
                              CommonTagFragment
                            ),
                          } as any, // eslint-disable-line @typescript-eslint/no-explicit-any -- Codegenが悪い
                          CommonTagLinkFragment
                        ),
                      },
                    })),
                  },
                  ...makeFragmentData({ serial: i }, MadPageLinkFragment),
                  ...makeFragmentData(
                    { title: `Video ${i}`, thumbnailUrl: "/thumbnail.jpg" },
                    Fragment
                  ),
                },
              }) as any // eslint-disable-line @typescript-eslint/no-explicit-any -- Codegenが悪い
          ),
        },
      },
    },
  },
};
