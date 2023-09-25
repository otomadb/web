function mkUrl(s: string) {
  try {
    return new URL(s);
  } catch {
    return undefined;
  }
}

export const extractNicovideoSourceId = (input: string) => {
  const nicovideojp =
    /^(https?:\/\/)?(www\.)?nicovideo\.jp\/watch\/(sm\d+)$/.exec(input);
  if (nicovideojp) return nicovideojp[3];

  const nicoms = /^(https?:\/\/)?nico.ms\/(sm\d+)$/.exec(input);
  if (nicoms) return nicoms[2];

  const sm = /^(sm\d+)$/.exec(input);
  if (sm) return sm[1];

  return null;
};

const isValidYoutubeId = (input: string) => /^([A-Za-z0-9_-]{11})$/.test(input);

export const extractYoutubeSourceId = (input: string) => {
  if (isValidYoutubeId(input)) return input;

  const url = mkUrl(input);
  if (url) {
    if (url.hostname === "www.youtube.com") {
      const id = url.searchParams.get("v");
      if (id && isValidYoutubeId(id)) return id;
    } else if (url.hostname === "youtu.be") {
      const id = url.pathname.slice(1);
      if (id && isValidYoutubeId(id)) return id;
    }
  }

  return null;
};

/**
 * @see https://socialsisteryi.github.io/bilibili-API-collect/docs/misc/bvid_desc.html
 */
const isValidBilibiliBvid = (input: string) =>
  /^BV([A-Za-z0-9]{10})$/.test(input);

export const extractBilibiliSourceId = (input: string) => {
  if (isValidBilibiliBvid(input)) return input;

  const url = mkUrl(input);
  if (url) {
    if (url.hostname === "www.bilibili.com") {
      console.log(url.pathname);
      const maybe = /^\/video\/(BV[A-Za-z0-9]{10})\/?$/.exec(url.pathname);
      if (maybe && isValidBilibiliBvid(maybe[1])) return maybe[1];
    }
  }

  return null;
};
