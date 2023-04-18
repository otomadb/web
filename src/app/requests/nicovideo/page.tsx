import clsx from "clsx";

import { graphql } from "~/gql";
import { fetchGql } from "~/gql/fetch";
import { isErr } from "~/utils/Result";

import { SearchParams } from "./Link";
import Pagination from "./Pagination";
import RequestsGrid from "./RequestsGrid";

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const result = await fetchGql(
    graphql(`
      query AllNicovideoRequestsPage_After($first: Int!, $after: String) {
        findNicovideoRegistrationRequests(
          first: $first
          after: $after
          checked: false
        ) {
          totalCount
          ...AllNicovideoRequestsPage_RequestsGrid
          ...AllNicovideoRequestsPage_Pagination
        }
      }
    `),
    {
      first: 30,
      after: "after" in searchParams ? searchParams.after : null,
    }
  );
  if (isErr(result)) throw new Error("Fetched failed");

  return (
    <main
      className={clsx(
        ["@container"],
        ["container"],
        ["mx-auto"],
        ["flex", "flex-col"]
      )}
    >
      <div className={clsx(["flex"], ["w-full", "max-w-screen-lg", "mx-auto"])}>
        <header className={clsx(["flex-grow"], ["py-4"])}>
          <div>
            <h1 className={clsx(["text-xl", "text-slate-900"])}>
              最近リクエストされたニコニコ動画の動画
            </h1>
          </div>
          <p className={clsx(["text-sm", "text-slate-500"])}>
            {result.data.findNicovideoRegistrationRequests.totalCount}
            件申請されています
          </p>
        </header>
        <nav
          className={clsx(
            ["flex-shrink-0"],
            ["sticky", "top-[64px]", "z-1"],
            ["px-4", "py-4"]
          )}
        >
          <Pagination
            fragment={result.data.findNicovideoRegistrationRequests}
          />
        </nav>
      </div>
      <section className={clsx(["flex-grow"])}>
        <RequestsGrid
          fragment={result.data.findNicovideoRegistrationRequests}
        />
      </section>
    </main>
  );
}
