import clsx from "clsx";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import CommonMadBlock from "~/components/CommonMadBlock";
import CommonTagLink from "~/components/CommonTagLink";
import { graphql } from "~/gql";
import { makeGraphQLClient2 } from "~/gql/fetch";

type PageParams = {
  group: string;
};

export async function generateMetadata({
  params: { group },
}: {
  params: PageParams;
}): Promise<Metadata> {
  const result = await (
    await makeGraphQLClient2({})
  ).request(
    // TODO: ここは`findAbstractGroup`に変えなくても良い気がする
    graphql(`
      query GroupsWellcreatedPage_Metadata($group: ID!) {
        getAbstractGroup(keyword: $group) {
          name
        }
      }
    `),
    { group }
  );

  const { getAbstractGroup } = result;
  if (!getAbstractGroup) return notFound();

  return {
    title: `よく音MADが作られている${getAbstractGroup.name} | OtoMADB`,
  };
}

/*
export async function generateStaticParams() {
  return await (
    await makeGraphQLClient2({})
  )
    .request(
      graphql(`
        query GroupsWellcreatedPage_StaticParams {
          getAllAbstractGroups {
            keyword
          }
        }
      `)
    )
    .then((v) =>
      v.getAllAbstractGroups.map(
        ({ keyword }) => ({ group: keyword }) satisfies PageParams
      )
    );
}
*/

const Page = async ({ params: { group } }: { params: PageParams }) => {
  const result = await (
    await makeGraphQLClient2({
      next: {
        revalidate: 60 * 15,
      },
    })
  ).request(
    // TODO: そのうち`findAbstractGroup`に変える
    graphql(`
      query GroupsWellcreatedPage($group: ID!) {
        getAbstractGroup(keyword: $group) {
          name
          belongingTags(input: { first: 15 }) {
            nodes {
              ...CommonTagLink
              id
              taggedVideos(first: 10) {
                totalCount
                nodes {
                  id
                  video {
                    ...CommonMadBlock
                  }
                }
              }
            }
          }
        }
      }
    `),
    { group }
  );

  const { getAbstractGroup } = result;
  if (!getAbstractGroup) return notFound();

  return (
    <main className={clsx("px-8 py-4 @container/page")}>
      <h1 className={clsx("text-2xl font-bold text-snow-primary")}>
        よく音MADが作られている
        <span>{getAbstractGroup.name}</span>
      </h1>
      <div className={clsx("mt-8 flex flex-col gap-y-8")}>
        {getAbstractGroup.belongingTags.nodes.map((tag) => (
          <section key={tag.id}>
            <h2 className={clsx("flex items-center")}>
              <CommonTagLink fragment={tag} size="small" />
              <span className={clsx("ml-2 font-bold text-snow-primary")}>
                {tag.taggedVideos.totalCount}件
              </span>
            </h2>
            <div
              className={clsx(
                "mt-4 grid w-full grid-cols-1 gap-2 @[384px]:grid-cols-2 @[512px]:grid-cols-3 @[768px]:grid-cols-4 @[1024px]:grid-cols-6"
              )}
            >
              {tag.taggedVideos.nodes.map((node) => (
                <CommonMadBlock
                  key={node.id}
                  fragment={node.video}
                  size="small"
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
};

export default Page;
