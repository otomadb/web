import { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { graphql } from "~/gql";
import { makeGraphQLClient } from "~/gql/fetch";
import { getScopedI18n } from "~/locales/server";

import NoRequests from "../NoRequests";
import RegisterButton from "../RegisterButton";
import RequestsPageCommon, { PER_PAGE } from "../RequestsPageCommon";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { page?: string };
}): Promise<Metadata> {
  const t = await getScopedI18n("page.soundcloudRequests");

  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;

  return {
    title: t("title", { page }),
    openGraph: {
      url: `https://otomadb.com/requests/nicovideo${
        page === 1 ? "" : `?page=${page}`
      }`,
    },
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  if (page < 1) notFound();

  const result = await makeGraphQLClient().request(
    graphql(`
      query SoundcloudRequestsPage2($offset: Int!, $take: Int!) {
        findUncheckedSoundcloudRegistrationRequestsByOffset(
          input: { skip: $offset, take: $take }
        ) {
          ...RequestsPageCommon
          nodes {
            id
          }
        }
      }
    `),
    { offset: (page - 1) * PER_PAGE, take: PER_PAGE }
  );

  const { findUncheckedSoundcloudRegistrationRequestsByOffset } = result;

  if (findUncheckedSoundcloudRegistrationRequestsByOffset.nodes.length === 0)
    if (page > 1) redirect("/requests/soundcloud");
    else
      return (
        <NoRequests
          Title={"現在リクエストされているSoundCloudの音MADはありません"}
        />
      );

  return (
    <RequestsPageCommon
      page={page}
      fragment={findUncheckedSoundcloudRegistrationRequestsByOffset}
      Title={"リクエストされているSoundCloudの音MAD"}
      Link={({ children, sourceId, ...rest }) => (
        <Link href={`/requests/soundcloud/${sourceId}`} {...rest}>
          {children}
        </Link>
      )}
      Button={({ ...rest }) => (
        <RegisterButton platform="soundcloud" {...rest} />
      )}
      paginatorPathname="/requests/soundcloud"
    />
  );
}
