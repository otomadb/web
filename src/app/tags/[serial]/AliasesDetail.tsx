import clsx from "clsx";

import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment TagPageLayout_AliasesDetail on Tag {
    names(primary: false) {
      id
      name
      primary
    }
  }
`);
export const AliasesDetail: React.FC<{
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}> = ({ className, ...props }) => {
  const { names } = useFragment(Fragment, props.fragment);
  if (names.length === 0) return null;

  return (
    <div className={clsx(className, "flex items-center gap-x-2")}>
      <h2 className={clsx("text-sm text-slate-600")}>別の表記</h2>
      <div className={clsx("flex gap-x-2")}>
        {names.map(({ id, name }) => (
          <span key={id} className={clsx("text-base  text-slate-700")}>
            {name}
          </span>
        ))}
      </div>
    </div>
  );
};
