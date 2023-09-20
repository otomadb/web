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
