import clsx from "clsx";
import { notFound } from "next/navigation";

import Paginator from "~/components/Paginator";
import { graphql } from "~/gql";
import { makeGraphQLClient } from "~/gql/fetch";

import RegistrationItem from "../mylists/[slug]/RegistrationItem";

export default async function Page({
  params,
  searchParams,
}: {
  params: { name: string };
  searchParams: { page?: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  if (page < 1) notFound();

  const PER_PAGE = 36;
  const result = await makeGraphQLClient().request(
    graphql(`
      query UserLikesPage2($name: String!, $offset: Int!, $take: Int!) {
        findUser(input: { name: $name }) {
          name
          displayName
          likes {
            id
            registrationsByOffset(input: { offset: $offset, take: $take }) {
              totalCount
              nodes {
                id
                ...UserMylistPage_Registration
              }
            }
          }
        }
      }
    `),
    {
      name: params.name,
      offset: (page - 1) * PER_PAGE,
      take: PER_PAGE,
    }
  );

  const { findUser } = result;
  if (
    !findUser ||
    !findUser.likes ||
    (page !== 1 && findUser.likes.registrationsByOffset.nodes.length === 0)
  )
    notFound();

  const pageMax = Math.ceil(
    findUser.likes.registrationsByOffset.totalCount / PER_PAGE
  );

  return (
    <div className={clsx("@container/mylist")}>
      <div className={clsx("flex w-full items-center px-4 py-2")}>
        <div className="shrink-0 grow">
          <h1 className="text-xl font-bold text-snow-primary">
            {findUser.displayName}が良いと思った音MAD
          </h1>
        </div>
        <Paginator
          size="sm"
          className={clsx()}
          pageMax={pageMax}
          currentPage={page}
          pathname={`/users/${findUser.name}/likes`}
        />
      </div>
      {findUser.likes.registrationsByOffset.nodes.length === 0 && (
        <div>
          <p className={clsx("text-center text-sm text-snow-darker")}>
            このユーザーはまだ何も良いと思った音MADがありません。
          </p>
        </div>
      )}
      {findUser.likes.registrationsByOffset.nodes.length >= 1 && (
        <>
          <div
            className={clsx(
              "grid w-full grid-cols-1 flex-col gap-2 @[512px]/mylist:grid-cols-2 @[768px]/mylist:grid-cols-3 @[1024px]/mylist:grid-cols-4"
            )}
          >
            {findUser.likes.registrationsByOffset.nodes.map((node) => (
              <RegistrationItem key={node.id} fragment={node} />
            ))}
          </div>
          <div
            className={clsx("flex w-full items-center justify-end px-4 py-2")}
          >
            <Paginator
              size="sm"
              className={clsx()}
              pageMax={pageMax}
              currentPage={page}
              pathname={`/users/${findUser.name}/likes`}
            />
          </div>
        </>
      )}
    </div>
  );
}