import clsx from "clsx";

export const SemitagButton: React.FC<{
  className?: string;
  name: string;
  selected: boolean;
  append(): void;
  remove(): void;
}> = ({ className, name, append, remove, selected }) => {
  return (
    <div
      role="button"
      className={clsx(className, [
        "select-none rounded-sm border border-slate-700 bg-slate-900 px-0.5 py-0.25 text-xs text-slate-300 aria-disabled:border-slate-800 aria-disabled:bg-slate-950 group-aria-disabled:text-slate-600",
      ])}
      onClick={() => {
        if (selected) remove();
        else append();
      }}
      aria-disabled={!selected}
    >
      {name}
    </div>
  );
};
