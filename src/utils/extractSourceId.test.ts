import { describe, expect, it } from "vitest";

import {
  extractNicovideoSourceId,
  extractYoutubeSourceId,
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
