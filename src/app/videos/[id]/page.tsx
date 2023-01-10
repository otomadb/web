import clsx from "clsx";

import { DetailsSection } from "~/components/Videos/DetailsSection";
import { HistorySection } from "~/components/Videos/HistorySection";
import { SemitagsSection } from "~/components/Videos/SemitagsSection";
import { SimilarVideosSection } from "~/components/Videos/SimilarVideosSection";
import { TagsSection } from "~/components/Videos/TagsSection";
import { getFragment, graphql } from "~/gql";
import {
  VideoPage_DetailsSectionFragmentDoc,
  VideoPage_HistorySectionFragmentDoc,
  VideoPage_SemitagsSectionFragmentDoc,
  VideoPage_SimilarVideosSectionFragmentDoc,
  VideoPage_TagsSectionFragmentDoc,
} from "~/gql/graphql";
import { gqlRequest } from "~/utils/gqlRequest";

export async function generateStaticParams() {
  const { findVideos } = await gqlRequest(
    graphql(`
      query VideoPagePaths {
        findVideos(input: { limit: 96, order: { updatedAt: DESC } }) {
          nodes {
            id
          }
        }
      }
    `)
  );
  return findVideos.nodes.map(({ id }) => ({ id }));
}

export default async function Page({ params }: { params: { id: string } }) {
  const { video } = await gqlRequest(
    graphql(`
      query VideoPage($id: ID!) {
        video(id: $id) {
          id
          ...VideoPage_DetailsSection
          ...VideoPage_TagsSection
          ...VideoPage_SemitagsSection
          ...VideoPage_SimilarVideosSection
          ...VideoPage_HistorySection
        }
      }
    `),
    { id: params.id }
  );

  const details = getFragment(VideoPage_DetailsSectionFragmentDoc, video);
  const tags = getFragment(VideoPage_TagsSectionFragmentDoc, video);
  const semitags = getFragment(VideoPage_SemitagsSectionFragmentDoc, video);
  const similarVideos = getFragment(
    VideoPage_SimilarVideosSectionFragmentDoc,
    video
  );
  const history = getFragment(VideoPage_HistorySectionFragmentDoc, video);

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
        <TagsSection className={clsx(["w-full"])} fallback={tags} />
        <SemitagsSection className={clsx(["w-full"])} fallback={semitags} />
      </div>
      <div className={clsx(["flex-grow"])}>
        <DetailsSection fallback={details} />
        <div className={clsx(["mt-4"], ["space-y-2"])}>
          <div className={clsx(["block", "lg:hidden"], ["space-y-2"])}>
            <TagsSection fallback={tags} />
            <SemitagsSection fallback={semitags} />
          </div>
          <SimilarVideosSection className={clsx()} fallback={similarVideos} />
          <HistorySection className={clsx()} fallback={history} />
        </div>
      </div>
    </div>
  );
}
