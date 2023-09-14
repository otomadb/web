import clsx from "clsx";

import { graphql } from "~/gql";
import { fetchGql } from "~/gql/fetch";
import { isErr } from "~/utils/Result";

import RequestsList from "./RequestsList";

export const dynamic = "force-dynamic";

export default async function Page() {
  const result = await fetchGql(
    graphql(`
      query NicovideoRequestsPage {
        findUncheckedNicovideoRegistrationRequests(input: {}) {
          totalCount
          ...NicovideoRequestsPage_RequestsList
        }
      }
    `),
    {}
  );
  if (isErr(result)) throw new Error("Fetched failed");

  return (
    <main
      className={clsx(
        ["@container", "max-w-screen-lg", "mx-auto"],
        ["w-full"],
        ["flex", "flex-col"]
      )}
    >
      <div className={clsx(["w-full"], ["backdrop-blur-lg"])}>
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
        </div>
      </div>
      <section className={clsx(["container", "mx-auto"])}>
        <RequestsList
          fragment={result.data.findUncheckedNicovideoRegistrationRequests}
        />
      </section>
    </main>
  );
}
