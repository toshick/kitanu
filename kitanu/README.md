# kitanu

## ADR

### core-jsを手動でインストール

storybookのビルド時に以下のエラーがでる

```
Error: Can't resolve 'core-js/modules/web.dom-collections.for-each'...
```

core-js関連、nuxtがつかっているバージョンが古い（`core-js@2.6.11`）せい

手動で3系をインストールする

### エンドポイント

#### アルバム関連

- 最近のアクティビティ取得
  - 直近に作成したアルバムを降順で返却する
- アルバム作成
- アルバム詳細データ取得
  - アルバムの説明文
  - アルバムタイトル
  - アルバムポスト配列

#### チャット関連

- ログインユーザのチャット一覧を取得
- チャット詳細作成
  - 誰が作成した、誰が参加しているか
- チャット詳細取得
- チャット詳細参加ユーザ取得

#### 友達関連

- ログインユーザの友人一覧を取得
- 

#### ユーザ関連

- ユーザ設定取得
- 

## database

- ユーザ（user）
  - 名前（name）
  - 検索許可（search_ok）
  - 本人確認（kyc_ok）
  - 規約同意（agree_terms_ok）
  - 友達（friend_list）
    - ユーザID（user_id）
- アルバム（album）
  - タイトル（title）
  - 説明（des）
  - 参加メンバ（user_list）
    - ユーザID（user_id）
- アルバム投稿（albumpost）
  - 日付（created_at）
  - 本文（body）
  - イメージ（imgurl）
- チャット（chat）
  - タイトル（title）
  - 説明（des）
  - 参加メンバ（user_list）
    - ユーザID（user_id）
- チャット投稿（chatpost）
  - 日付（created_at）
  - 本文（body）
  - イメージ（imgurl）
  - ふきだしタイプ（fuki_type）
  - ユーザ情報（ユーザID、ユーザイメージ）
  - グッドリスト（good_list）
    - ユーザID（user_id）
    - ユーザ名（user_name）