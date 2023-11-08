import clsx from "clsx";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { graphql } from "~/gql";
import { fetchGql } from "~/gql/fetch";
import { isErr } from "~/utils/Result";

import DetailsSection from "./DetailsSection.server";
import SemitagsSectionContents from "./SemitagsSectionContents.server";
import TagEditorTrigger from "./TagEditorTrigger";
import TaggingsSectionContents from "./TaggingsSectionContents.server";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serial: string };
}) {
  const data = await fetchGql(
    graphql(`
      query VideoPageLayout($serial: Int!) {
        findVideo(input: { serial: $serial }) {
          id
          ...VideoPageLayout_DetailsSection
          ...VideoPageLayout_TaggingsSectionContents
          ...VideoPageLayout_SemitagsSectionContents
        }
      }
    `),
    { serial: parseInt(params.serial, 10) }
  );
  if (isErr(data)) {
    switch (data.error.type) {
      case "FETCH_ERROR":
        throw new Error("Fetching error");
      case "GRAPHQL_ERROR":
        throw new Error("GraphQL Error");
    }
  }
  if (!data.data.findVideo) notFound();

  return (
    <main
      className={clsx(
        ["container"],
        ["mx-auto"],
        ["grow"],
        ["flex", "flex-col", "gap-y-4"]
      )}
    >
      <Suspense fallback={<p>動画情報を取得中です</p>}>
        <DetailsSection
          // fragment typecheck
          fragment={data.data.findVideo}
        />
      </Suspense>
      <div className={clsx(["flex", "gap-x-4"])}>
        <div
          className={clsx(
            ["shrink-0"],
            ["w-[256px]"],
            ["flex", "flex-col", "gap-y-6"]
          )}
        >
          <section className={clsx(["flex", "flex-col", "gap-y-1"])}>
            <h2 className={clsx([" text-base"], ["text-slate-900"])}>タグ</h2>
            <Suspense fallback={<p>タグを取得中です</p>}>
              <TaggingsSectionContents
                // fragment typecheck
                fragment={data.data.findVideo}
              />
            </Suspense>
          </section>
          <section className={clsx(["flex", "flex-col", "gap-y-1"])}>
            <h2 className={clsx([" text-base"], ["text-slate-900"])}>仮タグ</h2>
            <Suspense fallback={<p>仮タグを取得中です</p>}>
              <SemitagsSectionContents
                // fragment typecheck
                fragment={data.data.findVideo}
              />
            </Suspense>
          </section>
          <div>
            <TagEditorTrigger madId={data.data.findVideo.id} />
          </div>
        </div>
        <div className={clsx(["grow"])}>{children}</div>
      </div>
    </main>
  );
}
