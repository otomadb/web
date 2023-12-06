import clsx from "clsx";

export default function DateTime({
  className,
  date,
}: {
  className?: string;
  date: string;
}) {
  return (
    <time className={clsx(className)} dateTime={date}>
      {Intl.DateTimeFormat("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(new Date(date))}
    </time>
  );
}
