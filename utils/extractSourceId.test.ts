import { describe, expect, it } from "vitest";

import {
  extractBilibiliSourceId,
  extractNicovideoSourceId,
  extractYoutubeSourceId,
  normalizeSoundcloud,
} from "./extractSourceId";

describe("From Nicovideo", () => {
  it.each([
    ["sm2057168", "sm2057168"],
    ["https://www.nicovideo.jp/watch/sm2057168", "sm2057168"],
    ["https://nico.ms/sm2057168", "sm2057168"],
  ])("%s => %s", (input, expected) => {
    expect(extractNicovideoSourceId(input)).toBe(expected);
  });
});

describe("From Youtube", () => {
  it.each([
    ["Q16KpquGsIc", "Q16KpquGsIc"],
    ["https://www.youtube.com/watch?v=Q16KpquGsIc", "Q16KpquGsIc"],
    ["http://youtu.be/Q16KpquGsIc", "Q16KpquGsIc"],
  ])("%s => %s", (input, expected) => {
    expect(extractYoutubeSourceId(input)).toBe(expected);
  });
});

describe("From Bilibili", () => {
  it.each([
    ["BV1xx411c7mu", "BV1xx411c7mu"],
    ["https://www.bilibili.com/video/BV1xx411c7mu", "BV1xx411c7mu"],
    ["https://www.bilibili.com/video/BV1xx411c7mu/", "BV1xx411c7mu"],
    [
      "https://www.bilibili.com/video/BV1xx411c7mu/?spm_id_from=autoNext",
      "BV1xx411c7mu",
    ],
  ])("%s => %s", (input, expected) => {
    expect(extractBilibiliSourceId(input)).toBe(expected);
  });
});

describe("normalizeSoundcloud", () => {
  it.each([
    [
      "keigoooo/hyperflip-donaldcore",
      "https://soundcloud.com/keigoooo/hyperflip-donaldcore",
    ],
    [
      "https://soundcloud.com/keigoooo/hyperflip-donaldcore",
      "https://soundcloud.com/keigoooo/hyperflip-donaldcore",
    ],
    [
      "https://soundcloud.com/keigoooo/hyperflip-donaldcore?in=sno2wman/sets/mad",
      "https://soundcloud.com/keigoooo/hyperflip-donaldcore",
    ],
  ])("%s => %s", (input, expected) => {
    expect(normalizeSoundcloud(input)).toBe(expected);
  });
});
