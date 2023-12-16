import clsx from "clsx";

import CommonSemitag from "~/components/CommonSemitag";
import CommonTag from "~/components/CommonTag";
import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment CheckSemitagsPage_ResolveSucceededToast on ResolveSemitagSucceededPayload {
    resolving {
      semitag {
        id
        checked
        ...CommonSemitag
      }
      resolveTo {
        tag {
          ...CommonTag
          id
        }
      }
    }
  }
`);
const SucceededResolveToast: React.FC<{
  fragment: FragmentType<typeof Fragment>;
}> = ({ ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);
  return (
    <p className={clsx(["text-sm"])}>
      <CommonSemitag
        fragment={fragment.resolving.semitag}
        className={clsx(["px-1", "py-0.5"], ["mx-0.5"])}
      />
      は
      <CommonTag
        size="small"
        fragment={fragment.resolving.resolveTo.tag}
        className={clsx(["mx-0.5"])}
      />
      に解決されました。
    </p>
  );
};

export default SucceededResolveToast;
