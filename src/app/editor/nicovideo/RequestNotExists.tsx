import clsx from "clsx";
import { useEffect } from "react";

import { useSetRequestId } from "./RequestContext";

export const NotExists: React.FC = () => {
  const setRequestId = useSetRequestId();

  useEffect(
    () => {
      setRequestId(null);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return <p className={clsx(["text-xs"])}>リクエストされていません。</p>;
};
