import { ResultOf } from "@graphql-typed-document-node/core";

import { MadPageLinkFragment as VideoPageLinkFragment } from "~/app/(application)/mads/[serial]/Link";
import { Fragment as UserIconFragment } from "~/components/UserIcon";
import { Fragment as VideoThumbnailFragment } from "~/components/VideoThumbnail";
import { makeFragmentData } from "~/gql";

import { UserPageLinkFragment } from "../../users/[name]/Link";
import { Fragment } from "./NicovideoRegistrationRequestAcceptingNotification";

export const mock = makeFragmentData(
  {
    watched: false,
    createdAt: "2023-01-01T00:00:00.000Z",
    accepting: {
      acceptedBy: {
        id: "u1",
        ...makeFragmentData(
          { displayName: "User 1", icon: "/512x512.png" },
          UserIconFragment
        ),
        ...makeFragmentData({ name: "user1" }, UserPageLinkFragment),
      } as ResultOf<typeof Fragment>["accepting"]["acceptedBy"],
      request: {
        id: "r1",
        sourceId: "sm1",
        title: "Title 1",
      },
      video: {
        id: "v1",
        ...makeFragmentData(
          {
            serial: 1,
          },
          VideoPageLinkFragment
        ),
        ...makeFragmentData(
          {
            thumbnailUrl: "/960x540.jpg",
            title: "Title 1",
          },
          VideoThumbnailFragment
        ),
      } as ResultOf<typeof Fragment>["accepting"]["video"],
    },
  },
  Fragment
);
