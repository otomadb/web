import clsx from "clsx";

import { LinkUser as UserPageLink } from "~/app/users/[name]/Link";
import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment UserDisplayNameLink on User {
    ...Link_User
    displayName
  }
`);
export default function UserDisplayNameLink({
  size = "small",
  className,
  style,
  ...props
}: {
  className?: string;
  style?: React.CSSProperties;
  fragment: FragmentType<typeof Fragment>;
  /**
   * @default "small"
   */
  size?: "small";
}) {
  const fragment = useFragment(Fragment, props.fragment);

  return (
    <div className={clsx(className)} style={style}>
      <UserPageLink fragment={fragment}>{fragment.displayName}</UserPageLink>
    </div>
  );
}
