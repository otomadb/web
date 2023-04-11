import clsx from "clsx";
import { notFound } from "next/navigation";

import { Details } from "~/components/pages/Requests/Nicovideo/Details.server";
import { SemitagsList } from "~/components/pages/Requests/Nicovideo/SemitagsList.server";
import { TagsList } from "~/components/pages/Requests/Nicovideo/TagsList.server";
import { graphql } from "~/gql";
import { fetchGql } from "~/gql/fetch";
import { isErr } from "~/utils/Result";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: { sourceId: string };
}) {
  const result = await fetchGql(
    graphql(`
      query NicovideoRegistrationRequestPage($sourceId: String!) {
        findNicovideoRegistrationRequest(input: { sourceId: $sourceId }) {
          ...NicovideoRequestPage_DetailsFragment
          ...NicovideoRequestPage_TagsList
          ...NicovideoRequestPage_SemitagsList
        }
      }
    `),
    { sourceId: params.sourceId }
  );

  if (isErr(result)) throw new Error("GraphQL fetching Error");
  if (!result.data.findNicovideoRegistrationRequest) return notFound();

  const { findNicovideoRegistrationRequest } = result.data;

  return (
    <main className={clsx(["max-w-screen-lg"], ["mx-auto"])}>
      <section>
        <Details fragment={findNicovideoRegistrationRequest} />
      </section>
      <div className={clsx(["mt-4"], ["grid", "grid-cols-2"])}>
        <section
          className={clsx(["flex", "flex-col", "items-start", "gap-y-2"])}
        >
          <h2>タグ</h2>
          <TagsList fragment={findNicovideoRegistrationRequest} />
        </section>
        <section
          className={clsx(["flex", "flex-col", "items-start", "gap-y-2"])}
        >
          <h2>仮タグ</h2>
          <SemitagsList fragment={findNicovideoRegistrationRequest} />
        </section>
      </div>
    </main>
  );
}
