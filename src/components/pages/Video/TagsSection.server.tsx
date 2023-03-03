import "server-only";

import clsx from "clsx";
import React from "react";

import { LinkTag } from "~/app/tags/[serial]/Link";
import { CommonTag } from "~/components/common/Tag";
import { getFragment, graphql } from "~/gql";
import { fetchGql } from "~/gql/fetch";
import {
  VideoPage_TagsSectionFragmentDoc,
  VideoPage_TagTypesListFragment,
  VideoPage_TagTypesListFragmentDoc,
} from "~/gql/graphql";
import { styleByTagType } from "~/utils/styleByTagType";

graphql(`
  fragment VideoPage_TagsSection on Video {
    id
    taggings(input: {}) {
      ...VideoPage_TagTypesList
      nodes {
        tag {
          ...Link_Tag
          ...CommonTag
          id
        }
      }
    }
  }
`);
export const TagsSection = async ({
  className,
  videoId,
}: {
  className?: string;
  videoId: string;
}) => {
  const { getVideo } = await fetchGql(
    graphql(`
      query VideoPage_TagsSection($id: ID!) {
        getVideo(id: $id) {
          ...VideoPage_TagsSection
        }
      }
    `),
    { id: videoId },
    { next: { revalidate: 0 } }
  );
  const fragment = getFragment(VideoPage_TagsSectionFragmentDoc, getVideo);

  return (
    <section className={clsx(className)}>
      <div className={clsx(["flex"], ["items-center"])}>
        <h2 className={clsx(["flex-grow"], ["text-xl"], ["text-slate-900"])}>
          タグ
        </h2>
      </div>
      <TagTypesList
        fragment={getFragment(
          VideoPage_TagTypesListFragmentDoc,
          fragment.taggings
        )}
      />
      <div className={clsx(["mt-2"], ["flex", "flex-col", "items-start"])}>
        {fragment.taggings.nodes.map((tagging) => (
          <LinkTag key={tagging.tag.id} fragment={tagging.tag}>
            <CommonTag
              className={clsx(["text-xs"], ["px-1"], ["py-0.5"])}
              fragment={tagging.tag}
            />
          </LinkTag>
        ))}
      </div>
    </section>
  );
};

graphql(`
  fragment VideoPage_TagTypesList on VideoTagConnection {
    nodes {
      tag {
        pseudoType
      }
    }
  }
`);
export const TagTypesList: React.FC<{
  className?: string;
  fragment: VideoPage_TagTypesListFragment;
}> = ({ className, fragment }) => {
  const types = fragment.nodes
    .map(({ tag: { pseudoType } }) => pseudoType)
    .filter((v1, i, arr) => i === arr.findIndex((v2) => v1 === v2));

  return (
    <div className={clsx(className, ["flex"], ["gap-x-2"], ["gap-y-2"])}>
      {types.map((type) => (
        <div key={type} className={clsx(["flex"])}>
          <span
            className={clsx(
              ["select-all"],
              ["text-xs", styleByTagType(type, "text")]
            )}
          >
            {type}
          </span>
        </div>
      ))}
    </div>
  );
};
