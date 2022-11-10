// https://www.nicovideo.jp/user/86744605
// https://www.nicovideo.jp/watch/sm41321355

export const apiUrl = (id: string) =>
  `http://api.otomad-database.net/video/${id}`;

export const getData = async (
  id: string
): Promise<{
  id: string;
  title_primary: string;
  image_primary: string;
  sources: {
    niconico: {
      id: string;
      title: string;
      link: string;
      upload_date: string;
    }[];
    youtube: {
      id: string;
    }[];
    bilibili: {
      id: string;
    }[];
  };
  creators: {
    id: string;
    name: string;
  }[];
  tags: {
    id: string;
    name_primary: string;
    context: string | null;
    type: string;
  }[];
}> => {
  // const res = await fetch(apiUrl(id), { cache: "no-store" });
  // const json = await res.json();
  // return json;

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
      {
        id: "1",
        name_primary: "ウエライド：草",
        context: null,
        type: "BACKGROUND_MUSIC",
      },
      {
        id: "2",
        name_primary: "ぼっち・ざ・ろっく！",
        context: null,
        type: "ANIME",
      },
      {
        id: "3",
        name_primary: "山田リョウ",
        context: "ぼっち・ざ・ろっく！",
        type: "CHARACTER",
      },
      {
        id: "4",
        name_primary: "伊地知虹夏",
        context: "ぼっち・ざ・ろっく！",
        type: "CHARACTER",
      },
      {
        id: "5",
        name_primary: "喜多郁代",
        context: "ぼっち・ざ・ろっく！",
        type: "CHARACTER",
      },
      {
        id: "6",
        name_primary: "後藤ひとり",
        context: "ぼっち・ざ・ろっく！",
        type: "CHARACTER",
      },
    ],
  };
};
