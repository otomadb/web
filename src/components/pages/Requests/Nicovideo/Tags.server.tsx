import clsx from "clsx";

import { LinkTag } from "~/app/tags/[serial]/Link";
import { CommonTag } from "~/components/common/Tag";
import { getFragment, graphql } from "~/gql";
import {
  CommonTagFragmentDoc,
  Link_TagFragmentDoc,
  NicovideoRequestPage_SemitagsListFragment,
  NicovideoRequestPage_TagsListFragment,
} from "~/gql/graphql";

graphql(`
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
  fragment: NicovideoRequestPage_TagsListFragment;
}) {
  return (
    <div>
      {fragment.taggings.map((tagging) => (
        <div key={tagging.id}>
          <div>
            <LinkTag
              className={clsx(["block"])}
              fragment={getFragment(Link_TagFragmentDoc, tagging.tag)}
            >
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

graphql(`
  fragment NicovideoRequestPage_SemitagsList on NicovideoRegistrationRequest {
    semitaggings {
      id
      name
      note
    }
  }
`);
export function SemitagsList({
  fragment,
}: {
  fragment: NicovideoRequestPage_SemitagsListFragment;
}) {
  return (
    <div>
      {fragment.semitaggings.map((semitagging) => (
        <div key={semitagging.id}>
          <div>
            <span>{semitagging.name}</span>
          </div>
          <div>{semitagging.note && <span>{semitagging.note}</span>}</div>
        </div>
      ))}
    </div>
  );
}
