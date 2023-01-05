import { CommonHead } from "~/app/CommonHead";

export default async function Head() {
  return (
    <>
      <CommonHead />
      <title>{`あなたのマイリスト - Otomad Database`}</title>
    </>
  );
}
