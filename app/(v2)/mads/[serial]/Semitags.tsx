import clsx from "clsx";

import { CommonSemitag2 } from "~/components/CommonSemitag";
import { FragmentType, graphql, useFragment } from "~/gql";
import { makeGraphQLClient } from "~/gql/fetch";

export const Fragment = graphql(`
  fragment VideoPageLayout_SemitagsSectionContents on Video {
    id
  }
`);
export default async function SemitagsSectionSC({
  className,
  fragment,
}: {
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}) {
  const {
    getVideo: { semitags },
  } = await makeGraphQLClient().request(
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
    { id: useFragment(Fragment, fragment).id }
  );

  return (
    <div className={clsx(className)}>
      <div className={clsx("flex flex-col items-start gap-y-0.5")}>
        {semitags.map((semitag) => (
          <CommonSemitag2 key={semitag.id} fragment={semitag} size="xs" />
        ))}
      </div>
    </div>
  );
}
