import clsx from "clsx";

import { Inner } from "~/components/Videos/Details/Inner";
import { Inner as Tags } from "~/components/Videos/Tags/Inner";
import { getFragment, graphql } from "~/gql";
import {
  VideoPage_DetailsSectionFragmentDoc,
  VideoPage_TagsSectionFragmentDoc,
} from "~/gql/graphql";
import { gqlRequest } from "~/utils/gqlRequest";

import { History } from "./History";
import { Semitags } from "./Semitags";
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
          ...VideoPage_Semitags
          ...VideoPage_SimilarVideos
          ...VideoPage_History
        }
      }
    `),
    { id: `video:${params.id}` }
  );

  const details = getFragment(VideoPage_DetailsSectionFragmentDoc, video);
  const tags = getFragment(VideoPage_TagsSectionFragmentDoc, video);

  return (
    <div className={clsx(["flex"], ["gap-x-4"])}>
      <div
        className={clsx(
          ["flex-shrink-0"],
          ["hidden", "md:block"],
          ["w-60", "lg:w-72"],
          ["space-y-4"]
        )}
      >
        <Tags className={clsx(["w-full"])} fallback={tags} />
        <Semitags className={clsx(["w-full"])} fallback={video} />
      </div>
      <div className={clsx(["flex-grow"])}>
        <Inner fallback={details} />
        <div className={clsx(["mt-4"], ["space-y-2"])}>
          <div className={clsx(["block", "md:hidden"], ["space-y-2"])}>
            <Tags fallback={tags} />
            <Semitags fallback={video} />
          </div>
          <SimilarVideos className={clsx()} fallback={video} />
          <History className={clsx()} fallback={video} />
        </div>
      </div>
    </div>
  );

  /*   <div className={clsx(["mt-4"], ["flex", "flex-col"])}>
      <span>Niconico</span>
      {details.sources.niconico.map(({ id, link, title, upload_date }) => (
        <div key={`niconico-${id}`} className={clsx(["flex"])}>
          <div>
            <a className={clsx(["text-blue-500"], ["underline"])} href={link}>
              {id}
            </a>
          </div>
          <div className={clsx(["ml-2"])}>
            <span>{title}</span>
          </div>
          <div className={clsx(["ml-2"])}>
            <time>{new Date(upload_date).toLocaleString()}</time>
          </div>
        </div>
      ))}
    </div>
  */
  /*
      <div className={clsx(["mt-8"])}>
        <span>親作品</span>
        <VideoList className={clsx(["mt-4"])} videos={details.parent_videos} />
      </div>
      <div className={clsx(["mt-8"])}>
        <span>関連</span>
        <VideoList className={clsx(["mt-4"])} videos={details.related_videos} />
      </div>
    */
}
