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
      query SoundcloudRegistrationRequestPage($sourceId: String!) {
        findSoundcloudRegistrationRequestBySourceId(sourceId: $sourceId) {
          ...RequestPageCommon
          embedUrl
        }
      }
    `),
    { sourceId: params.sourceId }
  );

  if (!result.findSoundcloudRegistrationRequestBySourceId) return notFound();
  const { findSoundcloudRegistrationRequestBySourceId } = result;

  return (
    <RequestPageCommon
      platform="soundcloud"
      fragment={findSoundcloudRegistrationRequestBySourceId}
      Embed={({ className }) => (
        <iframe
          className={clsx(className)}
          src={findSoundcloudRegistrationRequestBySourceId.embedUrl}
          width={384}
          height={192}
        />
      )}
    />
  );
}
