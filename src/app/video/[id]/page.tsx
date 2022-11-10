import clsx from "clsx";
import Image from "next/image";

import { getData } from "./getData";
import { Tag } from "./Tag";

export const generateStaticParams = () => {
  return [];
};

const Page = async ({ params }: { params: { id: string } }) => {
  const details = await getData(params.id);

  return (
    <main className={clsx(["container"], ["mx-auto"], ["py-8"])}>
      <div className={clsx(["flex"], ["gap-x-4"])}>
        <div>
          <Image
            className={clsx(["object-scale-down"])}
            src={details.image_primary}
            width={240}
            height={160}
            alt={details.title_primary}
          />
        </div>
        <div className={clsx(["flex-grow"], ["py-4"])}>
          <h1 className={clsx(["text-xl"])}>{details.title_primary}</h1>
        </div>
      </div>
      <div
        className={clsx(
          ["mt-4"],
          ["flex", "flex-wrap"],
          ["gap-x-2"],
          ["gap-y-2"]
        )}
      >
        {details.tags.map(({ id, name_primary, context, type }) => (
          <Tag
            key={id}
            id={id}
            name_primary={name_primary}
            context={context}
            type={type}
          />
        ))}
      </div>
      <div className={clsx(["mt-4"], ["flex", "flex-col"])}>
        <span>Niconico</span>
        {details.sources.niconico.map(({ id, link, title, upload_date }) => (
          <div key={`niconico-${id}`} className={clsx(["flex"])}>
            <div>
              <a className={clsx(["text-blue-500"], ["underline"])} href={link}>
                {id}
              </a>
            </div>
            <div className={clsx(["ml-2"])}>
              <span>{title}</span>
            </div>
            <div className={clsx(["ml-2"])}>
              <time>{new Date(upload_date).toLocaleString()}</time>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Page;
