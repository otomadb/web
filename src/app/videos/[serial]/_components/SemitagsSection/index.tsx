import clsx from "clsx";

import Semitag from "~/components/CommonSemitag";
import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment VideoPageLayout_SemitagsSection on Video {
    semitags(checked: false) {
      id
      ...CommonSemitag
    }
  }
`);
export default function SemitagsSection({
  ...props
}: {
  fragment: FragmentType<typeof Fragment>;
}) {
  const fragment = useFragment(Fragment, props.fragment);

  return (
    <div>
      <div className={clsx(["flex", "flex-col", "gap-y-0.5"])}>
        {fragment.semitags.map((semitag) => (
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
