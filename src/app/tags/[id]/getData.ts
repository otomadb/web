import "server-only";

import gqlRequest from "graphql-request";

import { graphql } from "~/gql";

const TagPageQueryDocument = graphql(`
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
`);

export const getData = async (
  id: string
): Promise<{
  id: string;
  name: string;
  context: {
    id: string;
    name_primary: string;
  } | null;
  taggedVideos: {
    id: string;
    title: string;
    thumbnailUrl: string;
  }[];
}> => {
  const { tag } = await gqlRequest(
    new URL("/graphql", process.env.NEXT_PUBLIC_API_ENDPOINT).toString(),
    TagPageQueryDocument,
    { id: `tag:${id}` }
  );

  return {
    id: tag.id,
    name: tag.name,
    context: null,
    taggedVideos: tag.taggedVideos.map(({ id, title, thumbnailUrl }) => ({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      id: id.split(":").at(1)!,
      title,
      thumbnailUrl,
    })),
  };
};
