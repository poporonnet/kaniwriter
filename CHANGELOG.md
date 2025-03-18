# Changelog

## [1.0.0](https://github.com/poporonnet/kaniwriter/compare/v0.2.0...v1.0.0) (2025-03-18)


### Features

* エラーをAlertではなく通知形式での表示に変更 ([#434](https://github.com/poporonnet/kaniwriter/issues/434)) ([6d54b42](https://github.com/poporonnet/kaniwriter/commit/6d54b4202cc1ab3b785692237badf4c0ff98f828))
* 日本語フォントをKosugi Maruに変更 ([#426](https://github.com/poporonnet/kaniwriter/issues/426)) ([e9ad42c](https://github.com/poporonnet/kaniwriter/commit/e9ad42ce6a264a742608d73f37a5fcf7c505f95d))


### Bug Fixes

* joyUIのAPI対応 ([ca95c38](https://github.com/poporonnet/kaniwriter/commit/ca95c383d66678139cfe57745197ad3edc385dfe))
* Safariで背景のblurの表示がおかしくなるのを修正 ([e003043](https://github.com/poporonnet/kaniwriter/commit/e00304316b2493112555566d473e28476e183bae))
* Typographyをmuiからjoyに修正 ([7ed79a2](https://github.com/poporonnet/kaniwriter/commit/7ed79a28324e112d74fc1e7e4c782f8916b8a103))
* フォントを修正 ([41495f6](https://github.com/poporonnet/kaniwriter/commit/41495f6f0aff991303aa1474b30945f35546b974))
* 自動検証の場合の処理を自動実行の前に ([54adee3](https://github.com/poporonnet/kaniwriter/commit/54adee38c2283491aa4857f045575b766cfbc838))


### Miscellaneous Chores

* release 1.0.0 ([#463](https://github.com/poporonnet/kaniwriter/issues/463)) ([0382dc4](https://github.com/poporonnet/kaniwriter/commit/0382dc44c26ca0850c342460259ef8c00376cf33))

## [0.2.0](https://github.com/poporonnet/kaniwriter/compare/v0.1.0...v0.2.0) (2025-02-20)


### ⚠ BREAKING CHANGES

* チャンク最適化をv2のものに更新

### Miscellaneous Chores

* release 0.2.0 ([#425](https://github.com/poporonnet/kaniwriter/issues/425)) ([ab5e7f5](https://github.com/poporonnet/kaniwriter/commit/ab5e7f5a4f8294f1be8f12a1c1a03a17c32c1ed5))
* チャンク最適化をv2のものに更新 ([3c30b31](https://github.com/poporonnet/kaniwriter/commit/3c30b31b0bb34c8254cae133450df5a0ac80e3a2))

## [0.1.0](https://github.com/poporonnet/kaniwriter/compare/v0.1.0...v0.1.0) (2024-12-04)


### Features

* 　tryEnterWriteModeを追加した ([2520f5f](https://github.com/poporonnet/kaniwriter/commit/2520f5fbcfd88b37ccc17eb4e8c47ccbda74ec56))
* localeを切り替えるセレクトボックス ([df65962](https://github.com/poporonnet/kaniwriter/commit/df659625af91207ee942305f4dbc5fdb607d593b))
* sendCommandに書き込みモードかを問わず送信するオプションを追加 ([77019ac](https://github.com/poporonnet/kaniwriter/commit/77019ac86527d5f3845ceabfcef04ffa2f78e7f5))
* Sendボタンで強制的に送信する ([dda3ca6](https://github.com/poporonnet/kaniwriter/commit/dda3ca6c4d504e111c1fb0ecee4a62bf9c155cb3))
* アイコンをホバーすると言語リストがフェードインする ([6c5b701](https://github.com/poporonnet/kaniwriter/commit/6c5b701678ac3c85f59f70dda49ff30b4a5540cd))
* エラーメッセージがない場合はモーダルを開けない ([bf2b4c5](https://github.com/poporonnet/kaniwriter/commit/bf2b4c5020ecbf9cb17bc11834a7af3cd086f5d5))
* エラーメッセージを表示 ([4b53fd1](https://github.com/poporonnet/kaniwriter/commit/4b53fd1a086ea9432c9be9f055ae5db8c2980e21))
* コードを表示する箇所のフォントと、横幅のスタイルを修正 ([58f955d](https://github.com/poporonnet/kaniwriter/commit/58f955dd4f01b6b713ed10f2fa7403ce48c790aa))
* コンパイラバージョンがlocalStorageに保存される ([3e612e8](https://github.com/poporonnet/kaniwriter/commit/3e612e8d3f494259060516d73f6727e243bd7865))
* コンパイラバージョンを取得するフックを追加 ([29a1f87](https://github.com/poporonnet/kaniwriter/commit/29a1f87d38f35418172cf348d2867b4be3f34ff7))
* コンパイラバージョンを選択するセレクトボックスを追加 ([2a617f8](https://github.com/poporonnet/kaniwriter/commit/2a617f8dea42f37321474b62e0d9d42404fe3342))
* テキストをi18nextで置き換え ([6f62757](https://github.com/poporonnet/kaniwriter/commit/6f6275701c97469131d06dcbaa70b49abe44a7bd))
* バージョンの差異に対応 ([1796aa4](https://github.com/poporonnet/kaniwriter/commit/1796aa4367bdb0ae72a82b106eb5b537e2408f0a))
* リンク先をリファレンスのURLに変更 ([d7b8cb0](https://github.com/poporonnet/kaniwriter/commit/d7b8cb04d488e3f8591220f7646bbab56b63ee31))
* 切断ボタンを追加 ([cefd900](https://github.com/poporonnet/kaniwriter/commit/cefd9006ee2a1c72a79a7e7883b1cdf51f636cc8))
* 多言語対応 ([a0f69a8](https://github.com/poporonnet/kaniwriter/commit/a0f69a82ae672c6e88280c7a59140588e84439d5))
* 安全に切断するdisconnect関数を追加 ([51a2406](https://github.com/poporonnet/kaniwriter/commit/51a24065e88871ece266402265d529c6378b8a23))
* 実行ボタンを追加 ([6eb97ac](https://github.com/poporonnet/kaniwriter/commit/6eb97aceaa12bc7dbb4e7023b0461c7c5a833786))
* 接続済みの時には接続ボタンをグレーアウトする ([a2dcd14](https://github.com/poporonnet/kaniwriter/commit/a2dcd14f8be5afeb728f957d1ad923b201236529))
* 送信したソースコードを見れるようにした ([e668f2b](https://github.com/poporonnet/kaniwriter/commit/e668f2b0d1db14534e703e71d19c65fa3bb851f4))


### Bug Fixes

* ci実行時にちゃんと警告が出るように ([7c5aaab](https://github.com/poporonnet/kaniwriter/commit/7c5aaabb81978cd068817ba9a32e865ad6f31564))
* CRLFを定期的に送るようにした ([8ed4c0e](https://github.com/poporonnet/kaniwriter/commit/8ed4c0ea6bf61709fe61e483a1f5956bd650db7b))
* **deps:** update emotion monorepo to v11.11.4 ([6530934](https://github.com/poporonnet/kaniwriter/commit/6530934a95dfba8838565b8e9a94f28acc4fb5a4))
* detectEventが反応する文字列をターゲットで変えるように ([b8376e3](https://github.com/poporonnet/kaniwriter/commit/b8376e37f6d25a326416734f333092dbd93f8cbe))
* jsonのパースに失敗する場合の対応 ([1eee739](https://github.com/poporonnet/kaniwriter/commit/1eee739a0b84019adad81776095a225256448920))
* linkタグのurlを修正 ([362cc86](https://github.com/poporonnet/kaniwriter/commit/362cc86db2cfa3de7a0e234eaff855d73bb6cd34))
* **lint:** catchにundefinedを返す関数を渡す ([430d54c](https://github.com/poporonnet/kaniwriter/commit/430d54cd39003f914b2aa633eabc5edf0e479277))
* **lint:** IResultの型を修正 ([24ebc44](https://github.com/poporonnet/kaniwriter/commit/24ebc4455c7741c60108dde5732befacdcedcd2a))
* **lint:** isTargetの引数型をstringに修正 ([1fa6f55](https://github.com/poporonnet/kaniwriter/commit/1fa6f5536da2a36816ae691b4fbaec27ff4d05fe))
* **lint:** Jobの型を修正 ([d68d2cf](https://github.com/poporonnet/kaniwriter/commit/d68d2cf5da252ea886bc2db4d5f06af3227596cf))
* **lint:** Loggerの型を修正 ([7804277](https://github.com/poporonnet/kaniwriter/commit/780427761f94f6cef481e80029b90ee08f6dc549))
* **lint:** whileの条件式を修正 ([5e620f0](https://github.com/poporonnet/kaniwriter/commit/5e620f00f99d56b705b79892085f83303043f5d2))
* **lint:** 不必要にPromiseを生成していたのを修正 ([c9973ff](https://github.com/poporonnet/kaniwriter/commit/c9973ff72255ba720a5ba19a72d5be0d927a1ef8))
* **lint:** 不必要にPromiseを生成していたのを修正 ([d2639f6](https://github.com/poporonnet/kaniwriter/commit/d2639f6ae6071ee3b475275f9de2adb925e85c50))
* **lint:** 依存リストを修正 ([8c613d7](https://github.com/poporonnet/kaniwriter/commit/8c613d77b092eaff0baf0a787b17d8885c1c198d))
* **lint:** 依存リストを修正 ([fdf7c95](https://github.com/poporonnet/kaniwriter/commit/fdf7c95bc368172e2102713f2ea56be0c30a9a77))
* **lint:** 依存配列を修正 ([9e72305](https://github.com/poporonnet/kaniwriter/commit/9e72305cab436d71a6adb92ebfde62eb8c4004bb))
* **lint:** 関数をuseCallbackでラップ ([4190c39](https://github.com/poporonnet/kaniwriter/commit/4190c39f8373272ea5fef8924618d4744462145d))
* localeをlocalStorageに保存し忘れていたのを修正 ([3f9dae1](https://github.com/poporonnet/kaniwriter/commit/3f9dae1b1533cbb31a24984f2bd1866c6b801264))
* **refactor:** ファイル名を変更 ([f0c1a80](https://github.com/poporonnet/kaniwriter/commit/f0c1a801a1e4ad6532d297b097bc4754db93173b))
* typo ([0e2820b](https://github.com/poporonnet/kaniwriter/commit/0e2820b3ba7c154653b8e823609a5eb78670241a))
* typo ([bc4ce8a](https://github.com/poporonnet/kaniwriter/commit/bc4ce8a729b5f20018a1d1ddf816e2b52e1b6764))
* **ui:** gap ([6bd97af](https://github.com/poporonnet/kaniwriter/commit/6bd97aff9e0d6bc57554149713cb278b2ac5ff2c))
* **ui:** コンパイルのエラーメッセージがずれる問題の修正 ([fc70934](https://github.com/poporonnet/kaniwriter/commit/fc709346c20aff0c644682d087ca7c643824f23b))
* **ui:** ログとボタンがずれる問題の修正 ([0867089](https://github.com/poporonnet/kaniwriter/commit/0867089e4f98435f4eb197f294a3c75521ba84d9))
* **ui:** ログの幅を以前とほぼ同じ幅にする ([9feaab4](https://github.com/poporonnet/kaniwriter/commit/9feaab4fbf84875e12525d850ca9ac45958666fb))
* **ui:** 不要なスタイルを削除、改行されないように ([8f4f4b8](https://github.com/poporonnet/kaniwriter/commit/8f4f4b823e9bcbe7317505c85baedbac1af0a32e))
* **ui:** 常にウィンドウサイズを覆うように ([0ca8033](https://github.com/poporonnet/kaniwriter/commit/0ca8033e79d910f736a9a83ed87a6317fcb23124))
* **ui:** 幅が小さいときにヘッダーが欠ける問題の修正 ([62d1452](https://github.com/poporonnet/kaniwriter/commit/62d1452a6834f708cd4c3c9a3a0062b9905b9ee6))
* **ui:** 操作ボタンをモニタの下に移動 ([35c8606](https://github.com/poporonnet/kaniwriter/commit/35c8606246631b7c3ebf40d5b08e09e13078a3ca))
* **ui:** 自動スクロールのチェックボックスを左下に移動 ([b5be5a7](https://github.com/poporonnet/kaniwriter/commit/b5be5a78ac5b5ff6f256888e605f0eedc4416917))
* useTranslationのimportの修正とコンポーネント名の変更 ([f6a9ef0](https://github.com/poporonnet/kaniwriter/commit/f6a9ef0eea7e7466314af618e43e61cd1130dd62))
* コマンドの末尾に改行を追加 ([f7d396d](https://github.com/poporonnet/kaniwriter/commit/f7d396d88577a311442584a9764cacf23d028031))
* コマンドモードに入るキーワードの修正 ([3137aa0](https://github.com/poporonnet/kaniwriter/commit/3137aa0594be2d3923917b74f21e62ec6ee9e51a))
* コマンドを送る部分にignoreResponseオプションを追加 ([dd39526](https://github.com/poporonnet/kaniwriter/commit/dd39526c11ecf64ec40299e4b25ebeee05fdf064))
* バージョンの取得に失敗した場合にローディングが表示され続けてしまう問題の修正 ([5a25e19](https://github.com/poporonnet/kaniwriter/commit/5a25e1965736451de27eef4da777680cd6dcff15))
* バージョン表記を`mrbc n.n.n`に修正 ([b09154e](https://github.com/poporonnet/kaniwriter/commit/b09154e315c20ea3de29d908c40e6d38fdd75641))
* ハイライターが変更されたらソースコードを再変換するように修正 ([81fb6b6](https://github.com/poporonnet/kaniwriter/commit/81fb6b6836a67de75b05d631b867977d94b0cb45))
* ファイル位置を修正 ([5f98078](https://github.com/poporonnet/kaniwriter/commit/5f98078b353572206bb286a959d6ccb935b0198c))
* ファイル名の変更 ([ad37261](https://github.com/poporonnet/kaniwriter/commit/ad372614f6c157cef060c90de09ecc25a12dec9f))
* メモリ使用量を制限 ([1aa4d74](https://github.com/poporonnet/kaniwriter/commit/1aa4d74bd6227bffe9f3c138cb930d13e3427a2f))
* 入力したコマンドのまま送信できるように ([bf1e236](https://github.com/poporonnet/kaniwriter/commit/bf1e236aa5fd8cdd1fdadad3c4ddbe0f9c8735b1))
* 全ての改行コードを置換するように修正 ([48e90b6](https://github.com/poporonnet/kaniwriter/commit/48e90b6ca30a271b1fd45cb1abb9df3db27db6d5))
* 受信したCRLFをLFに置換 ([329cae0](https://github.com/poporonnet/kaniwriter/commit/329cae0cfd10a7d49bf794221dfef939a09a244e))
* 横に長いプログラムが来たときにレイアウトが壊れるのを修正 ([af404eb](https://github.com/poporonnet/kaniwriter/commit/af404eb35c9876c2f816cd78ad862bc0a4ca8825))
* 自動実行をオフに ([33c1603](https://github.com/poporonnet/kaniwriter/commit/33c1603ef180eda0fc5fddce78292f76e7ed94f6))
* 関数内でjobを待機する ([83a7774](https://github.com/poporonnet/kaniwriter/commit/83a7774c739e056bcd88392e8cb58149ff312f09))


### Miscellaneous Chores

* release 0.1.0 ([02a2537](https://github.com/poporonnet/kaniwriter/commit/02a25376e2150718e6d28ed6234ddda571eb7943))
