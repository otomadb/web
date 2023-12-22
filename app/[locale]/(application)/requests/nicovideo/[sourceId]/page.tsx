import clsx from "clsx";
import { notFound } from "next/navigation";

import { graphql } from "~/gql";
import { makeGraphQLClient } from "~/gql/fetch";

import RequestPageCommon from "../../RequestPageCommon";

export default async function Page({
  params,
}: {
  params: { sourceId: string };
}) {
  const result = await makeGraphQLClient().request(
    graphql(`
      query NicovideoRegistrationRequestPage($sourceId: String!) {
        findNicovideoRegistrationRequest(input: { sourceId: $sourceId }) {
          ...RequestPageCommon
          embedUrl
        }
      }
    `),
    { sourceId: params.sourceId }
  );

  if (!result.findNicovideoRegistrationRequest) return notFound();

  const { findNicovideoRegistrationRequest } = result;

  return (
    <RequestPageCommon
      platform="nicovideo"
      fragment={findNicovideoRegistrationRequest}
      Embed={({ className }) => (
        <iframe
          className={clsx(className)}
          src={findNicovideoRegistrationRequest.embedUrl}
          width={384}
          height={192}
        />
      )}
    />
  );
}
