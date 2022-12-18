import ky from "ky";
import { useMemo } from "react";
import useSWR from "swr";

export const useNicovideoAPI = (
  videoId: string | undefined,
  {
    onSuccess,
    onError,
  }: {
    onSuccess(data: {
      id: string;
      title: string;
      tags: { value: string }[];
      thumbnail_url: { original: string; large: string };
    }): void;
    onError(): void;
  }
) => {
  const url = useMemo(() => {
    if (!videoId || !/(sm)\d+/.test(videoId)) return undefined;
    const url = new URL(`/${videoId}`, "https://nicovideo-gti-proxy.deno.dev/");
    return url.toString();
  }, [videoId]);

  return useSWR(
    url,
    (u) =>
      ky.get(u).json<{
        id: string;
        title: string;
        tags: { value: string }[];
        watch_url: string;
        uploaded_at: string;
        thumbnail_url: { original: string; large: string };
      }>(),
    {
      dedupingInterval: 0,
      errorRetryCount: 1,
      onSuccess(d) {
        onSuccess(d);
      },
      onError() {
        onError();
      },
    }
  );
};
