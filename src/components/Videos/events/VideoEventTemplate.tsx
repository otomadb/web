import clsx from "clsx";
import { ReactNode } from "react";

import { DateTime } from "~/components/common/DateTime";
import { LinkUser } from "~/components/common/Link";
import { UserIcon2 } from "~/components/common/UserIcon";
import { getFragment, graphql } from "~/gql";
import {
  Component_UserIconFragmentDoc,
  VideoPage_VideoEventTemplateFragment,
} from "~/gql/graphql";

graphql(`
  fragment VideoPage_VideoEventTemplate on VideoEvent {
    id
    createdAt
    user {
      ...Component_UserIcon
      id
      name
      displayName
    }
  }
`);
export const VideoEventTemplate: React.FC<{
  className?: string;
  fragment: VideoPage_VideoEventTemplateFragment;

  children?: ReactNode;

  description: string;
  Icon: React.FC<{ className?: string | undefined }>;
}> = ({ className, fragment, children, description, Icon }) => {
  return (
    <div
      className={clsx(
        className,
        ["border", "border-gray-200"],
        ["rounded"],
        [["px-4"], ["py-1"]],
        ["bg-slate-50"]
      )}
    >
      <div className={clsx(["flex"], ["items-center"])}>
        <div className={clsx(["flex"])}>
          <Icon className={clsx(["w-4"], ["h-4"])} />
          <div
            className={clsx(
              ["ml-1"],
              ["whitespace-nowrap"],
              ["text-xs"],
              ["text-slate-700"]
            )}
          >
            {description}
          </div>
        </div>
        <div className={clsx(["ml-2"])}>{children}</div>
      </div>
      <div
        className={clsx(
          ["mt-1"],
          ["flex-skrink-0"],
          ["flex", ["items-center"]]
        )}
      >
        <LinkUser
          name={fragment.user.name}
          className={clsx(["flex", ["items-center"]])}
        >
          <UserIcon2
            fragment={getFragment(Component_UserIconFragmentDoc, fragment.user)}
            size={32}
          />
          <span className={clsx(["ml-1"], ["text-xs"], ["text-slate-700"])}>
            {fragment.user.displayName}
          </span>
        </LinkUser>
        <DateTime
          className={clsx(
            ["flex-grow"],
            ["ml-2"],
            ["text-right"],
            ["text-xs"],
            ["text-slate-500"],
            ["select-none"]
          )}
          date={fragment.createdAt}
        />
      </div>
    </div>
  );
};
