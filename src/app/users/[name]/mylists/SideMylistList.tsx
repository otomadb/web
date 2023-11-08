import clsx from "clsx";
import React from "react";

import { MylistLinkSwitch } from "~/components/MylistLinkSwitch";
import { MylistTitle } from "~/components/MylistTitle";
import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment UserMylistsPageLayout_SideMylistList on MylistConnection {
    nodes {
      ...MylistTitle
      ...MylistLinkSwitch
      id
    }
  }
`);
export const SideMylistList: React.FC<{
  className?: string;
  fetcher: FragmentType<typeof Fragment>;
}> = ({ className, ...props }) => {
  const fragment = useFragment(Fragment, props.fetcher);

  return (
    <div
      className={clsx(className, [
        "flex h-full flex-col items-stretch overflow-y-scroll",
      ])}
    >
      {fragment.nodes.map((mylist) => (
        <MylistLinkSwitch key={mylist.id} fragment={mylist}>
          <MylistTitle fragment={mylist} />
        </MylistLinkSwitch>
      ))}
    </div>
  );
};
