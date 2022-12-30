"use client";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

import {
  LinkRegisterNicovideo,
  LinkRegisterSemitag,
  LinkRegisterTag,
  LinkUser,
  LinkUserLikes,
  LinkUserMylists,
} from "~/components/common/Link";
import { useLogout } from "~/hooks/useLogout";

const MenuItem: React.FC<{
  className?: string;
  Wrapper: React.FC<{ className?: string; children?: ReactNode }>;
  children: ReactNode;
}> = ({ className, Wrapper, children }) => {
  return (
    <Wrapper
      className={clsx(
        className,
        ["block"],
        ["py-2"],
        ["px-4"],
        ["bg-white/75", "hover:bg-sky-300/75"],
        ["text-slate-900", "group-hover/link:text-sky-900"],
        ["text-xs"]
      )}
    >
      {children}
    </Wrapper>
  );
};

export const Logout: React.FC<{ className?: string }> = ({ className }) => {
  const router = useRouter();
  const logout = useLogout({
    onSuccess() {
      router.push("/");
    },
  });

  return (
    <div
      className={clsx(className)}
      role={"button"}
      onClick={() => {
        logout();
      }}
    >
      ログアウト
    </div>
  );
};

export const Accordion: React.FC<{
  className?: string;
  user: { id: string; name: string; displayName: string; icon: string };
}> = ({ className, user }) => {
  return (
    <div className={clsx(className, ["pt-1"])}>
      <div
        className={clsx(
          ["w-full"],
          ["shadow"],
          ["overflow-hidden"],
          ["rounded-md"],
          ["backdrop-blur-md"],
          ["divide-y-2", "divide-y-slate-400"]
        )}
      >
        <div className={clsx(["py-3"], ["px-4"], ["bg-white/75"])}>
          <div className={clsx(["text-slate-900"], ["text-sm"], ["font-bold"])}>
            {user.displayName}
          </div>
          <div className={clsx(["text-slate-700"], ["text-xs"])}>
            @{user.name}
          </div>
        </div>
        <div>
          <div
            className={clsx(
              ["py-2"],
              ["px-4"],
              ["bg-slate-200/75"],
              ["border-b", "border-y-slate-300"]
            )}
          >
            <div className={clsx(["text-xs"], ["text-slate-500"])}>
              通常ユーザー
            </div>
          </div>
          <div className={clsx(["grid"], ["grid-cols-1"])}>
            <MenuItem
              Wrapper={(props) => <LinkUser name={user.name} {...props} />}
            >
              いいねした動画
            </MenuItem>
            <MenuItem
              Wrapper={(props) => <LinkUserLikes name={user.name} {...props} />}
            >
              プロフィール
            </MenuItem>
            <MenuItem
              Wrapper={(props) => (
                <LinkUserMylists name={user.name} {...props} />
              )}
            >
              マイリスト
            </MenuItem>
          </div>
        </div>
        <div>
          <div
            className={clsx(
              ["py-2"],
              ["px-4"],
              ["bg-slate-200/75"],
              ["border-b", "border-y-slate-300"]
            )}
          >
            <div className={clsx(["text-xs"], ["text-slate-500"])}>編集者</div>
          </div>
          <div className={clsx(["grid"], ["grid-cols-2"])}>
            <MenuItem
              className={clsx(["col-span-2"])}
              Wrapper={(props) => <LinkRegisterNicovideo {...props} />}
            >
              ニコニコ動画から登録
            </MenuItem>
            <MenuItem
              className={clsx(["col-span-1"])}
              Wrapper={(props) => <LinkRegisterTag {...props} />}
            >
              タグの登録
            </MenuItem>
            <MenuItem
              className={clsx(["col-span-1"])}
              Wrapper={(props) => <LinkRegisterSemitag {...props} />}
            >
              仮タグの解決
            </MenuItem>
          </div>
        </div>
        <div
          className={clsx(
            [["py-2"], ["px-4"]],
            [["bg-slate-200/75"]],
            ["grid", ["grid-cols-2"]]
          )}
        >
          <div className={clsx(["flex"])}>
            <Logout
              className={clsx(
                ["text-xs"],
                ["text-slate-700", "hover:text-slate-500"]
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
