import { getData } from "./getData";

export default async function Head({ params }: { params: { id: string } }) {
  const { title } = await getData(params.id);

  return (
    <>
      <title>{title}</title>
    </>
  );
}
