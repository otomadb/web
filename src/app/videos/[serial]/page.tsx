import clsx from "clsx";
import { notFound } from "next/navigation";

import { DetailsSection } from "~/components/pages/Video/DetailsSection";
import { SemitagsSection } from "~/components/pages/Video/SemitagsSection.server";
import { SimilarVideosSection } from "~/components/pages/Video/SimilarVideosSection";
import { TagsSection } from "~/components/pages/Video/TagsSection.server";
import { getFragment, graphql } from "~/gql";
import {
  VideoPage_DetailsSectionFragmentDoc,
  VideoPage_SimilarVideosSectionFragmentDoc,
} from "~/gql/graphql";
import { gqlRequest } from "~/utils/gqlRequest";

export async function generateStaticParams() {
  const { findVideos } = await gqlRequest(
    graphql(`
      query VideoPagePaths {
        findVideos(input: { limit: 96, order: { updatedAt: DESC } }) {
          nodes {
            id
            serial
          }
        }
      }
    `)
  );
  return findVideos.nodes.map(({ serial }) => ({
    serial: serial.toString(),
  }));
}

export default async function Page({ params }: { params: { serial: string } }) {
  const { findVideo: video } = await gqlRequest(
    graphql(`
      query VideoPage($serial: Int!) {
        findVideo(input: { serial: $serial }) {
          id
          ...VideoPage_DetailsSection
          ...VideoPage_SimilarVideosSection
        }
      }
    `),
    { serial: parseInt(params.serial, 10) }
  );

  if (!video) return notFound();

  const details = getFragment(VideoPage_DetailsSectionFragmentDoc, video);
  const similarVideos = getFragment(
    VideoPage_SimilarVideosSectionFragmentDoc,
    video
  );

  return (
    <div className={clsx(["flex"], ["gap-x-4"])}>
      <div
        className={clsx(
          ["flex-shrink-0"],
          ["hidden", "lg:block"],
          ["w-72"],
          ["space-y-4"]
        )}
      >
        {/* @ts-expect-error for Server Component*/}
        <TagsSection className={clsx(["w-full"])} videoId={video.id} />
        {/* @ts-expect-error for Server Component*/}
        <SemitagsSection className={clsx(["w-full"])} videoId={video.id} />
      </div>
      <div className={clsx(["flex-grow"])}>
        <DetailsSection fallback={details} />
        <div className={clsx(["mt-4"], ["space-y-2"])}>
          <div className={clsx(["block", "lg:hidden"], ["space-y-2"])}>
            {/* @ts-expect-error for Server Component*/}
            <TagsSection videoId={video.id} />
            {/* @ts-expect-error for Server Component*/}
            <SemitagsSection videoId={video.id} />
          </div>
          <SimilarVideosSection className={clsx()} fallback={similarVideos} />
        </div>
      </div>
    </div>
  );
}
