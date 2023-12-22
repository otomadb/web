import { TagPageLink } from "~/app/[locale]/(application)/tags/[serial]/Link";
import { FragmentType, graphql, useFragment } from "~/gql";

import CommonTag from "../CommonTag";

export const CommonTagLinkFragment = graphql(`
  fragment CommonTagLink on Tag {
    ...CommonTag
    ...Link_Tag
  }
`);
export default function CommonTagLink({
  className,
  disabled,
  size,
  ...props
}: { fragment: FragmentType<typeof CommonTagLinkFragment> } & Omit<
  Parameters<typeof CommonTag>[0],
  "fragment" | "hoverable"
>) {
  const fragment = useFragment(CommonTagLinkFragment, props.fragment);

  return (
    <TagPageLink className={className} fragment={fragment}>
      <CommonTag
        size={size}
        fragment={fragment}
        hoverable
        disabled={disabled}
      />
    </TagPageLink>
  );
}
