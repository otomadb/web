"use client";

import clsx from "clsx";
import { CSSProperties } from "react";

import { PlusPictogram } from "~/components/Pictogram";
import { FragmentType, graphql, useFragment } from "~/gql";

import { FormWrapper2 } from "../FormWrapper";
import UpdateSlugForm from "./UpdateSlugForm";

export const EditMylistFragment = graphql(`
  fragment EditMylist on Mylist {
    ...EditMylist_UpdateSlugForm
  }
`);
const EditMylist = ({
  className,
  style,
  fragment,
}: {
  className?: string;
  style?: CSSProperties;
  fragment: FragmentType<typeof EditMylistFragment>;
}) => {
  const a = useFragment(EditMylistFragment, fragment);

  return (
    <FormWrapper2
      className={clsx(className)}
      style={style}
      Icon={PlusPictogram}
      Title={<>マイリストを編集する</>}
    >
      <div className={clsx("flex h-full w-full flex-col gap-y-6")}>
        <UpdateSlugForm className={clsx("w-full")} fragment={a} />
      </div>
    </FormWrapper2>
  );
};

export default EditMylist;
