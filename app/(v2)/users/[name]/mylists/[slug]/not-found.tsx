import clsx from "clsx";

export default function NotFound() {
  return (
    <main className={clsx("px-8")}>
      <h1
        className={clsx("text-4xl font-bold tracking-wider text-snow-primary")}
      >
        404
      </h1>
      <p className={clsx("mt-2 text-snow-primary")}>
        マイリストは存在しないか、プライベートの可能性があります。
      </p>
    </main>
  );
}
