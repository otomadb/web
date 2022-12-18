import { CommonHead } from "~/app/CommonHead";

export default async function Head() {
  return (
    <>
      <CommonHead />
      <title>{`ニコニコ動画からの登録 - Otomad Database`}</title>
    </>
  );
}
