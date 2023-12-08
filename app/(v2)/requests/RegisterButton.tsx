"use client";

import clsx from "clsx";

import { Current, useOpenInput } from "~/components/FormWidget";
import { PlusPictogram } from "~/components/Pictogram";
import useHasRole from "~/components/useHasRole";

export default function RegisterButton({
  className,
  style,
  sourceId,
  platform,
}: {
  className?: string;
  style?: React.CSSProperties;
  sourceId: string;
  platform: Exclude<
    Extract<Current, { type: "SOURCE_INPUT" }>["init"],
    undefined
  >["type"];
}) {
  const registarable = useHasRole();
  const a = useOpenInput();

  return (
    <button
      role="button"
      disabled={!registarable}
      onClick={() => {
        if (platform === "soundcloud") {
          a("register", { type: platform, sourceId });
        } else {
          a("register", { type: platform, sourceId });
        }
      }}
      style={style}
      className={clsx(
        className,
        "text-snow-darkest hover:text-vivid-primary disabled:text-obsidian-lighter"
      )}
    >
      <PlusPictogram className={clsx("h-full w-full")} />
    </button>
  );
}
