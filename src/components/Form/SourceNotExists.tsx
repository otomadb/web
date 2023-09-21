import clsx from "clsx";

import Button from "~/components/Button";

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
        <Button
          className={clsx(["ml-auto"])}
          onClick={() => {
            handleCancel();
          }}
          text="戻る"
          size="medium"
          color="green"
        />
      </div>
    </div>
  );
}
