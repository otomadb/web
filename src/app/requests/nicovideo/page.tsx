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
        findUncheckedNicovideoRegistrationRequests(
          input: { first: $first, after: $after }
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
    <main className={clsx(["@container"], ["w-full"], ["flex", "flex-col"])}>
      <div
        className={clsx(
          ["sticky", "top-[64px]", "z-1"],
          ["w-full"],
          ["backdrop-blur-lg"]
        )}
      >
        <div className={clsx(["flex"], ["max-w-screen-lg", "mx-auto"])}>
          <header className={clsx(["flex-grow"], ["py-4"])}>
            <div>
              <h1 className={clsx(["text-2xl", "text-slate-900"])}>
                最近リクエストされたニコニコ動画の動画
              </h1>
            </div>
            <p className={clsx(["text-sm", "text-slate-500"])}>
              {
                result.data.findUncheckedNicovideoRegistrationRequests
                  .totalCount
              }
              件申請されています
            </p>
          </header>
          <nav className={clsx(["flex-shrink-0"], ["flex", "items-center"])}>
            <Pagination
              fragment={result.data.findUncheckedNicovideoRegistrationRequests}
            />
          </nav>
        </div>
      </div>
      <section className={clsx(["container", "mx-auto"])}>
        <RequestsGrid
          fragment={result.data.findUncheckedNicovideoRegistrationRequests}
        />
      </section>
    </main>
  );
}
