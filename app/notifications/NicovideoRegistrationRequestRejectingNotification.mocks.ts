import { ResultOf } from "@graphql-typed-document-node/core";

import { makeFragmentData } from "~/gql";
import { Fragment as UserIconFragment } from "~~/components/UserIcon";

import { Fragment as UserPageLinkFragment } from "../users/[name]/Link";
import { Fragment as RejectingFragment } from "./NicovideoRegistrationRequestRejectingNotification";

export const mock = makeFragmentData(
  {
    watched: false,
    createdAt: "2023-01-01T00:00:00.000Z",
    rejecting: {
      rejectedBy: {
        id: "u1",
        ...makeFragmentData(
          {
            displayName: "User 1",
            icon: "/512x512.png",
          },
          UserIconFragment
        ),
        ...makeFragmentData({ name: "user1" }, UserPageLinkFragment),
      } as ResultOf<typeof RejectingFragment>["rejecting"]["rejectedBy"],
      request: {
        id: "r1",
        sourceId: "sm1",
        title: "Title 1",
      },
    },
  },
  RejectingFragment
);
