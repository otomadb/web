"use client";

import "client-only";

import { XMarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import React, { useId } from "react";
import { FieldError } from "react-hook-form";
import { useQuery } from "urql";

import { RedButton } from "~/components/common/Button";
import { Tag } from "~/components/common/Tag";
import { TagSearcher } from "~/components/common/TagSearcher";
import { getFragment, graphql } from "~/gql";
import {
  Component_TagFragmentDoc,
  RegisterTagPage_ExplicitParentTagDocument,
} from "~/gql/graphql";

graphql(`
  query RegisterTagPage_ExplicitParentTag($id: ID!) {
    tag(id: $id) {
      ...Component_Tag
    }
  }
`);
export const ExplicitParentTag: React.FC<{
  className?: string;

  explicitParentTagId?: string;
  set(id: string): void;
  remove(): void;

  errors?: FieldError;

  implicitParentTagIds: string[];
}> = ({ className, explicitParentTagId, remove, set }) => {
  const labelId = useId();

  const [{ data }] = useQuery({
    query: RegisterTagPage_ExplicitParentTagDocument,
    pause: !explicitParentTagId,
    variables: explicitParentTagId ? { id: explicitParentTagId } : undefined,
  });

  return (
    <div className={clsx(className, ["flex", "flex-col"])}>
      <label className={clsx(["text-sm"])} htmlFor={labelId}>
        <div className={clsx(["text-xs"], ["text-slate-900"])}>
          明示的な親タグ
        </div>
        <TagSearcher
          className={clsx(["mt-1"])}
          handleSelect={(tagId) => set(tagId)}
          disabled={!!explicitParentTagId}
        />
      </label>
      {explicitParentTagId && data && (
        <div className={clsx(["mt-2"], ["flex", ["gap-x-2"]])}>
          <div className={clsx(["flex-grow"])}>
            <Tag tag={getFragment(Component_TagFragmentDoc, data.tag)} />
          </div>
          <RedButton
            type="button"
            className={clsx(["flex-shrink-0"], ["px-2"])}
            onClick={() => remove()}
          >
            <XMarkIcon className={clsx(["w-4"], ["h-4"])} />
          </RedButton>
        </div>
      )}
    </div>
  );
};
