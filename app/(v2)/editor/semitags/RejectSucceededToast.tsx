import clsx from "clsx";

import CommonSemitag from "~/components/CommonSemitag";
import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment CheckSemitagsPage_RejectSucceededToast on RejectSemitagSucceededPayload {
    rejecting {
      semitag {
        id
        checked
        ...CommonSemitag
      }
    }
  }
`);
const RejectSucceededToast: React.FC<{
  fragment: FragmentType<typeof Fragment>;
}> = ({ ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);
  return (
    <p className={clsx(["text-sm"])}>
      <CommonSemitag
        fragment={fragment.rejecting.semitag}
        className={clsx(["px-1", "py-0.5"], ["mx-0.5"])}
      />
      は棄却されました。
    </p>
  );
};

export default RejectSucceededToast;
