"use client";

import clsx from "clsx";
import { ReactNode } from "react";

import { XMarkPictogram } from "../Pictogram";
import { useCloseFormWidget } from ".";

export const FormWrapper = ({
  className,
  style,
  Title,
  Form,
}: {
  className?: string;
  style?: React.CSSProperties;
  Title: ReactNode;
  Form: React.FC<{ className?: string }>;
}) => {
  const close = useCloseFormWidget();

  return (
    <div
      style={style}
      className={clsx(
        className,
        "flex flex-col rounded border border-obsidian-primary"
      )}
    >
      <div
        className={clsx(
          "flex shrink-0 items-center bg-obsidian-darker px-4 py-2"
        )}
      >
        <div className={clsx("grow text-sm font-bold text-snow-primary")}>
          {Title}
        </div>
        <div className={clsx("flex shrink-0 items-center")}>
          <button
            type="button"
            className={clsx(
              "h-6 w-6 rounded-full p-0.5 hover:bg-obsidian-primary"
            )}
            onClick={(e) => {
              e.preventDefault();
              close();
            }}
          >
            <XMarkPictogram
              className={clsx("h-full w-full text-snow-darkest")}
            />
          </button>
        </div>
      </div>
      <div
        className={clsx(
          "grow border-t border-t-obsidian-primary bg-obsidian-darkest p-4"
        )}
      >
        <Form className={clsx("h-full")} />
      </div>
    </div>
  );
};
