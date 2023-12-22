import clsx from "clsx";
import { notFound } from "next/navigation";

import { graphql } from "~/gql";
import { makeGraphQLClient } from "~/gql/fetch";
import { mkBilibiliAutoplayDisabled } from "~/utils/mkBilibiliAutoplayDisabled";

import RequestPageCommon from "../../RequestPageCommon";

export default async function Page({
  params,
}: {
  params: { sourceId: string };
}) {
  const result = await makeGraphQLClient().request(
    graphql(`
      query BilibiliRegistrationRequestPage($sourceId: String!) {
        findBilibiliRegistrationRequestBySourceId(sourceId: $sourceId) {
          ...RequestPageCommon
          embedUrl
        }
      }
    `),
    { sourceId: params.sourceId }
  );

  if (!result.findBilibiliRegistrationRequestBySourceId) return notFound();
  const { findBilibiliRegistrationRequestBySourceId } = result;

  return (
    <RequestPageCommon
      platform="bilibili"
      fragment={findBilibiliRegistrationRequestBySourceId}
      Embed={({ className }) => (
        <iframe
          className={clsx(className)}
          src={mkBilibiliAutoplayDisabled(
            findBilibiliRegistrationRequestBySourceId.embedUrl
          )}
          width={384}
          height={192}
        />
      )}
    />
  );
}
