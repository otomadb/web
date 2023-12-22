"use client";

import clsx from "clsx";

import { useOpenEditMylistRegistrationForm } from "~/components/FormWidget";
import { PlusPictogram } from "~/components/Pictogram";

const EditMylistRegistrationButton = ({
  className,
  fragment,
}: {
  className?: string;
  fragment: Parameters<
    ReturnType<typeof useOpenEditMylistRegistrationForm>
  >[0]["fragment"];
}) => {
  const open = useOpenEditMylistRegistrationForm();

  return (
    <button
      type="button"
      onClick={() => {
        open({ fragment });
      }}
      className={clsx(
        className,
        "group/button flex items-center justify-center gap-x-2 border px-4 py-2 transition-colors duration-100",
        "disabled:border-obsidian-lightest disabled:bg-obsidian-lighter",
        "border-obsidian-lighter bg-obsidian-primary hover:bg-obsidian-darker"
      )}
    >
      <PlusPictogram
        className={clsx(
          "h-6 w-6",
          "transition-colors duration-75",
          "group-disabled:text-obsidian-lightest",
          "text-snow-darker group-hover:text-snow-primary"
        )}
      />
      <div
        className={clsx(
          "ml-1 text-sm font-bold",
          "transition-colors duration-75",
          "group-disabled:text-obsidian-lightest",
          "text-snow-darker group-hover:text-snow-primary"
        )}
      >
        マイリストに追加
      </div>
    </button>
  );
};
export default EditMylistRegistrationButton;
