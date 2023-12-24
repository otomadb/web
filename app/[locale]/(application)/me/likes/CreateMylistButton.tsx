"use client";

import clsx from "clsx";

import Button from "~/components/Button";
import { useOpenCreateMylistForm } from "~/components/FormWidget";
import { PlusPictogram } from "~/components/Pictogram";

const CreateMylistButton = ({
  className,
  style,
}: {
  style?: React.CSSProperties;
  className?: string;
}) => {
  const open = useOpenCreateMylistForm();

  return (
    <Button
      size="small"
      color="blue"
      className={clsx(className)}
      style={style}
      onClick={() => open()}
      Pictogram={PlusPictogram}
      text={"マイリストを作成する"}
    />
  );
};

export default CreateMylistButton;
