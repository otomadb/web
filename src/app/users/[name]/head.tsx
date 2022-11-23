import { getData } from "./getData";

export default async function Head({ params }: { params: { name: string } }) {
  const { name, displayName } = await getData(params.name);

  return (
    <>
      <title>
        {displayName}(@{name})
      </title>
    </>
  );
}
