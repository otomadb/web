"use client";

import { useCallback, useEffect, useRef } from "react";

export const useLoop = (func: () => void) => {
  const reqIdRef = useRef<number>();

  const loop = useCallback(() => {
    func();
    reqIdRef.current = requestAnimationFrame(loop);
  }, [func]);

  useEffect(() => {
    loop();
    return () => {
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
    };
  }, [loop]);
};
