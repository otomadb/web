import clsx from "clsx";
import { notFound } from "next/navigation";

import { MixedEventLists } from "~/components/pages/Video/Events/MixedEventLists";
import { getFragment, graphql } from "~/gql";
import {
  VideoEventPage_NicovideoVideoSourceEventsFragmentDoc,
  VideoEventPage_SemitagEventsFragmentDoc,
  VideoEventPage_VideoEventsFragmentDoc,
  VideoEventPage_VideoTagEventsFragmentDoc,
  VideoEventPage_VideoThumbnailEventsFragmentDoc,
  VideoEventPage_VideoTitleEventsFragmentDoc,
} from "~/gql/graphql";
import { gqlRequest } from "~/utils/gqlRequest";

export const revalidate = 0;

export async function generateStaticParams() {
  const { findVideos } = await gqlRequest(
    graphql(`
      query VideoEventsPage_Paths {
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
      query VideoEventPage($serial: Int!) {
        findVideo(input: { serial: $serial }) {
          id
          events(input: {}) {
            ...VideoEventPage_VideoEvents
          }
          titles {
            events(input: {}) {
              ...VideoEventPage_VideoTitleEvents
            }
          }
          thumbnails {
            events(input: {}) {
              ...VideoEventPage_VideoThumbnailEvents
            }
          }
          taggings(input: {}) {
            nodes {
              events(input: {}) {
                ...VideoEventPage_VideoTagEvents
              }
            }
          }
          semitags {
            events(input: {}) {
              ...VideoEventPage_SemitagEvents
            }
          }
          nicovideoSources {
            events(input: {}) {
              ...VideoEventPage_NicovideoVideoSourceEvents
            }
          }
        }
      }
    `),
    { serial: parseInt(params.serial, 10) }
  );

  if (!video) return notFound();

  return (
    <>
      <section className={clsx(["flex", "flex-col"], ["gap-x-4"])}>
        <h2 className={clsx(["text-lg"])}>この動画に関する全ての変更</h2>
        <MixedEventLists
          className={clsx(["mt-4"])}
          eventsVideo={getFragment(
            VideoEventPage_VideoEventsFragmentDoc,
            video.events
          )}
          eventsTitles={video.titles.map((title) =>
            getFragment(
              VideoEventPage_VideoTitleEventsFragmentDoc,
              title.events
            )
          )}
          eventsThumbnails={video.thumbnails.map((title) =>
            getFragment(
              VideoEventPage_VideoThumbnailEventsFragmentDoc,
              title.events
            )
          )}
          eventsTags={video.taggings.nodes.map((tag) =>
            getFragment(VideoEventPage_VideoTagEventsFragmentDoc, tag.events)
          )}
          eventsSemitags={video.semitags.map((semitag) =>
            getFragment(VideoEventPage_SemitagEventsFragmentDoc, semitag.events)
          )}
          eventsNicovideoSources={video.nicovideoSources.map((source) =>
            getFragment(
              VideoEventPage_NicovideoVideoSourceEventsFragmentDoc,
              source.events
            )
          )}
        />
      </section>
    </>
  );
}
