// https://www.nicovideo.jp/user/86744605
// https://www.nicovideo.jp/watch/sm41321355

export const apiUrl = (id: string) => `http://localhost:8080/videos/${id}`;

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
    context_name_primary: string | null;
    type: string;
  }[];
  related_videos: {
    id: string;
    title_primary: string;
    image_primary: string;
  }[];
  parent_videos: {
    id: string;
    title_primary: string;
    image_primary: string;
  }[];
}> => {
  const res = await fetch(apiUrl(id), { cache: "default" });
  if (!res.ok) throw new Error(`${res.status}`);
  return await res.json();
};
