import clsx from "clsx";
import Image from "next/image";
import { Fragment } from "react";

import { getData } from "./getData";
import { AddTag, RegisterHistory } from "./HistoryItem";
import { Tag } from "./Tag";

const Page = async ({ params }: { params: { id: string } }) => {
  const details = await getData(params.id);
  const { history } = details;

  const types = details.tags
    .map(({ type }) => type)
    .filter((v1, i, arr) => i === arr.findIndex((v2) => v1 === v2));

  return (
    <>
      <div className={clsx(["flex"], ["gap-x-4"])}>
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
      </div>
      <div className={clsx(["mt-4"])}>
        <div className={clsx(["flex"], ["gap-x-2"], ["gap-y-2"])}>
          {types.map((type) => (
            <div key={type} className={clsx(["flex"])}>
              <span
                className={clsx(["text-xs"], ["select-all"], {
                  "text-character-400": type === "CHARACTER",
                  "text-class-400": type === "CLASS",
                  "text-music-400": type === "MUSIC",
                  "text-work-400": type === "WORK",
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
            ["gap-x-2"],
            ["gap-y-2"]
          )}
        >
          {details.tags.map(({ id, name, type }) => (
            <Tag key={id} id={id} name={name} context_name={null} type={type} />
          ))}
        </div>
      </div>
      <div className={clsx(["mt-4"])}>
        <h2 className={clsx(["text-xl"])}>History</h2>
        <div className={clsx(["mt-4"], ["flex", "flex-col"], ["space-y-2"])}>
          {history.map((item) => {
            const classNames = clsx();
            return (
              <Fragment key={item.id}>
                {item.type === "REGSITER_VIDEO" && (
                  <RegisterHistory
                    classNames={classNames}
                    id={item.id}
                    user={item.user}
                    createdAt={item.createdAt}
                  />
                )}
                {item.type === "ADD_TAG" && (
                  <AddTag
                    classNames={classNames}
                    id={item.id}
                    user={item.user}
                    tag={item.tag}
                    createdAt={item.createdAt}
                  />
                )}
              </Fragment>
            );
          })}
        </div>
      </div>

      {/*   <div className={clsx(["mt-4"], ["flex", "flex-col"])}>
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
    */}
      {/*
      <div className={clsx(["mt-8"])}>
        <span>親作品</span>
        <VideoList className={clsx(["mt-4"])} videos={details.parent_videos} />
      </div>
      <div className={clsx(["mt-8"])}>
        <span>関連</span>
        <VideoList className={clsx(["mt-4"])} videos={details.related_videos} />
      </div>
    */}
    </>
  );
};

export default Page;
