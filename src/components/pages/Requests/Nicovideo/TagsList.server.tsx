import clsx from "clsx";

import { LinkTag } from "~/app/tags/[serial]/Link";
import { CommonTag } from "~/components/common/Tag";
import {
  FragmentType,
  getFragment,
  getFragment as useFragment,
  graphql,
} from "~/gql";
import { CommonTagFragmentDoc } from "~/gql/graphql";

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
              <CommonTag
                fragment={getFragment(CommonTagFragmentDoc, tagging.tag)}
              />
            </LinkTag>
          </div>
          <div>{tagging.note && <span>{tagging.note}</span>}</div>
        </div>
      ))}
    </div>
  );
}
