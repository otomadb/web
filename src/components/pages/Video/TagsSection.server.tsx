import "server-only";

import clsx from "clsx";
import React from "react";

import { Tag } from "~/components/common/Tag";
import { getFragment, graphql } from "~/gql";
import {
  Component_TagFragmentDoc,
  VideoPage_TagsSectionFragment,
} from "~/gql/graphql";

graphql(`
  fragment VideoPage_TagsSection on Video {
    id
    tags(input: {}) {
      tag {
        id
        ...Component_Tag
      }
    }
  }
`);

export const TagsSection: React.FC<{
  className?: string;
  fragment: VideoPage_TagsSectionFragment;
}> = ({ className, fragment }) => {
  return (
    <section className={clsx(className)}>
      <div className={clsx(["flex"], ["items-center"])}>
        <h2 className={clsx(["flex-grow"], ["text-xl"], ["text-slate-900"])}>
          タグ
        </h2>
      </div>
      <div className={clsx(["mt-2"], ["flex", "flex-col", "items-start"])}>
        {fragment.tags.map((tagging) => (
          <Tag
            key={tagging.tag.id}
            tag={getFragment(Component_TagFragmentDoc, tagging.tag)}
          />
        ))}
      </div>
    </section>
  );
};
