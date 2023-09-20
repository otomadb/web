import clsx from "clsx";

import { RedButton } from "../Button";

export default function SourceNotExists({
  className,
  handleCancel,
}: {
  className?: string;
  handleCancel(): void;
}) {
  return (
    <div className={clsx(className, ["flex", "flex-col", "gap-y-2"])}>
      <div className={clsx(["text-slate-400"])}>動画は存在しません</div>
      <div>
        <RedButton
          type="button"
          className={clsx(["ml-auto"], ["px-4"], ["py-1"])}
          onClick={(e) => {
            e.preventDefault();
            handleCancel();
          }}
        >
          戻る
        </RedButton>
      </div>
    </div>
  );
}
