import clsx from "clsx";

import { FragmentType, graphql, useFragment } from "~/gql";

import { Semitag } from "./Semitag";

const Fragment = graphql(`
  fragment VideoPage_SemitagsSection on Video {
    id
    semitags(checked: false) {
      id
      ...VideoPage_Semitag
    }
  }
`);
export function SemitagsList({
  className,
  ...props
}: {
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}): JSX.Element {
  const fragment = useFragment(Fragment, props.fragment);

  return (
    <div className={clsx(className, ["flex", "flex-col", "gap-y-0.5"])}>
      {fragment.semitags.map((semitag) => (
        <Semitag key={semitag.id} fragment={semitag} />
      ))}
    </div>
  );
}
