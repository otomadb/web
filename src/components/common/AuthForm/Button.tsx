import clsx from "clsx";
import React from "react";

export const AuthFormButton: React.FC<{ className?: string; text: string }> = ({
  className,
  text,
}) => {
  return (
    <button
      type="submit"
      className={clsx(
        className,
        [["py-2"]],
        ["group"],
        ["transition-colors", "duration-75"],
        ["disabled:bg-slate-300", ["bg-teal-400", "hover:bg-teal-500"]],
        [
          "border",
          "disabled:border-slate-300",
          ["border-teal-300", "hover:border-teal-400"],
        ],
        ["rounded-md"]
      )}
    >
      <div
        className={clsx(
          ["font-bold"],
          ["transition-colors", "duration-75"],
          [
            "group-disabled:text-slate-200",
            ["text-teal-100", "group-hover:text-teal-200"],
          ]
        )}
      >
        {text}
      </div>
    </button>
  );
};
