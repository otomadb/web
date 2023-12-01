"use client";

import clsx from "clsx";

import { useOpenRegisterFromNicovideoWithId } from "~/components/FormModal";
import Pictogram from "~/components/Pictogram";
import useHasRole from "~/components/useHasRole";
import { FragmentType, graphql, useFragment } from "~/gql";

export const RegisterButtonFragment = graphql(`
  fragment NicovideoRequestsPage_RegisterButton on NicovideoRegistrationRequest {
    sourceId
  }
`);
export default function RegisterButton({
  className,
  style,
  ...props
}: {
  className?: string;
  style?: React.CSSProperties;
  fragment: FragmentType<typeof RegisterButtonFragment>;
}) {
  const fragment = useFragment(RegisterButtonFragment, props.fragment);
  const registarable = useHasRole();
  const openRegisterForm = useOpenRegisterFromNicovideoWithId();

  return (
    <button
      role="button"
      disabled={!registarable}
      onClick={() => openRegisterForm(fragment.sourceId)}
      style={style}
      className={clsx(
        className,
        "text-snow-darkest hover:text-vivid-primary disabled:text-obsidian-lighter"
      )}
    >
      <Pictogram icon="plus" className={clsx("h-6 w-6")} />
    </button>
  );
}
