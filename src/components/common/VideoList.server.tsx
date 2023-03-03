import "server-only";

import clsx from "clsx";

import { VideoList } from "~/components/common/VideoList";
import { FragmentType, useFragment } from "~/gql";
import { VideoList_VideoFragmentDoc } from "~/gql/graphql";

export async function ServerSideVideosList({
  className,
  videosPromise,
}: {
  className?: string;
  videosPromise: Promise<FragmentType<typeof VideoList_VideoFragmentDoc>[]>;
}) {
  const nodes = await videosPromise;
  const videos = useFragment(VideoList_VideoFragmentDoc, nodes);
  return <VideoList className={clsx(className)} videos={videos} />;
}
