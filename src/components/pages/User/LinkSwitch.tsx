"use client";

import React, { ReactNode } from "react";

import {
  LinkUserMylist,
  LinkYouLikes,
  LinkYouMylist,
} from "~/components/common/Link";
import { graphql } from "~/gql";
import { MylistPageCommon_LinkSwitchFragment } from "~/gql/graphql";
import { useViewer } from "~/hooks/useViewer";

graphql(`
  fragment MylistPageCommon_LinkSwitch on Mylist {
    id
    isLikeList
    holder {
      id
      name
    }
  }
`);
export const MylistLinkSwitch: React.FC<{
  children: ReactNode;
  className?: string;
  fragment: MylistPageCommon_LinkSwitchFragment;
}> = ({ fragment, ...props }) => {
  const [{ data: viewer }] = useViewer();

  if (viewer?.whoami?.id !== fragment.holder.id)
    return (
      <LinkUserMylist
        mylistId={fragment.id}
        userName={fragment.holder.name}
        {...props}
      />
    );

  if (fragment.isLikeList) return <LinkYouLikes {...props} />;
  else return <LinkYouMylist mylistId={fragment.id} {...props} />;
};
