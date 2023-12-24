export const B = "OTOMADB";
export const pgIndex = "({page}ページ目)";

export const NND = "ニコニコ動画";
export const YT = "YouTube";
export const BL = "Bilibili";
export const SC = "SoundCloud";

export const TW = "Twitter";

export default {
  page: {
    title: B,
    description: `${B}は音MADの体系的なデータベースを目指して開発されています。`,
    landing: {},
    home: {
      title: `ホーム | ${B}`,
    },
    tag: {
      title: `「{name}」がタグ付けられた音MAD ${pgIndex} | ${B}`,
    },
    mad: {
      title: `{title} | ${B}`,
    },
    mads: {
      title: `登録されている音MADの一覧 ${pgIndex} | ${B}`,
    },
    notifications: {
      title: `通知 | ${B}`,
    },
    settings: {
      title: `設定 | ${B}`,
    },
    me: {
      title: `自分のページ | ${B}`,
    },
    meLikes: {
      title: `自分がいいねした音MAD | ${B}`,
    },
    meMylist: {
      title: `自分のマイリスト「{mylist}」 | ${B}`,
    },
    meMylists: {
      title: `自分のマイリスト一覧 | ${B}`,
    },
    user: {
      title: `{name}さんのページ | ${B}`,
    },
    userLikes: {
      title: `{name}さんがいいねした音MAD | ${B}`,
    },
    userMylist: {
      title: `{name}さんのマイリスト「{title}」 ${pgIndex} | ${B}`,
    },
    userMylists: {
      title: `{name}さんのマイリスト一覧 | ${B}`,
    },
    nicovideoRequests: {
      title: `${NND}のリクエスト一覧 ${pgIndex} | ${B}`,
    },
    youtubeRequests: {
      title: `${YT}のリクエスト一覧 ${pgIndex} | ${B}`,
    },
    bilibiliRequests: {
      title: `${BL}のリクエスト一覧 ${pgIndex} | ${B}`,
    },
    soundcloudRequests: {
      title: `${SC}のリクエスト一覧 ${pgIndex} | ${B}`,
    },
  },
} as const;
