import "server-only";

import clsx from "clsx";
import React from "react";

import { Tag } from "~/components/common/Tag";
import { getFragment, graphql } from "~/gql";
import { Component_TagFragmentDoc } from "~/gql/graphql";
import { gqlRequest } from "~/utils/gqlRequest";

export async function TagsSection({
  className,
  videoId,
}: {
  className?: string;
  videoId: string;
}) {
  const { video } = await gqlRequest(
    graphql(`
      query VideoPage_TagsSection($id: ID!) {
        video(id: $id) {
          id
          tags(input: {}) {
            tag {
              id
              ...Component_Tag
            }
          }
        }
      }
    `),
    { id: videoId }
  );

  return (
    <section className={clsx(className)}>
      <div className={clsx(["flex"], ["items-center"])}>
        <h2 className={clsx(["flex-grow"], ["text-xl"], ["text-slate-900"])}>
          タグ
        </h2>
      </div>
      <div className={clsx(["mt-2"], ["flex", "flex-col", "items-start"])}>
        {video.tags.map((tagging) => (
          <Tag
            key={tagging.tag.id}
            tag={getFragment(Component_TagFragmentDoc, tagging.tag)}
          />
        ))}
      </div>
    </section>
  );
}
