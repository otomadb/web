// https://www.nicovideo.jp/user/86744605
// https://www.nicovideo.jp/watch/sm41321355

export const getTagDetails = async (
  id: string
): Promise<{
  id: string;
  name_primary: string;
}> => {
  return {
    id: "2",
    name_primary: "ぼっち・ざ・ろっく！",
  };
};

const Page = async ({ params }: { params: { id: string } }) => {
  const details = await getTagDetails(params.id);

  return (
    <main>
      <h1>{details.name_primary}</h1>
    </main>
  );
};

export default Page;
