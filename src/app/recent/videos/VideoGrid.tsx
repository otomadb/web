"use client";

import { InfiniteVideosGrid } from "~/components/common/InfiniteVideoGrid";
import { Fetcher } from "~/components/pages/RecentVideos/Fetcher";

export const VideoGrid: React.FC<{ initAfter?: string }> = ({ initAfter }) => (
  <InfiniteVideosGrid
    initAfter={initAfter}
    Fetcher={(props) => <Fetcher {...props} />}
  />
);
