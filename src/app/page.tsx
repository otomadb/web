import clsx from "clsx";
import Link from "next/link";
import React from "react";

const Page: React.FC = ({}) => {
  return (
    <main className={clsx()}>
      <p>Test</p>
      <Link href={"/video/1"}>これで私は所持金が底をついたので：草</Link>
    </main>
  );
};

export default Page;
