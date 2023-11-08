import clsx from "clsx";

import { VideoThumbnail } from "~/components/VideoThumbnail";
import { FragmentType, graphql, useFragment } from "~/gql";

import { LinkVideo } from "./Link";

export const Fragment = graphql(`
  fragment VideoPage_SimilarVideos_Video on VideoSimilarity {
    to {
      ...Link_Video
      ...VideoThumbnail
      id
      title
    }
  }
`);
export const SimilarVideo = ({
  ...props
}: {
  fragment: FragmentType<typeof Fragment>;
}) => {
  const { to } = useFragment(Fragment, props.fragment);
  return (
    <div>
      <LinkVideo fragment={to} className={clsx("block")}>
        <VideoThumbnail
          fragment={to}
          className={clsx("h-32 w-full border border-slate-400")}
          imageSize="medium"
        />
      </LinkVideo>
      <LinkVideo
        fragment={to}
        className={clsx(
          ["block"],
          [["p-1"]],
          ["text-sm @[768px]/videolist:text-xs"]
        )}
      >
        {to.title}
      </LinkVideo>
    </div>
  );
};
