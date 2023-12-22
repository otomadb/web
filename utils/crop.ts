export const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();

    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));

    image.src = src;
  });

export default async function cropImage(
  src: string,
  {
    width,
    height,
    x,
    y,
  }: {
    x: number;
    y: number;
    width: number;
    height: number;
  }
) {
  const img = await loadImage(src);

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) return null;

  canvas.width = width;
  canvas.height = height;

  ctx.drawImage(img, x, y, width, height, 0, 0, width, height);

  const a = await new Promise((r: BlobCallback) => canvas.toBlob(r));
  if (!a) return null;

  return new File([a], "image.png", { type: "image/png" });
}
