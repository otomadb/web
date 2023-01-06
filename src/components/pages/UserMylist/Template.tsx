"use client";
import React, { ComponentProps } from "react";

import { MetaTemplate } from "~/components/common/MylistPage/MetaTemplate";
import { SideMylistList } from "~/components/common/MylistPage/SideMylistList";
import { Registrations } from "~/components/pages/UserMylist/Registrations";

export const UserMylistTemplate: React.FC<{
  sidelist?: ComponentProps<typeof SideMylistList>["fallback"];
  registrations?: ComponentProps<typeof Registrations>["fallback"];
}> = ({ sidelist, registrations }) => {
  return (
    <MetaTemplate
      sidelist={sidelist}
      Main={() => (
        <>{registrations && <Registrations fallback={registrations} />}</>
      )}
    />
  );
};
