import { ArrowPathIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

export default function Loading() {
  return (
    <div>
      <span>Loading</span>
      <div className={clsx()}>
        <ArrowPathIcon className={clsx(["w-8"], ["h-8"], ["animate-spin"])} />
      </div>
    </div>
  );
}
