import "server-only";

import clsx from "clsx";

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <main
      className={clsx(
        ["container", "max-w-screen-2xl"],
        ["mx-auto"],
        ["flex", "flex-col", "gap-y-8"],
        ["py-12"]
      )}
    >
      {/* <RecentVideosSection /> */}
      {/* <RecentNicovideoRequestsSection /> */}
    </main>
  );
}
