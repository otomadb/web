import clsx from "clsx";

import Semitag from "~/components/CommonSemitag";
import { FragmentType, graphql, useFragment } from "~/gql";
import { fetchGql3 } from "~/gql/fetch";
import { isErr } from "~/utils/Result";

export const Fragment = graphql(`
  fragment VideoPageLayout_SemitagsSectionContents on Video {
    id
  }
`);
export default async function SemitagsSectionSC({
  ...props
}: {
  fragment: FragmentType<typeof Fragment>;
}) {
  const fragment = useFragment(Fragment, props.fragment);
  const result = await fetchGql3(
    graphql(`
      query VideoPageLayout_SemitagsSectionContentsQuery($id: ID!) {
        getVideo(id: $id) {
          semitags(checked: false) {
            id
            ...CommonSemitag
          }
        }
      }
    `),
    { id: fragment.id }
  );
  if (isErr(result)) throw new Error("Failed to fetch video semitaggings");

  const { semitags } = result.data.getVideo;
  return (
    <div>
      <div className={clsx(["flex", "flex-col", "gap-y-0.5"])}>
        {semitags.map((semitag) => (
          <div key={semitag.id} className={clsx(["flex"])}>
            <Semitag
              fragment={semitag}
              className={clsx(["text-xs"], ["px-1"], ["py-0.5"])}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
