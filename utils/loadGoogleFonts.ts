/**
 * @see https://zenn.dev/temasaguru/articles/2968736b5a2f41#フォントファイルの読み込みについて
 * @see https://github.com/vercel/next.js/blob/canary/packages/font/src/google/find-font-files-in-css.ts
 */
export async function loadGoogleFont({
  family,
  weight,
  text,
}: {
  family: string;
  weight?: number;
  text?: string;
}) {
  const url = new URL("https://fonts.googleapis.com/css2");
  url.searchParams.set("family", `${family}${weight ? `:wght@${weight}` : ""}`);

  if (text) url.searchParams.append("text", text);
  else url.searchParams.append("subset", "latin");

  const css = await fetch(url).then((res) => res.text());

  const fontUrl = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/
  )?.[1];

  if (!fontUrl)
    throw new Error("Font file not found in CSS fetched from Google Fonts");

  return fetch(fontUrl).then((res) => res.arrayBuffer());
}
