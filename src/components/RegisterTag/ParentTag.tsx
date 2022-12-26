import { XMarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import React from "react";
import { useQuery } from "urql";

import { graphql } from "~/gql";
import { RegisterTag_GetParentTagDocument } from "~/gql/graphql";

graphql(`
  query RegisterTag_GetParentTag($id: ID!) {
    tag(id: $id) {
      id
      name
      pseudoType
      explicitParent {
        id
        name
      }
    }
  }
`);

export const ParentTag: React.FC<{
  className?: string;
  tagId: string;
  handleDelete(): void;
}> = ({ className, tagId, handleDelete }) => {
  const [{ data }] = useQuery({
    query: RegisterTag_GetParentTagDocument,
    variables: { id: tagId },
  });

  return (
    <div className={clsx(className, ["flex", "items-center"])}>
      <div
        className={clsx(
          ["flex-grow"],
          ["py-0.5", "px-2"],
          ["bg-white"],
          ["border"],
          ["rounded"],
          ["shadow"]
        )}
      >
        {data && (
          <div className={clsx(["text-sm"])}>
            <span className={clsx(["text-slate-900"])}>{data.tag.name}</span>
            {data.tag.explicitParent && (
              <span className={clsx(["ml-0.5"], ["text-slate-500"])}>
                ({data.tag.explicitParent.name})
              </span>
            )}
          </div>
        )}
      </div>
      <button
        type="button"
        className={clsx(
          ["ml-2"],
          ["group/button"],
          ["bg-red-400", "hover:bg-red-500"],
          ["px-2", "py-1"],
          ["rounded"]
        )}
        onClick={() => handleDelete()}
      >
        <XMarkIcon
          className={clsx(
            ["rounded"],
            ["shadow"],
            ["text-red-50", "group-hover:text-red-100"],
            ["w-4", "h-4"]
          )}
        />
      </button>
    </div>
  );
};
