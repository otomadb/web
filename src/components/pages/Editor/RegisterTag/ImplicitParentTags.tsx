"use client";

import "client-only";

import { XMarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import React, { useId } from "react";
import { FieldArrayWithId } from "react-hook-form";
import { useQuery } from "urql";

import { RedButton } from "~/components/common/Button";
import { Tag } from "~/components/common/Tag";
import { TagSearcher } from "~/components/common/TagSearcher";
import { getFragment, graphql } from "~/gql";
import {
  Component_TagFragmentDoc,
  RegisterTagPage_ImplicitParentTagDocument,
} from "~/gql/graphql";

import { FormSchema } from "./Form";

export const ImplictParentTags: React.FC<{
  className?: string;

  implicitParents: FieldArrayWithId<FormSchema, "implicitParents", "id">[];
  append(payload: { tagId: string }): void;
  remove(index: number): void;

  explicitParentTagId?: string;
}> = ({ className, append, remove, implicitParents }) => {
  const labelId = useId();

  return (
    <div className={clsx(className)}>
      <label className={clsx(["text-sm"])} htmlFor={labelId}>
        <div className={clsx(["text-xs"], ["text-slate-900"])}>
          非明示的な親タグ
        </div>
        <TagSearcher
          className={clsx(["mt-1"])}
          handleSelect={(tagId) => append({ tagId })}
        />
      </label>
      <div className={clsx(["mt-2"], ["flex", "flex-col"], ["space-y-2"])}>
        {implicitParents.map((field, index) => (
          <ListItem
            key={field.id}
            tagId={field.tagId}
            remove={() => remove(index)}
          />
        ))}
      </div>
    </div>
  );
};

graphql(`
  query RegisterTagPage_ImplicitParentTag($id: ID!) {
    tag(id: $id) {
      ...Component_Tag
    }
  }
`);
const ListItem: React.FC<{
  className?: string;
  tagId: string;
  remove(): void;
}> = ({ className, tagId, remove }) => {
  const [{ data }] = useQuery({
    query: RegisterTagPage_ImplicitParentTagDocument,
    variables: { id: tagId },
  });

  return (
    <div className={clsx(className, ["flex", "gap-x-2"])}>
      <div className={clsx(["flex-grow"])}>
        {data && <Tag tag={getFragment(Component_TagFragmentDoc, data.tag)} />}
      </div>
      <RedButton
        type="button"
        className={clsx(["flex-shrink-0"], ["px-2"])}
        onClick={() => remove()}
      >
        <XMarkIcon className={clsx(["w-4"], ["h-4"])} />
      </RedButton>
    </div>
  );
};
