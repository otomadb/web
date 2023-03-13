import clsx from "clsx";
import { notFound } from "next/navigation";

import { graphql } from "~/gql";
import { fetchGql } from "~/gql/fetch";

import { AliasesDetail } from "./AliasesDetail";
import { TypeDetail } from "./TypeDetail";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serial: string };
}) {
  const { findTag } = await fetchGql(
    graphql(`
      query TagPageLayout($serial: Int!) {
        findTag(input: { serial: $serial }) {
          ...TagPageLayout_TypeDetail
          ...TagPageLayout_AliasesDetail
          id
          name
          type
          explicitParent {
            id
            name
          }
        }
      }
    `),
    { serial: parseInt(params.serial, 10) },
    { next: { revalidate: 0 } }
  );

  if (!findTag) return notFound();

  const { name, explicitParent } = findTag;

  return (
    <main className={clsx(["container"], ["mx-auto"])}>
      <header className={clsx(["flex", "flex-col", "gap-y-1"])}>
        <h1 className={clsx(["text-xl"])}>
          <span className={clsx(["text-slate-900", "font-bold"])}>{name}</span>
          {explicitParent && (
            <span className={clsx(["ml-1"], ["text-slate-500"])}>
              ({explicitParent.name})
            </span>
          )}
        </h1>
        <TypeDetail fragment={findTag} />
        <AliasesDetail fragment={findTag} />
      </header>
      <div>{children}</div>
    </main>
  );
}
