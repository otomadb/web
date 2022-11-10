import { getData } from "./getData";

const Page = async ({ params }: { params: { id: string } }) => {
  const details = await getData(params.id);

  return (
    <main>
      <h1>{details.name_primary}</h1>
    </main>
  );
};

export default Page;
