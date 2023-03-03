import clsx from "clsx";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { DetailsSection } from "~/components/pages/Video/DetailsSection.server";
import { SemitagsSection } from "~/components/pages/Video/SemitagsSection.server";
import { TagsSection } from "~/components/pages/Video/TagsSection.server";
import { graphql, useFragment } from "~/gql";
import { fetchGql } from "~/gql/fetch";
import { VideoPage_DetailsSectionFragmentDoc } from "~/gql/graphql";

export default async function Layout({
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
      <div className={clsx(["flex-grow"], ["flex", "flex-col", "gap-y-4"])}>
        <DetailsSection
          fragment={useFragment(VideoPage_DetailsSectionFragmentDoc, findVideo)}
        />
        <div>{children}</div>
      </div>
    </div>
  );
}
