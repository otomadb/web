"use client";

import clsx from "clsx";

import { LinkUser as UserLink } from "~/app/users/[name]/Link";
import { SemitagButton } from "~/components/Form/SemitagButton";
import {
  Fragment as TagButtonFragment,
  TagButton,
} from "~/components/Form/TagButton";
import { UserIcon } from "~/components/UserIcon";
import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment RegisterFromYoutubeForm_Request on YoutubeRegistrationRequest {
    title
    checked
    requestedBy {
      ...Link_User
      ...UserIcon
      id
      displayName
    }
    taggings {
      id
      tag {
        id
        ...CommonTag
      }
    }
    semitaggings {
      id
      name
    }
  }
`);
export const RequestExists = ({
  className,
  selectingTagId,
  removeTag,
  appendTag,
  selectingSemitagNames,
  appendSemitag,
  removeSemitag,
  ...props
}: {
  className?: string;
  fragment: FragmentType<typeof Fragment>;

  selectingTagId: string[];
  appendTag(a: {
    tagId: string;
    fragment: FragmentType<typeof TagButtonFragment>;
  }): void;
  removeTag(tagId: string): void;

  selectingSemitagNames: string[];
  appendSemitag(name: string): void;
  removeSemitag(name: string): void;
}) => {
  const fragment = useFragment(Fragment, props.fragment);

  return (
    <div className={clsx(className, ["flex", "flex-col", "gap-y-2"])}>
      <div className={clsx(["flex", "items-center"])}>
        <p className={clsx(["flex-grow"], ["text-sm", "text-slate-500"])}>
          <span className={clsx(["font-bold", "text-slate-400"])}>
            {fragment.title}
          </span>
          としてリクエストされています
        </p>
        <div className={clsx(["flex-shrink-0"])}>
          <UserLink fragment={fragment.requestedBy}>
            <UserIcon size={24} fragment={fragment.requestedBy} />
          </UserLink>
        </div>
      </div>
      <div className={clsx(["flex", "flex-col", "gap-y-2"])}>
        <div
          className={clsx(
            ["py-0.5"],
            ["flex-shrink-0"],
            ["text-xs", "text-slate-500"]
          )}
        >
          タグ
        </div>
        {fragment.taggings.length === 0 && (
          <div
            className={clsx(["flex-shrink-0"], ["text-xs", "text-slate-400"])}
          >
            なし
          </div>
        )}
        {fragment.taggings.length > 0 && (
          <div className={clsx(["flex", "flex-wrap", "gap-x-1", "gap-y-1"])}>
            {fragment.taggings.map((tagging) => (
              <TagButton
                key={tagging.id}
                fragment={tagging.tag}
                tagId={tagging.tag.id}
                append={(f) =>
                  appendTag({ tagId: tagging.tag.id, fragment: f })
                }
                remove={() => removeTag(tagging.tag.id)}
                selected={selectingTagId.includes(tagging.tag.id)}
              />
            ))}
          </div>
        )}
      </div>
      <div className={clsx(["flex", "flex-col", "gap-y-2"])}>
        <div
          className={clsx(
            ["py-0.5"],
            ["flex-shrink-0"],
            ["text-xs", "text-slate-500"]
          )}
        >
          仮タグ
        </div>
        {fragment.semitaggings.length === 0 && (
          <div
            className={clsx(["flex-shrink-0"], ["text-xs", "text-slate-400"])}
          >
            なし
          </div>
        )}
        {fragment.semitaggings.length > 0 && (
          <div className={clsx(["flex", "flex-wrap", "gap-x-1", "gap-y-1"])}>
            {fragment.semitaggings.map((semitagging) => (
              <SemitagButton
                key={semitagging.id}
                name={semitagging.name}
                append={() => appendSemitag(semitagging.name)}
                remove={() => removeSemitag(semitagging.name)}
                selected={selectingSemitagNames.includes(semitagging.name)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
