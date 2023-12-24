import clsx from "clsx";

export default function NotFound() {
  return (
    <main
      className={clsx(
        "grow border border-obsidian-primary bg-obsidian-darker p-4 @container/page"
      )}
    >
      <h1
        className={clsx("text-2xl font-bold tracking-wider text-snow-primary")}
      >
        マイリストは存在しません。
      </h1>
    </main>
  );
}
