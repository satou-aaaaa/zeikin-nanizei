# AGENTS.md

なに税？：ふだんの場面（作り話）を見て、その場面でかかる税を当てる1日5問の学習ゲーム。正解したら「どこに納める？」（国・都道府県・市町村）も選ぶ。`index.html` と `data.js`（問題の種類）を GitHub Pages で公開する。

## 準備（最初に一度）

```bash
bash scripts/setup.sh   # Node.js（版は .nvmrc）を確かめ、検査の依存とブラウザを入れる。何度実行してもよい
```

Claude Code のクラウドセッションでは `.claude/settings.json` のフックが自動で実行する。

## push する前の確認

```bash
node qa/run.mjs   # 問題（23種類×3000問：選び肢・答えは1つ・答えと納め先と分け方が表どおり・出典）・今日の5問と上級（3年分）・とことん・通しで遊ぶ・続きから・2段目・復習・幅320px・PWA・引き継ぎ・見やすさ（CI の QA と同じ）
```

## このリポジトリの決まり

- 中身は財務省「税の種類に関する資料」（<https://www.mof.go.jp/tax_policy/summary/condition/a01.htm>）の税目の表と、e-Gov 法令検索の各税法（所得税法・法人税法・相続税法・消費税法・酒税法・揮発油税法・自動車重量税法・印紙税法・登録免許税法・国際観光旅客税法・森林環境税法・関税法・地方税法）の条文で確かめたことだけ（2026-11-17 に読んだ）。種類を足すときも条文を読み、`src` に付け、`qa/run.mjs` の `TB`（別に書いた表：答え・納め先・財務省の分け方）にも足す。
- 扱うのは「どの税か」と「国・都道府県・市町村のどこに納めるか」だけ。税率・税額・手取りの計算（お金のきほん okane-kihon・給与明細よみ kyuyo-meisai）、消費税の8%と10%（軽減税率どっち keigen-zeiritsu）と重ねない。税の良し悪しは扱わない。人と会社は作り話で、名前を出さない。
- 選び肢は、その場面ではかからない税（`near`）だけから選ぶ。同じ場面で別の税もかかるもの（買い物の消費税・土地を手に入れたときの登録免許税など）を選び肢に入れない。国と地方の両方にある税（たばこ税・住民税）は答えにしない。
- 税金の助言にしない：遊び方と「このゲームについて」と README に、税金の助言・公式の情報の代わりではないこと、国税庁・自治体・e-Gov で確かめることを置く（QA が見る）。
- 問題は、やさしいが選び肢3つ、ふつう・むずかしいが4つ。2回目のヒントはまちがいを消して2つにしぼり、法律の言葉（`key`）も見せる。2段目は「どこに納める？」（3つ）で、種類（`grp`）で決まる。
- 今日の5問（やさしい2・ふつう2・むずかしい1、種類は重ねない）・上級（むずかしい3、今日のむずかしいと別）は日本時間の日付の種で決まり、だれでも同じ。`Math.random()` は練習・とことんの種だけ。乱数は `sort` の比較の中で引かない。`KINDS`・言い回しの並びは最後に足すだけ（QA の `PIN` が第1回の1問目を見る）。`data.js` を変える PR は自動ではマージされない（`hold_paths`）。
- 2027年度以降に税の名前や国・地方の分け方が変わったら（税制改正）、`data.js` と `TB` を直す。
- ★はまちがい＋ヒントの数（0で★3・1で★2・2以上で★1）。上級はヒントなし。時間制限なし。
- 好きなだけ遊べる：チケット・ライフ・回数制限・🔒で開くモードを入れない（shared-workflows `routines/game-dev.md` F1〜F7。QA が見る）。とことん（`runs.e`）はまちがえても続き、「ここで降りる」で終わる。
- 1問を深くする：`depth.js` と `qa/depth-check.mjs` は shared-workflows `template/` の写しで、ここでは直さない。自信あり・2段目「どこに納める？」・復習（1→3→7日後）。記録 `zni-v1`・文字 `zni-fs`・復習 `zni-depth`。
- 共有は遊ぶ人が押したときに開くリンクだけ。シェアの文に問題・答えを出さない。感想は Issue フォーム（`.github/ISSUE_TEMPLATE/feedback.yml`）を開くだけ。応援は Ko-fi へのただのリンクだけ。
- 外へ通信しない（CSP の `connect-src 'self'` を広げない）。見やすさ（`<!-- a11y:begin -->`〜`end`・`qa/a11y.mjs`）と引き継ぎ（`transfer.js`・`qa/transfer-check.mjs`）は shared-workflows `template/` の写しで、ここでは直さない。
- 画面の土台は憲法のしくみ（kenpo-shikumi）から写した。写し元の言葉が残っていないかを QA が見る。
- PWA：画面のファイルを足したら `sw.js` の `SHELL` にも足し、中身を大きく変えたら `CACHE` の版を上げる。アイコンは `node tools/make-icons.cjs`、`og.png` は `node tools/make-og.cjs`。
- 公開リポジトリなので、個人情報・鍵を入れない。

## 公開

- GitHub Pages は `main` のルート（`/`）を公開する。PR の QA と Secret scan が ✅ になると `automerge.yml` が自動でマージする。止めたいときは下書きにするか、ラベル「自動マージしない」を付ける。
- `sw.js`・`manifest.webmanifest`・`data.js` を変える PR は自動ではマージされない（`hold_paths`）。CodeRabbit のレビューを読み、手でマージする直前に今の head へのレビューを読み直す。CodeRabbit は PR に `@coderabbitai review` とコメントして頼む。

## 共通のきまり

- PR の作り方・マージの仕方は satou-aaaaa/shared-workflows の `routines/pr.md`、全体のきまりは `routines/common.md` に従う。
- CI の部品は shared-workflows の共通部品を呼ぶ。リポジトリ側の .github/workflows には呼び出しと設定値だけを書く。
- Claude 以外の AI・人が作業するときは、shared-workflows の `routines/tool-map.md` と `routines/without-claude.md` を読む。
