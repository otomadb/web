import React, { ReactNode } from "react";
import { useQuery } from "urql";

import { LinkUserMylist, LinkYouLikes } from "~/components/common/Link";
import { graphql } from "~/gql";
import { UserMylistsPage_LinkSwitch_ViewerDocument } from "~/gql/graphql";

graphql(`
  query UserMylistsPage_LinkSwitch_Viewer {
    whoami {
      id
      likes {
        id
      }
    }
  }
`);
export const MylistLinkSwitch: React.FC<{
  children: ReactNode;
  className?: string;

  userName: string;
  mylistId: string;
}> = ({ userName, mylistId, ...props }) => {
  const [{ data: viewer }] = useQuery({
    query: UserMylistsPage_LinkSwitch_ViewerDocument,
  });

  if (viewer?.whoami?.likes?.id === mylistId)
    return <LinkYouLikes {...props} />;
  else
    return (
      <LinkUserMylist userName={userName} mylistId={mylistId} {...props} />
    );
};
