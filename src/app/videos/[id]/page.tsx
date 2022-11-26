import clsx from "clsx";
import Image from "next/image";

import { getData } from "./getData";
import { History } from "./HistoryItem";
import { Tag } from "./Tag";
import { TagAdd } from "./TagAdd";

export const revalidate = 60;

export default async function Page({ params }: { params: { id: string } }) {
  const details = await getData(params.id);
  const { id: videoId, history } = details;

  return (
    <div className={clsx(["flex"])}>
      <div className={clsx(["flex-shrink-0"], ["w-80"])}>
        <section>
          <h2 className={clsx(["text-xl"])}>Tags</h2>
          <div className={clsx(["mt-2"], ["flex"], ["gap-x-2"], ["gap-y-2"])}>
            {details.tags
              .map(({ type }) => type)
              .filter((v1, i, arr) => i === arr.findIndex((v2) => v1 === v2))
              .map((type) => (
                <div key={type} className={clsx(["flex"])}>
                  <span
                    className={clsx(["text-xs"], ["select-all"], {
                      "text-copyright-400": type === "COPYRIGHT",
                      "text-character-400": type === "CHARACTER",
                      "text-class-400": type === "CLASS",
                      "text-music-400": type === "MUSIC",
                    })}
                  >
                    {type}
                  </span>
                </div>
              ))}
          </div>
          <div
            className={clsx(
              ["mt-2"],
              ["flex", "flex-wrap"],
              ["gap-x-1"],
              ["gap-y-1"]
            )}
          >
            {details.tags.map(({ id, name, type }) => (
              <Tag
                key={id}
                id={id}
                name={name}
                context_name={null}
                type={type}
              />
            ))}
          </div>
          <TagAdd className={clsx(["mt-2"], ["w-full"])} videoId={videoId} />
        </section>
        <section className={clsx(["mt-4"])}>
          <h2 className={clsx(["text-xl"])}>History</h2>
          <div className={clsx(["mt-4"], ["flex", "flex-col"], ["space-y-2"])}>
            {history.map((item) => (
              <History key={item.id} item={item} />
            ))}
          </div>
        </section>
      </div>
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
            width={240}
            height={160}
            alt={details.title}
            priority={true}
          />
        </div>
        <div className={clsx(["flex-grow"], ["py-4"])}>
          <h1 className={clsx(["text-xl"])}>{details.title}</h1>
        </div>
      </section>
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
