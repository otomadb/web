const mkTwitterLink = ({ url, text }: { url: string; text?: string }) => {
  const burl = new URL("https://twitter.com/intent/tweet");
  burl.searchParams.set("url", url);
  if (text) burl.searchParams.set("text", text);
  burl.searchParams.set("hashtags", "OtoMADB");
  return burl.toString();
};

export default mkTwitterLink;
