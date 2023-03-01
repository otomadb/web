import clsx from "clsx";

import { graphql } from "~/gql";
import { fetchGql } from "~/utils/fetchGql";

export const NicovideoSourcesSection = async ({
  className,
  videoId,
}: {
  className?: string;
  videoId: string;
}) => {
  const { getVideo } = await fetchGql(
    graphql(`
      query VideoPage_NicovideoSourcesSection($id: ID!) {
        getVideo(id: $id) {
          id
          nicovideoSources {
            id
            sourceId
            embedUrl
          }
        }
      }
    `),
    { id: videoId },
    { next: { revalidate: 0 } }
  );

  return (
    <section className={clsx(className)}>
      <h2 className={clsx(["text-xl"], ["text-slate-900"])}>
        ニコニコ動画の動画ソース
      </h2>
      <div className={clsx(["mt-2"], ["@container/sources"])}>
        <div
          className={clsx(
            ["grid"],
            [
              "grid-cols-1",
              "@[384px]/sources:grid-cols-2",
              "@[768px]/sources:grid-cols-3",
            ]
          )}
        >
          {getVideo.nicovideoSources.map(({ id, sourceId, embedUrl }) => (
            <div key={id}>
              <iframe height="160" src={embedUrl} />
              <div className={clsx(["font-mono"])}>{sourceId}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
