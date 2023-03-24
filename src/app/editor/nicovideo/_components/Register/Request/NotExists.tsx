import clsx from "clsx";
import { useContext, useEffect } from "react";

import { RegisterContext } from "../Context";

export const NotExists: React.FC = () => {
  const { setNicovideoRequestId } = useContext(RegisterContext);
  useEffect(() => {
    setNicovideoRequestId(null);
  }, [setNicovideoRequestId]);

  return <p className={clsx(["text-xs"])}>リクエストされていません。</p>;
};
