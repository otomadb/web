import clsx from "clsx";
import gqlRequest from "graphql-request";
import React from "react";

import { getFragment, graphql } from "~/gql";
import {
  VideoPage_VideoHistoryFragmentDoc,
  VideoPage_VideoTagsFragmentDoc,
  VideoPageDocument,
} from "~/gql/graphql";

import { HistorySection } from "./_components/History/Section";
import { SimilarVideosSection } from "./_components/SimilarVideos/Section";
import { TagsSection } from "./_components/Tags/Section";
import { VideoDetailsSection } from "./_components/VideoDetails/Section";
import { WholeProvider } from "./context";

export const revalidate = 0;

graphql(`
  query VideoPage($id: ID!) {
    video(id: $id) {
      id
      ...VideoPage_VideoTags
      ...VideoPage_VideoHistory
      title
      titles {
        title
        primary
      }
      thumbnailUrl
    }
  }
`);

export default async function Page({ params }: { params: { id: string } }) {
  const { video } = await gqlRequest(
    new URL("/graphql", process.env.NEXT_PUBLIC_API_ENDPOINT).toString(),
    VideoPageDocument,
    { id: `video:${params.id}` }
  );

  const { id: videoId, thumbnailUrl, title } = video;

  console.log(thumbnailUrl);

  const { tags } = getFragment(VideoPage_VideoTagsFragmentDoc, video);
  const { history } = getFragment(VideoPage_VideoHistoryFragmentDoc, video);

  return (
    <WholeProvider videoId={videoId} tags={tags} history={history}>
      <div className={clsx(["flex"], ["gap-x-4"], ["px-2"])}>
        <div
          className={clsx(
            ["flex-shrink-0"],
            ["hidden", "md:block"],
            ["w-60", "lg:w-80"]
          )}
        >
          <TagsSection className={clsx(["w-full"])} />
        </div>
        <div className={clsx(["flex-grow"])}>
          <VideoDetailsSection title={title} thumbnailUrl={thumbnailUrl} />
          <TagsSection className={clsx(["md:hidden"], ["w-full"])} />
          <div className={clsx(["flex", "flex-col"], ["mt-4"])}>
            {/* @ts-expect-error Server Component */}
            <SimilarVideosSection id={videoId} />
            <HistorySection />
          </div>
        </div>
      </div>
    </WholeProvider>
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
