import clsx from "clsx";
import { useContext, useEffect } from "react";

import { RegisterContext } from "../Context";

export const NotExists: React.FC = () => {
  const { setRequestId } = useContext(RegisterContext);
  useEffect(
    () => {
      setRequestId(null);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return <p className={clsx(["text-xs"])}>リクエストされていません。</p>;
};
