"use client";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

import { useLogout } from "~/hooks/useLogout";

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
            <Link
              className={clsx(
                ["group"],
                ["block"],
                ["py-2"],
                ["px-4"],
                [["bg-white/75", "hover:bg-sky-300/75"]]
              )}
              href={"/profile"}
            >
              <div
                className={clsx(
                  ["text-slate-900", "group-hover:text-sky-900"],
                  ["text-xs"]
                )}
              >
                プロフィール
              </div>
            </Link>
            <Link
              className={clsx(
                ["group"],
                ["block"],
                ["py-2"],
                ["px-4"],
                [["bg-white/75", "hover:bg-sky-300/75"]]
              )}
              href={"/profile/likes"}
            >
              <div
                className={clsx(
                  ["text-slate-900", "group-hover:text-sky-900"],
                  ["text-xs"]
                )}
              >
                いいねした動画
              </div>
            </Link>
            <Link
              className={clsx(
                ["group"],
                ["block"],
                ["py-2"],
                ["px-4"],
                [["bg-white/75", "hover:bg-sky-300/75"]]
              )}
              href={"/profile/mylists"}
            >
              <div
                className={clsx(
                  ["text-slate-900", "group-hover:text-sky-900"],
                  ["text-xs"]
                )}
              >
                マイリスト
              </div>
            </Link>
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
            <Link
              className={clsx(
                ["col-span-2"],
                ["group"],
                ["block"],
                ["py-2"],
                ["px-4"],
                [["bg-white/75", "hover:bg-sky-300/75"]]
              )}
              href={"/register/nicovideo"}
            >
              <div
                className={clsx(
                  ["text-slate-900", "group-hover:text-sky-900"],
                  ["text-xs"]
                )}
              >
                ニコニコ動画から登録
              </div>
            </Link>
            <Link
              className={clsx(
                ["group"],
                ["block"],
                ["py-2"],
                ["px-4"],
                [["bg-white/75", "hover:bg-sky-300/75"]]
              )}
              href={"/editor/tag"}
            >
              <div
                className={clsx(
                  ["text-slate-900", "group-hover:text-sky-900"],
                  ["text-xs"]
                )}
              >
                タグの登録
              </div>
            </Link>
            <Link
              className={clsx(
                ["group"],
                ["block"],
                ["py-2"],
                ["px-4"],
                [["bg-white/75", "hover:bg-sky-300/75"]]
              )}
              href={"/editor/semitag"}
            >
              <div
                className={clsx(
                  ["text-slate-900", "group-hover:text-sky-900"],
                  ["text-xs"]
                )}
              >
                仮タグの解決
              </div>
            </Link>
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
