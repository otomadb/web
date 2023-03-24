"use client";
import clsx from "clsx";
import React, { ComponentProps } from "react";
import { toast } from "react-hot-toast";

import { LinkVideo } from "~/app/videos/[serial]/Link";
import { FragmentType, graphql, useFragment } from "~/gql";

const Fragment = graphql(`
  fragment RegisterNicovideoPage_RegisterForm_SuccessedToast on Video {
    id
    title
    ...Link_Video
  }
`);
const SucceededToast: React.FC<{
  fragment: FragmentType<typeof Fragment>;
}> = ({ ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);

  return (
    <div>
      <LinkVideo
        fragment={fragment}
        className={clsx(["font-bold"], ["text-blue-400"])}
      >
        {fragment.title}
      </LinkVideo>
      <span className={clsx(["text-slate-700"])}>を登録しました．</span>
    </div>
  );
};

export const useCallSuccessededToast =
  () => (props: Pick<ComponentProps<typeof SucceededToast>, "fragment">) =>
    toast(() => <SucceededToast {...props} />);
