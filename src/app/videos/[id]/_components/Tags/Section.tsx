import "server-only";

import clsx from "clsx";

import { SectionInner } from "./SectionInner";

export async function TagsSection({
  className,
  videoId,
}: {
  className?: string;
  videoId: string;
}) {
  return (
    <section className={clsx(className)}>
      <h2 className={clsx(["text-xl"], ["text-slate-900"])}>タグ</h2>
      <SectionInner className={clsx(["mt-2"])} videoId={videoId} />
    </section>
  );
}
