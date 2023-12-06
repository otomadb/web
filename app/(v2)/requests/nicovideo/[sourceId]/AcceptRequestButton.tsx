"use client";

import clsx from "clsx";
import { useQuery } from "urql";

import Button from "~/components/Button";
import { useOpenRegisterFromNicovideo } from "~/components/FormModal";
import { PlusPictogram } from "~/components/Pictogram";
import { FragmentType, graphql, useFragment } from "~/gql";

const Fragment = graphql(`
  fragment NicovideoRequestPage_EditorButtonFragment on NicovideoRegistrationRequest {
    sourceId
  }
`);
const AcceptRequestButton: React.FC<{
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}> = ({ className, fragment }) => {
  const { sourceId } = useFragment(Fragment, fragment);
  const [{ data }] = useQuery({
    query: graphql(`
      query NicovideoRequestPage_EditorButton_Check {
        viewer {
          isEditor: hasRole(role: EDITOR)
        }
      }
    `),
    requestPolicy: "cache-first",
  });
  const openModal = useOpenRegisterFromNicovideo();
  if (!data?.viewer?.isEditor) return null;

  return (
    <Button
      color="blue"
      size="medium"
      Pictogram={PlusPictogram}
      text="登録する"
      className={clsx(className)}
      onClick={() => {
        openModal(sourceId);
      }}
    />
  );
};
export default AcceptRequestButton;
