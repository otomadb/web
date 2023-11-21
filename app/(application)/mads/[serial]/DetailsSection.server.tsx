import clsx from "clsx";

import { LinkVideoEvents } from "~/app/(application)/mads/[serial]/events/Link";
import { FragmentType, graphql, useFragment } from "~/gql";
import { fetchGql } from "~/gql/fetch";
import { isErr } from "~/utils/Result";

import LikeButton from "./LikeButton";
import { MadPageLink } from "./Link";
import { Image as VideoImage } from "./VideoPreview";

export const Fragment = graphql(`
  fragment VideoPageLayout_DetailsSection on Video {
    id
  }
`);
export default async function DetailsSectionSC({
  ...props
}: {
  fragment: FragmentType<typeof Fragment>;
}) {
  const fragment = useFragment(Fragment, props.fragment);
  const result = await fetchGql(
    graphql(`
      query VideoPageLayout_DetailsSectionQuery($id: ID!) {
        getVideo(id: $id) {
          ...Link_Video
          ...Link_VideoEvents
          ...VideoPageLayout_DetailsSection_VideoPreview
          ...VideoPage_LikeButton
          id
          title
        }
      }
    `),
    { id: fragment.id }
  );
  if (isErr(result)) throw new Error("Failed to fetch video details");

  const { getVideo } = result.data;
  return (
    <section className={clsx(["@container/details"])}>
      <div
        className={clsx(
          ["flex", ["flex-col", "@[1024px]/details:flex-row"]],
          ["gap-x-8"],
          ["gap-y-4"]
        )}
      >
        <VideoImage className={clsx(["shrink-0"])} fragment={getVideo} />
        <div className={clsx(["grow"])}>
          <h1
            className={clsx(
              ["text-lg", "lg:text-xl"],
              ["font-bold"],
              ["text-slate-900"]
            )}
          >
            <MadPageLink fragment={getVideo}>{getVideo.title}</MadPageLink>
          </h1>
          <LikeButton className={clsx(["mt-2"])} fragment={getVideo} />
          <LinkVideoEvents fragment={getVideo}>編集履歴を見る</LinkVideoEvents>
        </div>
      </div>
    </section>
  );
}