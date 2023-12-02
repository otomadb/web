import clsx from "clsx";
import { notFound } from "next/navigation";

import Paginator from "~/components/Paginator";
import { graphql } from "~/gql";
import { makeGraphQLClient } from "~/gql/fetch";

import RegistrationItem from "./RegistrationItem";

export default async function Page({
  params,
  searchParams,
}: {
  params: { name: string; id: string };
  searchParams: { page?: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  if (page < 1) notFound();

  const PER_PAGE = 36;

  const result = await makeGraphQLClient().request(
    graphql(`
      query UserMylistPage2(
        $name: String!
        $mylistId: ID!
        $offset: Int!
        $take: Int!
      ) {
        findUser(input: { name: $name }) {
          ...UserPage_SideNav
          name
          mylist(id: $mylistId) {
            slug
            title
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
      mylistId: params.id,
      offset: (page - 1) * PER_PAGE,
      take: PER_PAGE,
    }
  );

  const { findUser } = result;
  if (!findUser || !findUser.mylist) notFound();

  const pageMax = Math.ceil(
    findUser.mylist.registrationsByOffset.totalCount / PER_PAGE
  );

  return (
    <div className={clsx("@container/mylist")}>
      <div className={clsx("flex w-full items-center px-4 py-2")}>
        <div className="shrink-0 grow">
          <h1 className="text-xl font-bold text-snow-primary">
            {findUser.mylist.title}が良いと思った音MAD
          </h1>
        </div>
        <Paginator
          size="sm"
          className={clsx()}
          pageMax={pageMax}
          currentPage={page}
          pathname={`/users/${findUser.name}/mylists/${findUser.mylist.slug}`}
        />
      </div>
      <div
        className={clsx(
          "grid w-full grid-cols-1 flex-col gap-2 @[512px]/mylist:grid-cols-2 @[768px]/mylist:grid-cols-3 @[1024px]/mylist:grid-cols-4"
        )}
      >
        {findUser.mylist.registrationsByOffset.nodes.map((node) => (
          <RegistrationItem key={node.id} fragment={node} />
        ))}
      </div>
      <div className={clsx("flex w-full items-center justify-end px-4 py-2")}>
        <Paginator
          size="sm"
          className={clsx()}
          pageMax={pageMax}
          currentPage={page}
          pathname={`/users/${findUser.name}/mylists/${findUser.mylist.slug}`}
        />
      </div>
    </div>
  );
}
