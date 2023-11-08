import clsx from "clsx";

import { LinkTag } from "~/app/(application)/tags/[serial]/Link";
import { CommonTag } from "~/components/CommonTag";
import { FragmentType, graphql, useFragment } from "~/gql";

const Fragment = graphql(`
  fragment NicovideoRequestPage_TagsList on NicovideoRegistrationRequest {
    taggings {
      id
      tag {
        ...CommonTag
        ...Link_Tag
      }
      note
    }
  }
`);
export function TagsList({
  fragment,
}: {
  fragment: FragmentType<typeof Fragment>;
}) {
  const { taggings } = useFragment(Fragment, fragment);

  return (
    <div>
      {taggings.map((tagging) => (
        <div key={tagging.id}>
          <div>
            <LinkTag className={clsx(["block"])} fragment={tagging.tag}>
              <CommonTag fragment={tagging.tag} />
            </LinkTag>
          </div>
          <div>{tagging.note && <span>{tagging.note}</span>}</div>
        </div>
      ))}
    </div>
  );
}
