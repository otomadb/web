"use client";

import React, { ReactNode } from "react";

import { LinkUserMylist } from "~/app/users/[name]/mylists/[id]/Link";
import { LinkYouLikes } from "~/app/you/likes/Link";
import { LinkYouMylist } from "~/app/you/mylists/[id]/Link";
import { getFragment, graphql } from "~/gql";
import {
  Link_UserMylistFragmentDoc,
  Link_YouMylistFragmentDoc,
  MylistPageCommon_LinkSwitchFragment,
} from "~/gql/graphql";
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
    return (
      <LinkUserMylist
        fragment={getFragment(Link_UserMylistFragmentDoc, fragment)}
        {...props}
      />
    );

  if (fragment.isLikeList) return <LinkYouLikes {...props} />;
  else
    return (
      <LinkYouMylist
        fragment={getFragment(Link_YouMylistFragmentDoc, fragment)}
        {...props}
      />
    );
};
