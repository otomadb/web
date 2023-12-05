import clsx from "clsx";

import Pictogram from "~/components/Pictogram";

export const Presentation: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  current?: undefined | boolean;
  like(): void;
  unlike(): void;
}> = ({ className, style, current, like, unlike }) => {
  return (
    <button
      role="checkbox"
      onClick={() => {
        if (current === undefined) return;
        current ? like() : unlike();
      }}
      aria-checked={
        current === undefined ? "mixed" : current ? "true" : "false"
      }
      disabled={current === undefined}
      style={style}
      className={clsx(
        className,
        "group flex items-center rounded-md border border-slate-400 bg-slate-200 px-2 py-1 transition-colors duration-100 aria-checked:border-pink-400 aria-checked:bg-pink-100 hover:bg-slate-300 aria-checked:hover:bg-pink-200 disabled:border-slate-300 disabled:bg-slate-200"
      )}
    >
      <div>
        <Pictogram
          icon="like"
          className={clsx(
            "h-4 w-4 text-slate-400 transition-colors duration-75 group-hover:text-slate-500 group-disabled:text-slate-300 group-aria-checked:text-pink-600 group-aria-checked:group-hover:text-pink-500"
          )}
        />
      </div>
      <div
        className={clsx(
          "ml-1 text-sm text-slate-400 transition-colors duration-75 group-hover:text-slate-500 group-disabled:text-slate-300 group-aria-checked:text-pink-600 group-aria-checked:group-hover:text-pink-500"
        )}
      >
        Like
      </div>
    </button>
  );
};
