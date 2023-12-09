export const mkBilibiliAutoplayDisabled = (baseUrl: string) => {
  const url = new URL(baseUrl);
  url.searchParams.set("autoplay", "0");
  return url.toString();
};
