import clsx from "clsx";

import { Inner as Details } from "~/components/Videos/Details/Inner";
import { Inner as Semitags } from "~/components/Videos/Semitags/Inner";
import { Inner as Tags } from "~/components/Videos/Tags/Inner";
import { getFragment, graphql } from "~/gql";
import {
  VideoPage_DetailsSectionFragmentDoc,
  VideoPage_SemitagsSectionFragmentDoc,
  VideoPage_TagsSectionFragmentDoc,
} from "~/gql/graphql";
import { gqlRequest } from "~/utils/gqlRequest";

import { History } from "./History";
import { SimilarVideos } from "./SimilarVideos";

export const revalidate = 0;

export default async function Page({ params }: { params: { id: string } }) {
  const { video } = await gqlRequest(
    graphql(`
      query VideoPage($id: ID!) {
        video(id: $id) {
          id
          ...VideoPage_DetailsSection
          ...VideoPage_TagsSection
          ...VideoPage_SemitagsSection
          ...VideoPage_SimilarVideos
          ...VideoPage_History
        }
      }
    `),
    { id: `video:${params.id}` }
  );

  const details = getFragment(VideoPage_DetailsSectionFragmentDoc, video);
  const tags = getFragment(VideoPage_TagsSectionFragmentDoc, video);
  const semitags = getFragment(VideoPage_SemitagsSectionFragmentDoc, video);

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
        <Tags className={clsx(["w-full"])} fallback={tags} />
        <Semitags className={clsx(["w-full"])} fallback={semitags} />
      </div>
      <div className={clsx(["flex-grow"])}>
        <Details fallback={details} />
        <div className={clsx(["mt-4"], ["space-y-2"])}>
          <div className={clsx(["block", "lg:hidden"], ["space-y-2"])}>
            <Tags fallback={tags} />
            <Semitags fallback={semitags} />
          </div>
          <SimilarVideos className={clsx()} fallback={video} />
          <History className={clsx()} fallback={video} />
        </div>
      </div>
    </div>
  );
}
