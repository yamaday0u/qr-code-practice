'use client';

import { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import type { IDetectedBarcode } from '@yudiel/react-qr-scanner';

export default function QRCodeReader() {
  const [scannedData, setScannedData] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const handleScan = (detectedCodes: IDetectedBarcode[]) => {
    if (detectedCodes.length > 0) {
      const result = detectedCodes[0].rawValue;
      setScannedData(result);
      setError('');
    }
  };

  const handleError = (error: unknown) => {
    const errorMessage = error instanceof Error ? error.message : '不明なエラーが発生しました';
    setError(`スキャンエラー: ${errorMessage}`);
  };

  const resetScan = () => {
    setScannedData('');
    setError('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          QRコードリーダー
        </h1>

        {isScanning && (
          <div className="mb-6">
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <Scanner
                onScan={handleScan}
                onError={handleError}
                constraints={{
                  facingMode: 'environment',
                  width: { ideal: 1280 },
                  height: { ideal: 720 },
                }}
                components={{
                  finder: true,
                  torch: true,
                  zoom: true,
                  onOff: true,
                }}
                sound={true}
              />
            </div>
          </div>
        )}

        <div className="mb-6 flex gap-4 justify-center">
          <button
            onClick={() => setIsScanning(!isScanning)}
            className={`px-6 py-2 text-white rounded-lg font-semibold transition-colors ${
              isScanning
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isScanning ? 'スキャン停止' : 'スキャン再開'}
          </button>
          {scannedData && (
            <button
              onClick={resetScan}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            >
              リセット
            </button>
          )}
        </div>

        {/* エラー表示 */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <p className="font-semibold">エラー</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* スキャン結果表示 */}
        {scannedData && (
          <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            <p className="font-semibold mb-2">スキャン結果:</p>
            <p className="break-all text-sm mb-3 bg-white p-2 rounded text-gray-800">
              {scannedData}
            </p>
            {scannedData.startsWith('http') && (
              <a
                href={scannedData}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
              >
                リンクを開く
              </a>
            )}
          </div>
        )}

        {/* 情報 */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-gray-600">
            💡 QRコードをカメラに向けると自動的に読み込まれます。
          </p>
        </div>
      </div>
    </div>
  );
}
