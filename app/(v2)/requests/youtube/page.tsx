import { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { graphql } from "~/gql";
import { makeGraphQLClient } from "~/gql/fetch";

import NoRequests from "../NoRequests";
import RegisterButton from "../RegisterButton";
import RequestsPageCommon, { PER_PAGE } from "../RequestsPageCommon";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { page?: string };
}): Promise<Metadata> {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;

  return {
    title: `リクエストされているYouTubeの音MAD(${page}ページ目) | OtoMADB`,
    openGraph: {
      title: `リクエストされているYouTubeの音MAD(${page}ページ目) | OtoMADB`,
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
      query YoutubeRequestsPage2($offset: Int!, $take: Int!) {
        findUncheckedYoutubeRegistrationRequestsByOffset(
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

  const { findUncheckedYoutubeRegistrationRequestsByOffset } = result;

  if (findUncheckedYoutubeRegistrationRequestsByOffset.nodes.length === 0)
    if (page > 1) redirect("/requests/youtube");
    else
      return (
        <NoRequests
          Title={"現在リクエストされているYoutubeの音MADはありません"}
        />
      );

  return (
    <RequestsPageCommon
      page={page}
      Title={"リクエストされているYouTubeの音MAD"}
      fragment={findUncheckedYoutubeRegistrationRequestsByOffset}
      Link={({ children, sourceId, ...rest }) => (
        <Link href={`/requests/youtube/${sourceId}`} {...rest}>
          {children}
        </Link>
      )}
      Button={({ ...rest }) => <RegisterButton platform="youtube" {...rest} />}
      paginatorPathname="/requests/youtube"
    />
  );
}
