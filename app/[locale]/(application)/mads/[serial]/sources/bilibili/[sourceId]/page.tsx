import clsx from "clsx";
import { notFound } from "next/navigation";

import { graphql } from "~/gql";
import { makeGraphQLClient2 } from "~/gql/fetch";

type PageParams = { sourceId: string };

export default async function Page({ params }: { params: PageParams }) {
  const result = await (
    await makeGraphQLClient2({ auth: "optional" })
  ).request(
    graphql(`
      query BilibiliSourcePage($sourceId: String!) {
        findBilibiliMADSource(input: { sourceId: $sourceId }) {
          id
          sourceId
          embedUrl
        }
      }
    `),
    {
      sourceId: params.sourceId,
    }
  );

  if (!result.findBilibiliMADSource) notFound();
  const { embedUrl, sourceId } = result.findBilibiliMADSource;

  return (
    <section
      className={clsx(
        "col-span-full flex flex-col gap-y-2 rounded-md border border-obsidian-primary bg-obsidian-darker p-4"
      )}
    >
      <div className={clsx("flex items-center gap-x-4 px-2")}>
        <h2 className={clsx("block text-lg font-bold text-snow-darker")}>
          Bilibiliの<span className={clsx("font-mono")}>{sourceId}</span>
          としての情報
        </h2>
      </div>
      <iframe
        width="384"
        height="192"
        className={clsx("h-[192px] w-[384px]")}
        src={embedUrl}
      />
    </section>
  );
}
