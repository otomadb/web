"use client";

import clsx from "clsx";

import Button from "~/components/Button";
import { Current, useOpenInput } from "~/components/FormWidget";
import { PlusPictogram } from "~/components/Pictogram";
import useHasRole from "~/components/useHasRole";
import { FragmentType, graphql, useFragment } from "~/gql";

const Fragment = graphql(`
  fragment RequestPageCommon_AcceptRequestButton on RegistrationRequest {
    sourceId
  }
`);
const AcceptRequestButton: React.FC<{
  className?: string;
  fragment: FragmentType<typeof Fragment>;
  platform: Exclude<
    Extract<Current, { type: "SOURCE_INPUT" }>["init"],
    undefined
  >["type"];
}> = ({ className, fragment, platform }) => {
  const { sourceId } = useFragment(Fragment, fragment);
  const registrable = useHasRole();
  const open = useOpenInput();

  return (
    <Button
      disabled={!registrable}
      color="blue"
      size="medium"
      Pictogram={PlusPictogram}
      text="登録する"
      className={clsx(className)}
      onClick={() => {
        switch (platform) {
          case "soundcloud":
            open("register", { type: platform, sourceId });
            break;
          default:
            open("register", { type: platform, sourceId });
            break;
        }
      }}
    />
  );
};
export default AcceptRequestButton;
