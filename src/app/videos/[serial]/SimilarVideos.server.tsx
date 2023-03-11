import "server-only";

import { graphql } from "~/gql";
import { fetchGql } from "~/gql/fetch";

import { SimilarVideo } from "./SimilarVideo";
import { VideoList } from "./VideoList.server";

export function SimilarVideos({ videoId }: { videoId: string }) {
  const fetchItems = fetchGql(
    graphql(`
      query VideoPage_SimilarVideosSection($id: ID!) {
        getVideo(id: $id) {
          id
          similarVideos(input: { limit: 12 }) {
            items {
              to {
                id
                ...VideoPage_SimilarVideos_Video
              }
            }
          }
        }
      }
    `),
    { id: videoId },
    { next: { revalidate: 0 } }
  ).then(({ getVideo }) => ({
    items: getVideo.similarVideos.items.map(({ to }) => to),
  }));

  return (
    <>
      {/* @ts-expect-error Server Component*/}
      <VideoList
        fetchItems={fetchItems}
        Video={function VideoItem(props) {
          return <SimilarVideo {...props} />;
        }}
      />
    </>
  );
}
