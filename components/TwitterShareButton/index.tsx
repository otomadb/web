import clsx from "clsx";
import { ReactNode } from "react";

import { TwitterXPictogram } from "~/components/Pictogram";
import mkTwitterLink from "~/utils/mkTwitterLink";

const TwitterShareButton = ({
  className,
  payload,
  size,
  children,
}: {
  className?: string;
  payload: Parameters<typeof mkTwitterLink>[0];
  size: "small" | "medium";
  children?: ReactNode;
}) => {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={mkTwitterLink(payload)}
      className={clsx(
        className,
        "flex h-full items-center justify-center",
        "rounded border border-[#222] bg-twitter-x-primary text-sm text-white",
        { small: "px-4 gap-x-1", medium: "px-6 gap-x-2" }[size]
      )}
    >
      <TwitterXPictogram
        className={clsx({ small: "w-4 h-4", medium: "w-6 w-6" }[size])}
      />
      {children && (
        <div className={clsx({ small: "text-sm", medium: "text-base" }[size])}>
          {children}
        </div>
      )}
    </a>
  );
};
export default TwitterShareButton;
