import clsx from "clsx";

import { LoadingIcon, SearchIcon } from "~/components/Icons";
import { TextInput2 } from "~/components/TextInput";

export default function SearchBox({
  className,
  style,
  size,
  fetching,
  query,
  setQuery,
  disabled,
}: {
  className?: string;
  size: "small" | "medium" | "large";
  style?: React.CSSProperties;
  limit?: number;
  fetching: boolean;
  disabled?: boolean;
  query: string;
  setQuery(query: string): void;
}) {
  return (
    <TextInput2
      size={size}
      className={clsx(className)}
      style={style}
      value={query}
      disabled={disabled}
      onChange={(v) => setQuery(v)}
      LeftDecoration={({ disabled }) => (
        <div
          aria-disabled={disabled}
          className={clsx(
            {
              small: ["w-3", "h-3"],
              medium: ["w-4", "h-4"],
              large: ["w-6", "h-6"],
            }[size],
            ["text-slate-400", disabled && ["text-slate-500"]]
          )}
        >
          {!fetching && <SearchIcon className={clsx(["w-full", "h-full"])} />}
          {fetching && (
            <LoadingIcon
              className={clsx(["w-full", "h-full"], ["animate-spin"])}
            />
          )}
        </div>
      )}
    />
  );
}
