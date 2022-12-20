import clsx from "clsx";

import { VideoList } from "~/components/common/VideoList";
import { graphql } from "~/gql";
import { gqlRequest } from "~/utils/gqlRequest";

export const revalidate = 60;

export default async function Page({ params }: { params: { id: string } }) {
  const { tag } = await gqlRequest(
    graphql(`
      query TagPage($id: ID!) {
        tag(id: $id) {
          id
          name
          type
          taggedVideos {
            id
            title
            thumbnailUrl
            tags {
              name
            }
          }
        }
      }
    `),
    { id: `tag:${params.id}` }
  );

  return (
    <>
      <h1 className={clsx(["flex"], ["items-center"])}>
        <span className={clsx(["block"], ["text-2xl"], ["text-slate-800"])}>
          {tag.name}
        </span>
      </h1>
      <div className={clsx(["mt-4"])}>
        <VideoList
          className={clsx()}
          videos={tag.taggedVideos.map(({ id, title, thumbnailUrl }) => ({
            id,
            title,
            thumbnailUrl,
          }))}
        />
      </div>
    </>
  );
}
