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
      query YoutubeRegistrationRequestPage($sourceId: String!) {
        findYoutubeRegistrationRequest(input: { sourceId: $sourceId }) {
          ...RequestPageCommon
          embedUrl
        }
      }
    `),
    { sourceId: params.sourceId }
  );

  if (!result.findYoutubeRegistrationRequest) return notFound();
  const { findYoutubeRegistrationRequest } = result;

  return (
    <RequestPageCommon
      platform="youtube"
      fragment={findYoutubeRegistrationRequest}
      Embed={({ className }) => (
        <iframe
          className={clsx(className)}
          src={findYoutubeRegistrationRequest.embedUrl}
          width={384}
          height={192}
        />
      )}
    />
  );
}
