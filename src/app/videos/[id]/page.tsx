import clsx from "clsx";
import Image from "next/image";

import { UpdateableProvider } from "./context";
import { getData } from "./getData";
import { HistorySection } from "./HistorySection";
import { TagsSection } from "./TagsSection";

export const revalidate = 0;

export default async function Page({ params }: { params: { id: string } }) {
  const details = await getData(params.id);
  const { id: videoId } = details;

  return (
    <UpdateableProvider
      videoId={details.id}
      initTags={details.tags}
      initHistory={details.history}
    >
      <div className={clsx(["flex"])}>
        <div className={clsx(["flex-shrink-0"], ["w-80"])}>
          <section>
            <h2 className={clsx(["text-xl"])}>Tags</h2>
            <TagsSection className={clsx(["mt-2"])} videoId={videoId} />
          </section>
        </div>
        <div className={clsx(["flex-shrink-0"], ["flex-grow"])}>
          <section
            className={clsx(
              ["flex-shrink-0"],
              ["flex-grow"],
              ["flex"],
              ["gap-x-4"]
            )}
          >
            <div>
              <Image
                className={clsx(["object-scale-down"], ["h-40"])}
                src={details.thumbnailUrl}
                width={260}
                height={200}
                alt={details.title}
                priority={true}
              />
            </div>
            <div className={clsx(["flex-grow"], ["py-4"])}>
              <h1 className={clsx(["text-xl"])}>{details.title}</h1>
            </div>
          </section>
          <div className={clsx(["w-full"], ["flex"], ["mt-4"])}>
            <section className={clsx(["flex-shrink-0"], ["flex-grow"])}>
              <h2 className={clsx(["text-xl"])}>History</h2>
              <HistorySection className={clsx(["mt-4"])} />
            </section>
            <div className={clsx(["w-96"])}></div>
          </div>
        </div>
      </div>
    </UpdateableProvider>
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
