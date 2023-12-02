import clsx from "clsx";
import { notFound } from "next/navigation";

import { graphql } from "~/gql";
import { makeGraphQLClient } from "~/gql/fetch";

import SideNav from "../../SideNav";

export default async function Page({
  params,
  searchParams,
}: {
  params: { name: string; id: string };
  searchParams: { page?: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  if (page < 1) notFound();

  const PER_PAGE = 12;

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
          mylist(id: $mylistId) {
            id
            registrationsByOffset(input: { offset: $offset, take: $take }) {
              totalCount
              nodes {
                id
                note
                video {
                  ...Link_Video
                  ...VideoThumbnail
                  id
                  title
                  taggings(first: 3) {
                    nodes {
                      id
                      tag {
                        ...CommonTag
                      }
                    }
                  }
                }
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

  if (!result.findUser) notFound();
  const { findUser } = result;

  return (
    <div className={clsx("flex flex-wrap gap-x-4 @container/page")}>
      <SideNav className={clsx("w-72")} primaryFragment={findUser} />
      <div
        className={clsx(
          "grow border border-obsidian-primary bg-obsidian-darker p-4"
        )}
      >
        <p className={clsx("text-snow-primary")}>ここにマイリストを表示する</p>
      </div>
    </div>
  );
}
