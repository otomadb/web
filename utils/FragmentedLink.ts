import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import Link from "next/link";
import React, { ComponentProps } from "react";

import { FragmentType } from "~/gql";

type FragmentedLink<
  TFragment extends TypedDocumentNode,
  TParams extends Record<string, unknown> = Record<string, never>,
> = React.FC<
  Omit<ComponentProps<typeof Link>, "href"> & {
    fragment: FragmentType<TFragment>;
  } & TParams
>;
export default FragmentedLink;
