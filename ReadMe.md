# 応募通知システム

求人媒体から届く応募通知メールをGoogle Apps Script (GAS) で検知し、内容を整形して Google Chat に通知する仕組みです。応募内容はスプレッドシートにも自動で記録します。

- 実行基盤: Google Apps Script
- 利用サービス: Gmail, Google Drive, Google Spreadsheet, UrlFetch (Google Chat Webhook), Triggers

## クイックスタート

1) Google Chat で通知先スペースの Webhook URL を用意
- Chat の「ウェブフックを管理」からURLを発行します。

2) 設定ファイルを用意してビルド
- `configs/` から対象企業の設定ファイル（例: `cam.js`）をベースに調整、または新規に作成します。
- ターミナルで以下を実行し、`outputs/` にApps Scriptへ貼り付け可能な1ファイルを生成します。

```
bash build.sh
```

3) Apps Script プロジェクトを作成し、`outputs/xxx.js` の内容を貼り付け
- GASエディタで新規プロジェクトを作成し、`Code.gs` など既存内容を置き換えて貼り付けます。

4) 初回セットアップを実行
- 関数 `setup` を実行し、権限承認 → 設定用スプレッドシートの作成 → トリガー作成（1分おき） → 動作テストを行います。
- スプレッドシートの「基本設定」「求人サイト設定」を必要に応じて更新してください。

5) 運用
- 自動トリガーで定期的に実行されます。手動実行する場合は `checkEmailsAndSendToChat` を実行します。
- 設定の確認は `checkConfig` を実行するとログに出力されます。

## ディレクトリ構成

- `src/main.js` — 応募メールの取得・整形・記録・Chat送信などメイン処理
- `configs/*.js` — 企業別の設定。スプレッドシート連携用の定義を含むファイル（例: `cam.js`）をテンプレートとして利用してください
- `outputs/*.js` — `build.sh` で `configs/*.js` と `src/main.js` を結合した最終成果物（GASに貼り付け）
- `template/` — 設定の参考となるひな形（レガシー例を含む場合あり）
- `build.sh` — `configs` 全件を検出して `outputs` に成果物を生成するスクリプト

## 仕組みと動作のポイント

- Gmail の検索条件
  - 各求人サイトごとに「送信元アドレス」「件名キーワード」を設定し、`from:<メール> subject:<キーワード> is:unread` で未読メールを抽出します。
- 本文の切り出し
  - `startKeyword` ～ `endKeyword` の間を切り出します。媒体のテンプレ変更でヒットしない場合はエラーメッセージをGoogle Chatへ送信します。
- 重複登録の抑止
  - 同一内容はスプレッドシートに二重記録しません。
- 主要関数
  - `setup`（初回セットアップ）/ `createTrigger`（1分おきトリガー作成）/ `checkEmailsAndSendToChat`（手動実行）/ `checkConfig`（設定確認）

## 設定（スプレッドシート）

`setup` 実行時に以下のシートを自動作成します（既存がない場合）。

- 基本設定
  - 会社名（通知文言に使用）
  - Chat Webhook URL（Google Chat 通知先）
  - 応募管理シート名（応募記録用シート名）
  - 追加メッセージ（面談者情報など追記）
- 求人サイト設定
  - サイト名 / 送信元メール / 件名キーワード / 開始キーワード / 終了キーワード / ログインID / パスワード

設定を変更したら再度 `checkConfig` で確認し、実行状況をログで確認してください。

## 権限とセキュリティ

- 初回実行時にGASの権限承認（Gmail, Drive, Spreadsheet, 外部送信）が必要です。
- `configs/*.js` には機微情報（Webhookやログイン情報）が含まれます。社外公開リポジトリへのコミットは絶対に避けてください。
- 機微情報はスプレッドシート管理（基本設定/求人サイト設定）へ移行する運用を推奨します。

## トラブルシュート

- 「設定スプレッドシートが見つかりません」
  - 初回は想定動作です。`setup` を実行し、作成後に再実行してください。
- Chatへ通知されない
  - Webhook URL/アクセス権限、Gmail の検索条件（送信元・件名・未読）を確認してください。
- 本文の切り出しに失敗する
  - 媒体のテンプレート変更が疑われます。スプレッドシートの `開始/終了キーワード` を更新してください。

## ドキュメント

内部ドキュメント: https://docs.google.com/document/d/1C_ungNgDED7VuHC6UDtpNCTkD7s_0XxblhVM0ZgimHY/edit?tab=t.0#heading=h.8fcb8bvgxt4f
