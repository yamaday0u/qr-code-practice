# QR Code Practice

QRコードリーダー機能を実装した練習プロジェクトです。異なるライブラリを使用した2つの実装方法を比較できます。

## 📋 プロジェクト概要

このプロジェクトは、**Next.js**と**React 19**を使用して、2つの異なるQRコードスキャンアプローチを実装しています。

- **practice1**: `html5-qrcode`ライブラリを使用した実装
- **practice2**: `@yudiel/react-qr-scanner`ライブラリを使用した実装

## 🗂️ プロジェクト構造

```
qr-code-practice/
├── practice1/                    # html5-qrcodeを使用した実装
│   ├── app/
│   │   ├── components/
│   │   │   └── QRCodeReader.tsx  # QRコードリーダーコンポーネント
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── practice2/                    # @yudiel/react-qr-scannerを使用した実装
│   ├── app/
│   │   ├── components/
│   │   │   └── QRCodeReader.tsx  # QRコードリーダーコンポーネント
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
└── README.md
```

## 🚀 セットアップ

### 前提条件

- Node.js 18以上
- npm または yarn

### インストール

各ディレクトリでインストールを実行します：

**practice1:**
```bash
cd practice1
npm install
```

**practice2:**
```bash
cd practice2
npm install
```

## 🏃 実行方法

### practice1 - html5-qrcode版

```bash
cd practice1
npm run dev
```

ブラウザで `http://localhost:3000` を開きます。

**特徴:**
- ✅ 手動でスキャン開始/停止を制御
- ✅ 固定サイズのQRコード検出エリア（250x250px）
- ✅ 低レベルでの細かい制御が可能
- ✅ 軽量で基本的な機能に特化

**スクリーンショット/使用方法:**
1. スキャン開始ボタンをクリック
2. カメラにQRコードを向ける
3. 読み込み完了後に結果が表示される
4. スキャン停止ボタンで終了

### practice2 - @yudiel/react-qr-scanner版

```bash
cd practice2
npm run dev
```

ブラウザで `http://localhost:3000` を開きます。

**特徴:**
- ✅ 自動スキャン（QRコードをカメラに向けるだけで自動認識）
- ✅ 複数のバーコード形式に対応
- ✅ 組み込みコントロール
  - トーチ（フラッシュライト）
  - ズーム機能
  - カメラのオン/オフ
  - ファインダーオーバーレイ
  - スキャン完了時の音声フィードバック
- ✅ より高レベルな便利機能

**スクリーンショット/使用方法:**
1. ページにアクセスすると自動的にスキャンが開始
2. カメラにQRコードを向ける
3. 自動的に読み込まれて結果が表示される
4. スキャン停止/再開ボタンで制御可能

## 📦 使用ライブラリの比較

| 項目 | html5-qrcode | @yudiel/react-qr-scanner |
|------|--------------|--------------------------|
| 自動スキャン | ❌ 手動 | ✅ 自動 |
| 対応フォーマット | QRコード主体 | 複数形式対応 |
| 組み込みコントロール | ❌ なし | ✅ あり |
| トーチ機能 | ❌ | ✅ |
| ズーム機能 | ❌ | ✅ |
| 音声フィードバック | ❌ | ✅ |
| 細かい制御 | ✅ | 標準的 |
| バンドルサイズ | 小 | 中 |
| 学習曲線 | 中 | 低 |

## 🎨 UI/UX機能

両方の実装に共通する機能：

- 🎯 スキャン結果の表示
- 🔗 URL自動判定とリンク化
- ⚠️ エラーハンドリング
- 📱 レスポンシブデザイン（Tailwind CSS）
- 🔄 リセット機能

## 💻 技術スタック

### 共通

- **フレームワーク**: Next.js 16.0.3
- **UI ライブラリ**: React 19.2.0
- **スタイリング**: Tailwind CSS 4
- **言語**: TypeScript 5

### practice1 固有

- **QRコードライブラリ**: html5-qrcode 2.3.8

### practice2 固有

- **QRコードライブラリ**: @yudiel/react-qr-scanner 2.4.1

## 📝 実装の詳細

### html5-qrcode（practice1）

```tsx
// 基本的な使い方
const scanner = new Html5QrcodeScanner('qr-reader', config, verbose);
await scanner.render(onSuccessCallback, onErrorCallback);
```

**メリット:**
- シンプルで理解しやすい
- バンドルサイズが小さい
- 学習用に適している

**デメリット:**
- 手動でスキャン制御が必要
- QRコードのみに特化
- UIコントロールが少ない

### @yudiel/react-qr-scanner（practice2）

```tsx
// React Hooksベースの使い方
<Scanner
  onScan={handleScan}
  onError={handleError}
  constraints={{ facingMode: 'environment' }}
  components={{
    finder: true,
    torch: true,
    zoom: true,
    onOff: true,
  }}
  sound={true}
/>
```

**メリット:**
- 自動スキャンで使いやすい
- 複数バーコード形式対応
- 豊富な組み込みコントロール
- TypeScript フルサポート

**デメリット:**
- バンドルサイズがやや大きい
- 複数のポリフィルに依存

## 🔍 ブラウザサポート

### html5-qrcode

- Chrome/Edge 88+
- Firefox 90+
- Safari 14+

### @yudiel/react-qr-scanner

- Chrome/Edge 88+
- Firefox 90+ (with polyfill)
- Safari 14+ (with polyfill)
- iOS Safari 14.5+
- Chrome Mobile

## ⚠️ 重要な注意事項

### HTTPS/Localhost必須

カメラアクセスはセキュリティ上の理由により、以下の環境でのみ利用可能です：
- HTTPS環境
- localhost

開発環境では`localhost:3000`で自動的に動作します。

### モバイルブラウザの制限

一部のモバイルブラウザでは以下の制限があります：
- iOS Safari: 最初のスキャン後に音声フィードバックが再生されます
- 一部のブラウザ: トーチとズームの同時使用ができない場合があります

## 🛠️ スクリプト

各プロジェクトで利用可能なスクリプト：

```bash
# 開発サーバーの起動
npm run dev

# プロダクションビルド
npm run build

# プロダクション環境での実行
npm start

# lintチェック
npm run lint
```

## 📖 学習ポイント

このプロジェクトを通じて学べること：

1. **QRコードスキャンの2つのアプローチ**
   - 低レベルAPI（html5-qrcode）
   - 高レベルReactコンポーネント（@yudiel/react-qr-scanner）

2. **Reactコンポーネント設計**
   - クライアント側コンポーネント（'use client'）
   - ステート管理とエラーハンドリング

3. **TypeScript活用**
   - 型安全なコンポーネント実装
   - 型定義ファイルの作成

4. **Tailwind CSSでのスタイリング**
   - レスポンシブデザイン
   - ダークモードサポート

5. **Next.jsでの実装**
   - App Router
   - ディレクトリ構造

## 🔄 今後の拡張機能候補

- [ ] QRコード生成機能
- [ ] スキャン履歴の保存
- [ ] 複数バーコード同時認識
- [ ] カスタムオーバーレイ描画
- [ ] スキャン結果のエクスポート
- [ ] モバイルアプリ化（React Native）

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 👤 作成者

Created for QR code scanning practice with different React libraries.

## 🤝 コントリビューション

改善提案やバグ報告は、Issueやプルリクエストで受け付けています。

---

**最終更新**: 2025年11月23日
