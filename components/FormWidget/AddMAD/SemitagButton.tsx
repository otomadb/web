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
      className={clsx(
        className,
        "select-none rounded-sm border border-obsidian-primary bg-obsidian-darker px-0.5 py-0.25 text-xs text-snow-darker",
        "aria-disabled:border-obsidian-darker aria-disabled:bg-obsidian-primary group-aria-disabled:text-snow-darkest"
      )}
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
