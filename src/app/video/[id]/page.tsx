export const generateStaticParams = () => {
  return []
}

// https://www.nicovideo.jp/user/86744605
// https://www.nicovideo.jp/watch/sm41321355

export const getVideoDetails = async (
  id: string
): Promise<{
  title_primary: string
  sources: {
    niconico: { id: string }[]
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
    title_primary: "これで私は所持金が底をついたので：草",
    sources: {
      niconico: [{ id: "sm41321355" }],
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
    ],
  }
}

const Page = async ({ params }: { params: { id: string } }) => {
  const details = await getVideoDetails(params.id)

  return (
    <main>
      <p>hello</p>
      <span>{params.id}</span>
      <div>
        {details.tags.map(({ id, name_primary }) => (
          <div key={id}>
            <span>{name_primary}</span>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Page
