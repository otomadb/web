import clsx from "clsx";

import { FragmentType, graphql, useFragment } from "~/gql";

const Fragment = graphql(`
  fragment TagType on Tag {
    belongTo {
      keyword
      name
    }
  }
`);
export const TagType: React.FC<{
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}> = ({ className, ...props }) => {
  const { belongTo } = useFragment(Fragment, props.fragment);
  return (
    <span
      className={clsx(
        className,
        belongTo
          ? {
              character: "text-tag-character-primary",
              class: "text-tag-class-primary",
              music: "text-tag-music-primary",
              copyright: "text-tag-copyright-primary",
              event: "text-tag-event-primary",
              phrase: "text-tag-phrase-primary",
              series: "text-tag-series-primary",
              style: "text-tag-style-primary",
              tactics: "text-tag-tactics-primary",
            }[belongTo.keyword]
          : "text-tag-subtle-primary"
      )}
    >
      {belongTo ? belongTo.name : "未分類"}
    </span>
  );
};
