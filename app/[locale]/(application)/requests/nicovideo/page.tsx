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
  const t = await getScopedI18n("page.nicovideoRequests");

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
      query NicovideoRequestsPage2($offset: Int!, $take: Int!) {
        findUncheckedNicovideoRegistrationRequestsByOffset(
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

  const { findUncheckedNicovideoRegistrationRequestsByOffset } = result;

  if (findUncheckedNicovideoRegistrationRequestsByOffset.nodes.length === 0)
    if (page > 1) redirect("/requests/nicovideo");
    else
      return (
        <NoRequests
          Title={"現在リクエストされているニコニコ動画の音MADはありません"}
        />
      );

  return (
    <RequestsPageCommon
      page={page}
      fragment={findUncheckedNicovideoRegistrationRequestsByOffset}
      Title={"リクエストされているニコニコ動画の音MAD"}
      Link={({ children, sourceId, ...rest }) => (
        <Link href={`/requests/nicovideo/${sourceId}`} {...rest}>
          {children}
        </Link>
      )}
      Button={({ ...rest }) => (
        <RegisterButton platform="nicovideo" {...rest} />
      )}
      paginatorPathname="/requests/nicovideo"
    />
  );
}
