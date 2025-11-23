'use client';

import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode, Html5QrcodeScanner } from 'html5-qrcode';

export default function QRCodeReader() {
  const [scannedData, setScannedData] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const qrCodeRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    };

    const scanner = new Html5QrcodeScanner(
      'qr-reader',
      config,
      false
    );

    qrCodeRef.current = scanner;

    return () => {
      // クリーンアップ
      if (qrCodeRef.current) {
        qrCodeRef.current.clear().catch(() => {});
      }
    };
  }, []);

  const handleStartScanning = async () => {
    try {
      setError('');
      setScannedData('');
      if (qrCodeRef.current) {
        await qrCodeRef.current.render(
          (decodedText: string) => {
            setScannedData(decodedText);
            setError('');
          },
          () => {}
        );
        setIsScanning(true);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'エラーが発生しました';
      setError(`スキャン開始エラー: ${errorMessage}`);
      setIsScanning(false);
    }
  };

  const handleStopScanning = async () => {
    try {
      if (qrCodeRef.current) {
        await qrCodeRef.current.clear();
        setIsScanning(false);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'エラーが発生しました';
      setError(`スキャン停止エラー: ${errorMessage}`);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          QRコードリーダー
        </h1>

        <div className="mb-6 flex gap-4 justify-center">
          <button
            onClick={handleStartScanning}
            disabled={isScanning}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            スキャン開始
          </button>
          <button
            onClick={handleStopScanning}
            disabled={!isScanning}
            className="px-6 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            スキャン停止
          </button>
        </div>

        {/* QRコードリーダー表示エリア */}
        <div
          id="qr-reader"
          className="bg-gray-100 rounded-lg overflow-hidden mb-6"
          style={{ minHeight: '300px' }}
        />

        {/* エラー表示 */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <p className="font-semibold">エラー</p>
            <p>{error}</p>
          </div>
        )}

        {/* スキャン結果表示 */}
        {scannedData && (
          <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            <p className="font-semibold mb-2">スキャン結果:</p>
            <p className="break-all text-sm">{scannedData}</p>
            <a
              href={scannedData}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
            >
              リンクを開く
            </a>
          </div>
        )}

        {/* 情報 */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-gray-600">
            💡 スキャン開始ボタンをクリックしてから、QRコードを読み取ってください。
          </p>
        </div>
      </div>
    </div>
  );
}
