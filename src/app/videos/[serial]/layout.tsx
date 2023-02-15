import clsx from "clsx";
import { notFound } from "next/navigation";

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
          ...VideoPage_TagsSection
          ...VideoPage_SemitagsSection
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
        <TagsSection
          fragment={getFragment(VideoPage_TagsSectionFragmentDoc, video)}
        />
        <SemitagsSection
          fragment={getFragment(VideoPage_SemitagsSectionFragmentDoc, video)}
        />
      </div>
      <div className={clsx(["flex-grow"])}>
        <DetailsSection
          fragment={getFragment(VideoPage_DetailsSectionFragmentDoc, video)}
        />
        {children}
      </div>
    </div>
  );
}
