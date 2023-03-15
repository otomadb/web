"use client";
import clsx from "clsx";
import React from "react";

import {
  MylistPageCommon_SideMylistListFragment,
  UserMylistPage_DetailsFragment,
  UserMylistPage_RegistrationsFragment,
} from "~/gql/graphql";

import { MetaTemplate } from "../../MetaTemplate";
import { Details } from "./Details.server";
import { RegistrationsList } from "./RegistrationsList.server.tsx";

export const UserMylistTemplate: React.FC<{
  sidelist: MylistPageCommon_SideMylistListFragment | undefined;
  details: UserMylistPage_DetailsFragment | undefined;
  registrations: UserMylistPage_RegistrationsFragment | undefined;
}> = ({ sidelist, details, registrations }) => {
  return (
    <MetaTemplate
      sidelist={sidelist}
      Main={() => (
        <main className={clsx()}>
          {details && <Details fragment={details} />}
          {registrations && (
            <RegistrationsList
              className={clsx(["mt-2"])}
              fallback={registrations}
            />
          )}
        </main>
      )}
    />
  );
};
