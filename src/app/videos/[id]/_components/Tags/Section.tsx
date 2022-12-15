import clsx from "clsx";
import React from "react";

import { SectionInner } from "./SectionInner";

export const TagsSection: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <section className={clsx(className)}>
      <h2 className={clsx(["text-xl"], ["text-slate-900"])}>タグ</h2>
      <SectionInner className={clsx(["mt-2"])} />
    </section>
  );
};
