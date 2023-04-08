import { ResultOf } from "@graphql-typed-document-node/core";

import { Fragment as LinkUserFragment } from "~/app/users/[name]/Link";
import { Fragment as UserIconFragment } from "~/components/common/UserIcon";
import { makeFragmentData } from "~/gql";

import { Fragment } from "./RequestExists";

export const mockRequestExists = makeFragmentData(
  {
    sourceId: "sm2057168",
    checked: false,
    thumbnailUrl: "/960x540.jpg",
    requestedBy: {
      id: "u1",
      name: "User 1",
      ...makeFragmentData(
        {
          name: "user1",
          displayName: "User 1",
          icon: "/512x512.png",
        },
        UserIconFragment
      ),
      ...makeFragmentData(
        {
          name: "user1",
          displayName: "User 1",
          icon: "/512x512.png",
        },
        LinkUserFragment
      ),
    } as ResultOf<typeof Fragment>["requestedBy"],
  },
  Fragment
);
