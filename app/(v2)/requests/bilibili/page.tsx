import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { graphql } from "~/gql";
import { makeGraphQLClient } from "~/gql/fetch";

import RegisterButton from "../RegisterButton";
import RequestsPageCommon, { PER_PAGE } from "../RequestsPageCommon";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { page?: string };
}): Promise<Metadata> {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;

  return {
    title: `リクエストされているbilibiliの音MAD(${page}ページ目) | OtoMADB`,
    openGraph: {
      title: `リクエストされているbilibiliの音MAD(${page}ページ目) | OtoMADB`,
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
      query BilibiliRequestsPage2($offset: Int!, $take: Int!) {
        findUncheckedBilibiliRegistrationRequestsByOffset(
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
  if (
    !result.findUncheckedBilibiliRegistrationRequestsByOffset ||
    result.findUncheckedBilibiliRegistrationRequestsByOffset.nodes.length === 0
  )
    notFound();

  const { findUncheckedBilibiliRegistrationRequestsByOffset } = result;

  return (
    <RequestsPageCommon
      page={page}
      Title={"リクエストされているbilibiliの音MAD"}
      fragment={findUncheckedBilibiliRegistrationRequestsByOffset}
      Link={({ children, sourceId, ...rest }) => (
        <Link href={`/requests/bilibili/${sourceId}`} {...rest}>
          {children}
        </Link>
      )}
      Button={({ ...rest }) => <RegisterButton platform="bilibili" {...rest} />}
      paginatorPathname="/requests/bilibili"
    />
  );
}
