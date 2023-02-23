import clsx from "clsx";

import { graphql } from "~/gql";
import { fetchGql } from "~/utils/fetchGql";

export default async function Page({
  params,
}: {
  params: { sourceId: string };
}) {
  const { findNicovideoRegistrationRequest } = await fetchGql(
    graphql(`
      query NicovideoRegistrationRequestPage($sourceId: String!) {
        findNicovideoRegistrationRequest(input: { sourceId: $sourceId }) {
          id
          sourceId
        }
      }
    `),
    { sourceId: params.sourceId }
  );

  return (
    <main className={clsx(["max-w-screen-lg"], ["mx-auto"])}>
      <h1>ニコニコ動画の追加リクエスト</h1>
    </main>
  );
}
