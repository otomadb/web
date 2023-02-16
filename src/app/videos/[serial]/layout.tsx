import clsx from "clsx";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { DetailsSection } from "~/components/pages/Video/DetailsSection.server";
import { SemitagsSection } from "~/components/pages/Video/SemitagsSection.server";
import { TagsSection } from "~/components/pages/Video/TagsSection.server";
import { getFragment, graphql } from "~/gql";
import { VideoPage_DetailsSectionFragmentDoc } from "~/gql/graphql";
import { fetchGql } from "~/utils/fetchGql";

export default async function Page({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serial: string };
}) {
  const { findVideo } = await fetchGql(
    graphql(`
      query VideoPage_Layout($serial: Int!) {
        findVideo(input: { serial: $serial }) {
          id
          ...VideoPage_DetailsSection
        }
      }
    `),
    { serial: parseInt(params.serial, 10) }
  );

  if (!findVideo) return notFound();

  return (
    <div className={clsx(["flex"], ["gap-x-4"])}>
      <div
        className={clsx(
          ["flex-shrink-0"],
          ["hidden", "lg:block"],
          ["w-72"],
          ["space-y-4"]
        )}
      >
        <Suspense>
          {/* @ts-expect-error Server Component*/}
          <TagsSection videoId={findVideo.id} />
        </Suspense>
        <Suspense>
          {/* @ts-expect-error Server Component*/}
          <SemitagsSection videoId={findVideo.id} />
        </Suspense>
      </div>
      <div className={clsx(["flex-grow"])}>
        <DetailsSection
          fragment={getFragment(VideoPage_DetailsSectionFragmentDoc, findVideo)}
        />
        <div className={clsx(["flex", "flex-col"])}>{children}</div>
      </div>
    </div>
  );
}
