"use client";

import React, { ReactNode } from "react";

import { LinkUserMylist } from "~/app/users/[name]/mylists/[id]/Link";
import { LinkYouLikes } from "~/app/you/likes/Link";
import { LinkYouMylist } from "~/app/you/mylists/[id]/Link";
import { graphql } from "~/gql";
import { MylistPageCommon_LinkSwitchFragment } from "~/gql/graphql";
import { useViewer } from "~/hooks/useViewer";

graphql(`
  fragment MylistPageCommon_LinkSwitch on Mylist {
    ...Link_YouMylist
    ...Link_UserMylist

    isLikeList
    holder {
      id
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
    return <LinkUserMylist fragment={fragment} {...props} />;

  if (fragment.isLikeList) return <LinkYouLikes {...props} />;
  else return <LinkYouMylist fragment={fragment} {...props} />;
};
