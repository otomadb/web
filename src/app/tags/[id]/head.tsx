import { getData } from "./getData";

export default async function Head({ params }: { params: { id: string } }) {
  const { name } = await getData(params.id);

  return (
    <>
      <title>{name}</title>
    </>
  );
}
