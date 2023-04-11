import clsx from "clsx";
import { notFound } from "next/navigation";

import { graphql } from "~/gql";
import { fetchGql } from "~/gql/fetch";
import { isErr } from "~/utils/Result";

import { AliasesDetail } from "./AliasesDetail";
import { Parents } from "./Parents";
import { TypeDetail } from "./TypeDetail";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serial: string };
}) {
  const result = await fetchGql(
    graphql(`
      query TagPageLayout($serial: Int!) {
        findTag(input: { serial: $serial }) {
          ...TagPageLayout_TypeDetail
          ...TagPageLayout_AliasesDetail
          ...TagPageLayout_Parents
          id
          name
          type
          serial
          isCategoryTag
          explicitParent {
            id
            name
          }
        }
      }
    `),
    { serial: parseInt(params.serial, 10) }
  );
  if (isErr(result)) throw new Error("GraphQL fetching Error");
  if (!result.data.findTag) notFound();
  if (result.data?.findTag.isCategoryTag) return notFound(); // TODO: `/category/`とかに飛ばすとかでも良いと思う

  const { findTag } = result.data;
  return (
    <main className={clsx(["container"], ["mx-auto"])}>
      <header className={clsx(["flex"])}>
        <div className={clsx(["flex-grow"], ["flex", "flex-col", "gap-y-1"])}>
          <h1 className={clsx(["text-xl"])}>
            <span className={clsx(["text-slate-900", "font-bold"])}>
              {findTag.name}
            </span>
            {findTag.explicitParent && (
              <span className={clsx(["ml-1"], ["text-slate-500"])}>
                ({findTag.explicitParent.name})
              </span>
            )}
          </h1>
          <TypeDetail fragment={findTag} />
          <AliasesDetail fragment={findTag} />
          <Parents fragment={findTag} />
        </div>
      </header>
      <div className={clsx(["mt-4"])}>{children}</div>
    </main>
  );
}
