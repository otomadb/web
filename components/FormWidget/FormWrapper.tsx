"use client";

import clsx from "clsx";
import { ReactNode } from "react";

import { PictogramType, XMarkPictogram } from "../Pictogram";
import { useCloseFormWidget } from ".";

export const FormWrapper = ({
  className,
  style,
  Icon,
  Title,
  Form,
}: {
  className?: string;
  style?: React.CSSProperties;
  Icon: PictogramType;
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
        <div className={clsx("flex grow items-center gap-x-2")}>
          <Icon className={clsx("h-4 w-4 text-snow-darker")} />
          <div className={clsx("text-sm font-bold text-snow-primary")}>
            {Title}
          </div>
        </div>
        <div className={clsx("flex shrink-0 items-center gap-x-2")}>
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

export const FormWrapper2 = ({
  className,
  style,
  Icon,
  Title,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  Icon: PictogramType;
  Title: ReactNode;
  children: ReactNode;
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
        <div className={clsx("flex grow items-center gap-x-2")}>
          <Icon className={clsx("h-4 w-4 text-snow-darker")} />
          <div className={clsx("text-sm font-bold text-snow-primary")}>
            {Title}
          </div>
        </div>
        <div className={clsx("flex shrink-0 items-center gap-x-2")}>
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
        {children}
      </div>
    </div>
  );
};
