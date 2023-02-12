"use client";
import { ArrowUturnLeftIcon, CheckIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import React, { useCallback, useMemo, useState } from "react";
import { useMutation, useQuery } from "urql";

import { BlueButton, RedButton } from "~/components/common/Button";
import { Tag } from "~/components/common/Tag";
import { TagSearcher } from "~/components/common/TagSearcher";
import { getFragment, graphql } from "~/gql";
import {
  Component_TagFragmentDoc,
  VideoPage_ResolveSemitagDocument,
  VideoPage_SemitagEditor_SemitagDocument,
  VideoPage_SemitagEditor_TagDocument,
} from "~/gql/graphql";

graphql(`
  query VideoPage_SemitagEditor_Semitag($semitagId: ID!) {
    semitag(id: $semitagId) {
      id
      name
    }
  }

  query VideoPage_SemitagEditor_Tag($tagId: ID!) {
    tag(id: $tagId) {
      ...Component_Tag
    }
  }

  mutation VideoPage_ResolveSemitag($input: ResolveSemitagInput!) {
    resovleSemitag(input: $input) {
      __typename
      ... on ResolveSemitagSucceededPayload {
        semitag {
          id
          video {
            ...VideoPage_TagsSection
            ...VideoPage_SemitagsSection
          }
        }
      }
    }
  }
`);
export const SemitagEditor: React.FC<{
  className?: string;
  semitagId: string;
  handleSelected(): void;
}> = ({ className, semitagId, handleSelected }) => {
  const [{ data: semitagData }] = useQuery({
    query: VideoPage_SemitagEditor_SemitagDocument,
    variables: { semitagId },
  });
  const semitagName = useMemo(() => semitagData?.semitag.name, [semitagData]);

  const [, trigger] = useMutation(VideoPage_ResolveSemitagDocument);

  const [resolveToTagId, setResolveToTagId] = useState<string | undefined>(
    undefined
  );
  const [{ data: tagData }] = useQuery({
    query: VideoPage_SemitagEditor_TagDocument,
    variables: resolveToTagId ? { tagId: resolveToTagId } : undefined,
  });

  const handleResolve = useCallback(async () => {
    if (!resolveToTagId) return; // TODO: ...
    await trigger({ input: { id: semitagId, tagId: resolveToTagId } });
    handleSelected();
  }, [handleSelected, resolveToTagId, semitagId, trigger]);

  return (
    <div
      className={clsx(
        className,
        ["bg-white"],
        ["border", "border-slate-300"],
        ["px-4", "py-2"],
        ["rounded"],
        ["flex", "flex-col", "items-stretch"]
      )}
    >
      <p className={clsx(["text-xs"], ["text-slate-900"])}>
        仮タグ
        {semitagData && (
          <span
            className={clsx(
              ["inline-block"],
              ["font-bold"],
              ["px-1", "py-0.5"],
              ["text-slate-800"]
            )}
          >
            {semitagName}
          </span>
        )}
        を編集する
      </p>
      <div className={clsx(["mt-2"])}>
        <TagSearcher handleSelect={(id) => setResolveToTagId(id)} />
      </div>
      <div className={clsx(["mt-2"])}>
        <p className={clsx(["text-xs"], ["text-slate-600"])}>
          {resolveToTagId && (
            <>
              {tagData && (
                <Tag
                  className={clsx(["inline-block"])}
                  tag={getFragment(Component_TagFragmentDoc, tagData.tag)}
                  Wrapper={(props) => <span {...props} />}
                />
              )}
              として解決する
            </>
          )}
          {!resolveToTagId && <>棄却する</>}
        </p>
      </div>
      <div className={clsx(["mt-4"], ["flex", "justify-end", "items-stretch"])}>
        <div className={clsx(["flex"], ["gap-x-2"])}>
          <RedButton
            className={clsx(["px-2", "py-1"])}
            onClick={() => setResolveToTagId(undefined)}
            disabled={!resolveToTagId}
          >
            <div className={clsx(["flex"], ["items-center"])}>
              <ArrowUturnLeftIcon className={clsx(["w-4"], ["h-4"])} />
              <div className={clsx(["ml-1"], ["text-sm"])}>やり直す</div>
            </div>
          </RedButton>
          <BlueButton
            className={clsx(["px-2", "py-1"])}
            onClick={() => handleResolve()}
          >
            <div className={clsx(["flex"], ["items-center"])}>
              <CheckIcon className={clsx(["w-4"], ["h-4"])} />
              <div className={clsx(["ml-1"], ["text-sm"])}>確定する</div>
            </div>
          </BlueButton>
        </div>
      </div>
    </div>
  );
};
