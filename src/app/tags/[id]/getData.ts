export const apiUrl = (id: string) => `http://localhost:8080/tags/${id}`;

export const getData = async (
  id: string
): Promise<{
  id: string;
  name_primary: string;
  context: {
    id: string;
    name_primary: string;
  } | null;
  tagged_videos: {
    id: string;
    title_primary: string;
    image_primary: string;
  }[];
}> => {
  const res = await fetch(apiUrl(id), { cache: "default" });
  if (!res.ok) throw new Error(`${res.status}`);

  return res.json();
};
