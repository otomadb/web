import clsx from "clsx";

import { VideoList } from "~/app/videos/[id]/VideoList";

import { getData } from "./getData";

const Page = async ({ params }: { params: { id: string } }) => {
  const details = await getData(params.id);

  return (
    <>
      <h1 className={clsx(["flex"], ["items-center"])}>
        <span className={clsx(["block"], ["text-2xl"], ["text-slate-800"])}>
          {details.name}
        </span>
        {details.context && (
          <span
            className={clsx(
              ["block"],
              ["ml-1"],
              ["text-md"],
              ["text-slate-500"]
            )}
          >
            ({details.context.name_primary})
          </span>
        )}
      </h1>
      <div className={clsx(["mt-4"])}>
        <VideoList className={clsx()} videos={details.taggedVideos} />
      </div>
    </>
  );
};

export default Page;
