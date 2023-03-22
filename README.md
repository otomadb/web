# Web frontend for _[Otomadb.com](https://otomadb.com/)_

[![GitHub](https://img.shields.io/github/license/otomadb/web?style=flat)](https://github.com/otomadb/web/blob/main/LICENSE)

[Otomadb.com](https://otomadb.com/)の Web フロントエンドです．

## バグ報告など

バグ報告や機能の要望などは[Issues](https://github.com/otomadb/web/issues)へ書いてもらえると助かります．
GitHub のアカウントがない場合は[開発者の Twitter など](#連絡先)にメンションを送ってください．

## 編集者へ

次のスクリプトをブックマークに追加すると動画登録が楽になるかもしれません．

```javascript
(function () {
  const nicovideoRegex = /https:\/\/www.nicovideo.jp\/watch\/([a-z]{2}\d+)+/;
  if (nicovideoRegex.test(window.location.href)) {
    const m = window.location.href.match(nicovideoRegex);
    window.open(`https://www.otomadb.com/editor/nicovideo?sourceId=${m[1]}`);
  }
})();
```

## 開発者へ

[Contribution は歓迎します．](https://www.youtube.com/watch?v=P9HULx5_-cA&t=198s)

### セットアップ

以下を導入してください．

- Node.js v18
- pnpm

あるいは，[Nix](https://nixos.org/)が入っていて[direnv](https://github.com/direnv/direnv/wiki/Nix)が適切に設定されているなら，次のコマンドで環境が整うはずです．

```shell
direnv allow
```

### npm scripts

#### TL;DR

```bash
pnpm run dev
pnpm run codegen:watch # 別のターミナルで
```

#### `pnpm run dev`

デフォルトでは`localhost:3000`に Next.js 開発環境が立ち上がります．

#### `pnpm run codegen`

graphql-codegen によって API の型定義が生成されます．

`pnpm run codegen:watch`でファイル更新がある度に型定義ファイルを更新します．`pnpm run dev`または`pnpm run storybook`の起動中は同時に起動することを推奨します．（`pnpm run dev`でこれが呼ばれることはありません．）

デフォルトでは`./schema.graphql`から型定義ファイルを生成しますが，`GRAPHQL_SCHEMA_PATH`によって変更可能です．
例えば，手元で[GraphQL API](https://github.com/otomadb/api)を`localhost:8080`で動かしているなら，`GRAPHQL_SCHEMA_PATH="http://localhost:8080/graphql"`などに設定してください．

#### `pnpm run storybook`

デフォルトでは`localhost:6006`に Storybook が立ち上がります．

## ライセンス

[MIT License](https://github.com/otomadb/web/blob/main/LICENSE)

## 連絡先

- [SnO2WMaN](https://github.com/SnO2WMaN)
  - Twitter: [@SnO2WMaN](https://twitter.com/SnO2WMaN)
