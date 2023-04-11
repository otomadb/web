import clsx from "clsx";
import { notFound } from "next/navigation";

import { graphql } from "~/gql";
import { fetchGql } from "~/gql/fetch";
import { isErr } from "~/utils/Result";

import { MixedEventLists } from "./MixedEventLists";

export default async function Page({ params }: { params: { serial: string } }) {
  const result = await fetchGql(
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
          taggings {
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
    { serial: parseInt(params.serial, 10) },
    { next: { revalidate: 0 } }
  );

  if (isErr(result)) throw new Error("GraphQL fetching Error");
  if (!result.data.findVideo) notFound();
  const { findVideo } = result.data;

  return (
    <div className={clsx(["flex", "flex-col", "gap-y-4"])}>
      <section className={clsx(["flex", "flex-col"], ["gap-x-4"])}>
        <h2 className={clsx(["text-lg"])}>この動画に関する全ての変更</h2>
        <MixedEventLists
          className={clsx(["mt-2"])}
          eventsVideo={findVideo.events}
          eventsTitles={findVideo.titles.map((t) => t.events)}
          eventsThumbnails={findVideo.thumbnails.map((t) => t.events)}
          eventsTags={findVideo.taggings.nodes.map((t) => t.events)}
          eventsSemitags={findVideo.semitags.map((s) => s.events)}
          eventsNicovideoSources={findVideo.nicovideoSources.map(
            (s) => s.events
          )}
        />
      </section>
    </div>
  );
}
