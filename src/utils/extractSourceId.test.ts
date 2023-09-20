import { describe, expect, it } from "vitest";

import { extractNicovideoSourceId } from "./extractSourceId";

describe("From Nicovideo", () => {
  it.each([
    ["sm2057168", "sm2057168"],
    ["https://www.nicovideo.jp/watch/sm2057168", "sm2057168"],
    ["https://nico.ms/sm2057168", "sm2057168"],
  ])("%s => %s", (input, expected) => {
    expect(extractNicovideoSourceId(input)).toBe(expected);
  });
});
