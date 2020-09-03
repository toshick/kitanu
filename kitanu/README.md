# kitanu

## ADR

### core-jsを手動でインストール

storybookのビルド時に以下のエラーがでる

```
Error: Can't resolve 'core-js/modules/web.dom-collections.for-each'...
```

core-js関連、nuxtがつかっているバージョンが古い（`core-js@2.6.11`）せい

手動で3系をインストールする

