import clsx from "clsx";
import { notFound } from "next/navigation";

import { DetailsSection } from "~/components/pages/Video/DetailsSection.server";
import { getFragment, graphql } from "~/gql";
import { fetchGql } from "~/gql/fetch";
import { VideoPage_DetailsSectionFragmentDoc } from "~/gql/graphql";

import { SemitagsList } from "./SemitagsList";
import { TagsList } from "./TagsList";
import { TagTypesList } from "./TagTypesList";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serial: string };
}) {
  const { findVideo } = await fetchGql(
    graphql(`
      query VideoPageLayout($serial: Int!) {
        findVideo(input: { serial: $serial }) {
          ...VideoPage_DetailsSection
          ...VideoPage_SemitagsSection
          id
          taggings {
            ...VideoPageLayout_TagsList
            ...VideoPageLayout_TagTypesList
          }
        }
      }
    `),
    { serial: parseInt(params.serial, 10) }
  );

  if (!findVideo) return notFound();

  return (
    <main
      className={clsx(
        ["container"],
        ["mx-auto"],
        ["flex-grow"],
        ["flex", "flex-col", "gap-y-4"]
      )}
    >
      <DetailsSection
        fragment={getFragment(VideoPage_DetailsSectionFragmentDoc, findVideo)}
      />
      <div className={clsx(["flex", "gap-x-4"])}>
        <div
          className={clsx(
            ["flex-shrink-0"],
            ["min-w-[256px]"],
            ["flex", "flex-col", "gap-y-4"]
          )}
        >
          <section>
            <h2 className={clsx(["text-md"], ["text-slate-900"])}>タグ</h2>
            <div className={clsx(["mt-2"])}>
              <TagTypesList fragment={findVideo.taggings} />
              <TagsList fragment={findVideo.taggings} />
            </div>
          </section>
          <section>
            <h2 className={clsx(["text-md"], ["text-slate-900"])}>仮タグ</h2>
            <div className={clsx(["mt-2"])}>
              <SemitagsList fragment={findVideo} />
            </div>
          </section>
        </div>
        <div className={clsx(["flex-grow"])}>{children}</div>
      </div>
    </main>
  );
}
