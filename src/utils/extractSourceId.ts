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
