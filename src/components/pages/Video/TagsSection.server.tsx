import "server-only";

import clsx from "clsx";
import React from "react";

import { Tag } from "~/components/common/Tag";
import { getFragment, graphql } from "~/gql";
import {
  Component_TagFragmentDoc,
  VideoPage_TagsSectionFragmentDoc,
  VideoPage_TagTypesListFragment,
  VideoPage_TagTypesListFragmentDoc,
} from "~/gql/graphql";
import { fetchGql } from "~/utils/fetchGql";
import { styleByTagType } from "~/utils/styleByTagType";

graphql(`
  fragment VideoPage_TagsSection on Video {
    id
    taggings(input: {}) {
      ...VideoPage_TagTypesList
      nodes {
        tag {
          id
          ...Component_Tag
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

  const taggings = getFragment(
    VideoPage_TagsSectionFragmentDoc,
    getVideo
  ).taggings;

  return (
    <section className={clsx(className)}>
      <div className={clsx(["flex"], ["items-center"])}>
        <h2 className={clsx(["flex-grow"], ["text-xl"], ["text-slate-900"])}>
          タグ
        </h2>
      </div>
      <TagTypesList
        fragment={getFragment(VideoPage_TagTypesListFragmentDoc, taggings)}
      />
      <div className={clsx(["mt-2"], ["flex", "flex-col", "items-start"])}>
        {taggings.nodes.map((tagging) => (
          <Tag
            key={tagging.tag.id}
            tag={getFragment(Component_TagFragmentDoc, tagging.tag)}
          />
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
