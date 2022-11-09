import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"

export const generateStaticParams = () => {
  return []
}

// https://www.nicovideo.jp/user/86744605
// https://www.nicovideo.jp/watch/sm41321355

export const getVideoDetails = async (
  id: string
): Promise<{
  id: string
  title_primary: string
  image_primary: string
  sources: {
    niconico: {
      id: string
      title: string
      link: string
      upload_date: string
    }[]
    youtube: { id: string }[]
    bilibili: { id: string }[]
  }
  creators: { id: string; name: string }[]
  tags: {
    id: string
    name_primary: string
  }[]
}> => {
  return {
    id: "1",
    title_primary: "これで私は所持金が底をついたので：草",
    image_primary:
      "https://nicovideo.cdn.nimg.jp/thumbnails/41321355/41321355.32327621.L",
    sources: {
      niconico: [
        {
          id: "sm41321355",
          title: "これで私は所持金が底をついたので：草",
          link: "https://www.nicovideo.jp/watch/sm41321355",
          upload_date: "2022-11-03T17:58+09:00",
        },
      ],
      youtube: [],
      bilibili: [],
    },
    creators: [
      {
        id: "1",
        name: "D-sub",
      },
    ],
    tags: [
      { id: "1", name_primary: "ウエライド：草" },
      { id: "2", name_primary: "ぼっち・ざ・ろっく！" },
      { id: "3", name_primary: "後藤ひとり" },
      { id: "4", name_primary: "伊地知虹夏" },
      { id: "5", name_primary: "山田リョウ" },
      { id: "6", name_primary: "喜多郁代" },
    ],
  }
}

const Page = async ({ params }: { params: { id: string } }) => {
  const details = await getVideoDetails(params.id)

  return (
    <main>
      <span>{details.id}</span>
      <h1>{details.title_primary}</h1>
      <Image
        src={details.image_primary}
        width={240}
        height={160}
        objectFit="scale-down"
        alt={details.title_primary}
      />
      <div className={clsx(["flex"], ["gap-x-2"])}>
        {details.tags.map(({ id, name_primary }) => (
          <div key={id}>
            <Link
              href={`/tags/${id}`}
              className={clsx(["text-blue-500"], ["underline"], ["text-sm"])}
            >
              {name_primary}
            </Link>
          </div>
        ))}
      </div>
      <div className={clsx(["flex", "flex-col"])}>
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
  )
}

export default Page
