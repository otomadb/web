import clsx from "clsx";
import { notFound } from "next/navigation";

import { Mylists } from "~/components/pages/UserMylists";
import { getFragment, graphql } from "~/gql";
import {
  UserMylistsPage_MylistsFragmentDoc,
  UserPageLayout_NavFragmentDoc,
} from "~/gql/graphql";
import { gqlRequest } from "~/utils/gqlRequest";

import { Nav } from "../Nav";

export default async function Page({ params }: { params: { name: string } }) {
  const { findUser } = await gqlRequest(
    graphql(`
      query UserMylistsPage($name: String!) {
        findUser(input: { name: $name }) {
          id
          ...UserPageLayout_Nav
          mylists(input: { limit: 10 }) {
            ...UserMylistsPage_Mylists
          }
        }
      }
    `),
    { name: params.name }
  );

  if (!findUser) notFound();

  return (
    <>
      <Nav
        highlight="MYLISTS"
        user={getFragment(UserPageLayout_NavFragmentDoc, findUser)}
      />
      <main className={clsx(["py-4"])}>
        <Mylists
          pageUserId={findUser.id}
          fallback={getFragment(
            UserMylistsPage_MylistsFragmentDoc,
            findUser.mylists
          )}
        />
      </main>
    </>
  );
}
