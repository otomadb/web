import Image from "next/image";

import { getData } from "./getData";

const Page = async ({ params }: { params: { name: string } }) => {
  const details = await getData(params.name);
  const { icon, name, displayName } = details;

  return (
    <>
      <div>
        <Image src={icon} width={128} height={128} alt={"icon"} />
        <p>@{name}</p>
        <p>{displayName}</p>
      </div>
    </>
  );
};

export default Page;
