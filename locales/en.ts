import I18nPartial from "./I18nPartial";
import ja, { B } from "./ja";

export const NND = "Niconico";
export const YT = "YouTube";
export const BL = "Bilibili";
export const SC = "SoundCloud";

const pgIndex = "({page} page)";

export default {
  音MAD: "otomad",
  タグ: "tag",
  page: {
    title: B,
    description: `${B} is developed to be a systematic database of otomads.`,
    landing: {
      音MADのデータベースを作る: `Build a database of otomads.`,
      参加してみる: `Join`,
    },
    home: {
      title: `Home | ${B}`,
    },
    tag: {
      title: `Otomads tagged "{name}" ${pgIndex} | ${B}`,
    },
    mad: {
      title: `{title} | ${B}`,
    },
    mads: {
      title: `All otomads ${pgIndex} | ${B}`,
    },
    notifications: {
      title: `Notifications | ${B}`,
    },
    settings: {
      title: `Settings | ${B}`,
    },
    me: {
      title: `My page | ${B}`,
    },
    meLikes: {
      title: `Otomads I liked | ${B}`,
    },
    meMylist: {
      title: `My playlist "{mylist}" | ${B}`,
    },
    meMylists: {
      title: `My playlists | ${B}`,
    },
    user: {
      title: `{name} | ${B}`,
    },
    userLikes: {
      title: `{name}'s Liked otomads | ${B}`,
    },
    userMylist: {
      title: `{name}'s playlist "{title}" ${pgIndex} | ${B}`,
    },
    userMylists: {
      title: `{name}'s playlists | ${B}`,
    },
    nicovideoRequests: {
      title: `Requests on ${NND} ${pgIndex} | ${B}`,
    },
    youtubeRequests: {
      title: `Requests on ${YT} ${pgIndex} | ${B}`,
    },
    bilibiliRequests: {
      title: `Requests on ${BL} ${pgIndex} | ${B}`,
    },
    soundcloudRequests: {
      title: `Requests on ${SC} ${pgIndex} | ${B}`,
    },
  },
} satisfies I18nPartial<typeof ja>;
