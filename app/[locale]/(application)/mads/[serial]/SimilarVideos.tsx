import clsx from "clsx";

import CommonMadBlock from "~/components/CommonMadBlock";
import { FragmentType, graphql, useFragment } from "~/gql";
import { makeGraphQLClient } from "~/gql/fetch";

export const SimilarVideosFragment = graphql(`
  fragment VideoPage_SimilarVideosSectionPresentation on VideoSimilarVideosPayload {
    items {
      to {
        id
        ...CommonMadBlock
        ...CommonMadBlock_LikeSwitch
      }
    }
  }
`);
export function SimilarVideosPresentation({
  className,
  fragment,
}: {
  className?: string;
  fragment: FragmentType<typeof SimilarVideosFragment>;
}) {
  const { items } = useFragment(SimilarVideosFragment, fragment);
  return (
    <div className={clsx(className, "@container")}>
      {items.length === 0 && (
        <p className={clsx("text-sm text-snow-darkest")}>
          似ている動画を見つけられませんでした。
        </p>
      )}
      <div
        className={clsx(
          "grid w-full grid-cols-1 gap-x-2 gap-y-4 @[384px]:grid-cols-2 @[512px]:grid-cols-3 @[768px]:grid-cols-4 @[768px]:gap-x-4 @[1024px]:grid-cols-6 @[1536px]:grid-cols-8"
        )}
      >
        {items.map((item) => (
          <CommonMadBlock
            key={item.to.id}
            fragment={item.to}
            size="small"
            likeable={item.to}
          />
        ))}
      </div>
    </div>
  );
}

export const SimilarVideosFragment2 = graphql(`
  fragment MadPage_SimilarVideosSection on Video {
    id
  }
`);
export default async function SimilarVideos({
  fragment,
  ...props
}: {
  className?: string;
  fragment: FragmentType<typeof SimilarVideosFragment2>;
}) {
  const { id: videoId } = useFragment(SimilarVideosFragment2, fragment);
  const data = await makeGraphQLClient({}).request(
    graphql(`
      query VideoPage_SimilarVideosSection($id: ID!) {
        getVideo(id: $id) {
          similarVideos(input: { limit: 12 }) {
            ...VideoPage_SimilarVideosSectionPresentation
          }
        }
      }
    `),
    { id: videoId }
  );
  return (
    <SimilarVideosPresentation
      {...props}
      fragment={data.getVideo.similarVideos}
    />
  );
}
