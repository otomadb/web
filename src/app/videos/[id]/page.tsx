import clsx from "clsx";
import React from "react";

import { HistorySection } from "~/components/Videos/History/Section";
import { SimilarVideosSection } from "~/components/Videos/SimilarVideos/Section";
import { TagsSection } from "~/components/Videos/Tags/Section";
import { VideoDetailsSection } from "~/components/Videos/VideoDetails/Section";
import { graphql } from "~/gql";
import { gqlRequest } from "~/utils/gqlRequest";

export const revalidate = 0;

export default async function Page({ params }: { params: { id: string } }) {
  const { video } = await gqlRequest(
    graphql(`
      query VideoPage($id: ID!) {
        video(id: $id) {
          id
          title
          titles {
            title
            primary
          }
          thumbnailUrl
        }
      }
    `),
    {
      id: `video:${params.id}`,
    }
  );

  const { id: videoId, thumbnailUrl, title } = video;

  return (
    <div className={clsx(["flex"], ["gap-x-4"], ["px-2"])}>
      <div
        className={clsx(
          ["flex-shrink-0"],
          ["hidden", "md:block"],
          ["w-60", "lg:w-80"]
        )}
      >
        {/* @ts-expect-error Server Component */}
        <TagsSection className={clsx(["w-full"])} videoId={videoId} />
      </div>
      <div className={clsx(["flex-grow"])}>
        <VideoDetailsSection
          title={title}
          thumbnailUrl={thumbnailUrl}
          videoId={videoId}
        />
        {/* @ts-expect-error Server Component */}
        <TagsSection
          className={clsx(["md:hidden"], ["w-full"])}
          videoId={videoId}
        />
        <div className={clsx(["flex", "flex-col"], ["mt-4"])}>
          {/* @ts-expect-error Server Component */}
          <SimilarVideosSection videoId={videoId} />
          {/* @ts-expect-error Server Component */}
          <HistorySection videoId={videoId} />
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
