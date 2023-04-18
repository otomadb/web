import clsx from "clsx";

import { FragmentType, graphql, useFragment } from "~/gql";

import { AllNicovideoRequestsPageLink } from "./Link";

export const Fragment = graphql(`
  fragment AllNicovideoRequestsPage_Pagination on NicovideoRegistrationRequestConnection {
    pageInfo {
      hasNextPage
      endCursor
    }
  }
`);
export default function Pagination({
  className,
  ...props
}: {
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}) {
  const {
    pageInfo: { hasNextPage, endCursor },
  } = useFragment(Fragment, props.fragment);

  return (
    <div className={clsx(className, ["flex", "justify-center", "gap-y-1"])}>
      {hasNextPage && endCursor && (
        <AllNicovideoRequestsPageLink
          params={{ after: endCursor }}
          className={clsx(
            ["rounded"],
            ["px-2", "py-1"],
            ["bg-blue-400"],
            ["text-blue-100"]
          )}
        >
          次へ
        </AllNicovideoRequestsPageLink>
      )}
    </div>
  );
}
