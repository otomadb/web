import clsx from "clsx";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { DetailsSection } from "~/components/pages/Video/DetailsSection.server";
import { SemitagsSection } from "~/components/pages/Video/SemitagsSection.server";
import { TagsSection } from "~/components/pages/Video/TagsSection.server";
import { getFragment, graphql } from "~/gql";
import {
  VideoPage_DetailsSectionFragmentDoc,
  VideoPage_SemitagsSectionFragmentDoc,
  VideoPage_TagsSectionFragmentDoc,
} from "~/gql/graphql";
import { gqlRequest } from "~/utils/gqlRequest";

export default async function Page({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serial: string };
}) {
  const { findVideo: video } = await gqlRequest(
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

  if (!video) return notFound();

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
          <TagsSection videoId={video.id} />
        </Suspense>
        <Suspense>
          {/* @ts-expect-error Server Component*/}
          <SemitagsSection videoId={video.id} />
        </Suspense>
      </div>
      <div className={clsx(["flex-grow"])}>
        <DetailsSection
          fragment={getFragment(VideoPage_DetailsSectionFragmentDoc, video)}
        />
        <div className={clsx(["flex", "flex-col"])}>{children}</div>
      </div>
    </div>
  );
}
