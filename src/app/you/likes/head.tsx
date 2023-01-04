import { CommonHead } from "~/app/CommonHead";

export default async function Head() {
  return (
    <>
      <CommonHead />
      <title>{`あなたがいいねした動画 - Otomad Database`}</title>
    </>
  );
}
