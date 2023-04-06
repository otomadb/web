import clsx from "clsx";
import { Suspense } from "react";

import DetailsSectionSC from "./_components/DetailsSection/index.server";
import SemitagsSectionSC from "./_components/SemitagsSection/index.server";
import TagsSectionSC from "./_components/TagsSection/index.server";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serial: string };
}) {
  const serial = parseInt(params.serial, 10);

  return (
    <main
      className={clsx(
        ["container"],
        ["mx-auto"],
        ["flex-grow"],
        ["flex", "flex-col", "gap-y-4"]
      )}
    >
      <Suspense fallback={<p>動画情報を取得中です</p>}>
        {/* @ts-expect-error rsc */}
        <DetailsSectionSC serial={serial} />
      </Suspense>
      <div className={clsx(["flex", "gap-x-4"])}>
        <div
          className={clsx(
            ["flex-shrink-0"],
            ["min-w-[256px]"],
            ["flex", "flex-col", "gap-y-6"]
          )}
        >
          <section className={clsx(["flex", "flex-col", "gap-y-1"])}>
            <h2 className={clsx(["text-md"], ["text-slate-900"])}>タグ</h2>
            <Suspense fallback={<p>タグを取得中です</p>}>
              {/* @ts-expect-error rsc */}
              <TagsSectionSC serial={serial} />
            </Suspense>
          </section>
          <section className={clsx(["flex", "flex-col", "gap-y-1"])}>
            <h2 className={clsx(["text-md"], ["text-slate-900"])}>仮タグ</h2>
            <Suspense fallback={<p>仮タグを取得中です</p>}>
              {/* @ts-expect-error rsc */}
              <SemitagsSectionSC serial={serial} />
            </Suspense>
          </section>
        </div>
        <div className={clsx(["flex-grow"])}>{children}</div>
      </div>
    </main>
  );
}
