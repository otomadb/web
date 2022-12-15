"use client";

import "client-only";

import clsx from "clsx";
import React, { useState } from "react";

import { graphql } from "~/gql";

import { useTags } from "../../context";
import { EditToggle } from "./EditToggle";
import { TagsList } from "./List";
import { TagsEditer } from "./TagsEditer";

graphql(`
  fragment VideoPage_VideoTags on Video {
    id
    tags {
      ...VideoPage_Tag
    }
  }
`);

export const SectionInner: React.FC<{
  className?: string;
}> = ({ className }) => {
  const [edit, setEdit] = useState(false);
  const tags = useTags();

  if (!tags) return <span>LOADIGN</span>;

  return (
    <div className={clsx(className, ["mt-2"])}>
      <div className={clsx(["h-8"], ["flex", ["items-center"]])}>
        <EditToggle edit={edit} toggleEdit={(v) => setEdit(v)} />
        <TagsEditer className={clsx(["ml-2"], ["w-full"], { hidden: !edit })} />
      </div>
      <TagsList className={clsx(["mt-1"])} tags={tags} edit={edit} />
    </div>
  );
};
