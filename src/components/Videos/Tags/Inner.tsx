"use client";

import "client-only";

import clsx from "clsx";
import React, { useMemo, useState } from "react";
import { useQuery } from "urql";

import { ToggleSwitch } from "~/components/common/ToggleSwitch";
import { getFragment as useFragment, graphql } from "~/gql";
import {
  VideoPage_TagsListFragmentDoc,
  VideoPage_TagsSectionFragment,
  VideoPage_TagsSectionFragmentDoc,
  VideoPage_UpstreamTagsSectionDocument,
} from "~/gql/graphql";
import { useIsLogin } from "~/hooks/useIsLogin";

import { TagsList } from "./TagsList";

graphql(`
  fragment VideoPage_TagsSection on Video {
    id
    ...VideoPage_TagsList
  }

  query VideoPage_UpstreamTagsSection($id: ID!) {
    video(id: $id) {
      id
      ...VideoPage_TagsSection
    }
  }
`);

export const Inner: React.FC<{
  className?: string;
  fallback: VideoPage_TagsSectionFragment;
}> = ({ className, fallback }) => {
  const [{ data }] = useQuery({
    query: VideoPage_UpstreamTagsSectionDocument,
    variables: { id: fallback.id },
  });
  const upstream = useFragment(VideoPage_TagsSectionFragmentDoc, data?.video);

  const video = useMemo(() => upstream || fallback, [fallback, upstream]);

  const tagslist = useFragment(VideoPage_TagsListFragmentDoc, video);

  const [edit, setEdit] = useState(false);
  const islogin = useIsLogin();

  return (
    <section className={clsx(className)}>
      <div className={clsx(["flex"], ["items-center"])}>
        <h2 className={clsx(["flex-grow"], ["text-xl"], ["text-slate-900"])}>
          タグ
        </h2>
        {islogin && (
          <ToggleSwitch
            className={clsx(["flex-shrink-0"])}
            handleToggle={(v) => setEdit(v)}
          />
        )}
      </div>
      <div className={clsx(["mt-2"], ["flex", "flex-col", "items-start"])}>
        <TagsList
          className={clsx(["mt-1"], ["w-full"])}
          edit={edit}
          fragment={tagslist}
        />
      </div>
    </section>
  );
};
