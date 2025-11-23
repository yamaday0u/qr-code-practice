declare module 'html5-qrcode' {
  export interface Html5QrcodeConfig {
    fps?: number;
    qrbox?: { width: number; height: number };
    aspectRatio?: number;
    disableFlip?: boolean;
  }

  export class Html5Qrcode {
    constructor(elementId: string, config?: Html5QrcodeConfig);
    start(
      constraints: MediaStreamConstraints,
      config: Html5QrcodeConfig,
      qrCodeSuccessCallback: (decodedText: string) => void,
      qrCodeErrorCallback: (error: string) => void
    ): Promise<void>;
    stop(): Promise<void>;
    getState(): number;
    scanFile(
      imageFile: File,
      showImage?: boolean
    ): Promise<string>;
  }

  export class Html5QrcodeScanner {
    constructor(
      elementId: string,
      config: Html5QrcodeConfig,
      verbose?: boolean
    );
    render(
      qrCodeSuccessCallback: (decodedText: string) => void,
      qrCodeErrorCallback: (error: string) => void
    ): Promise<void>;
    clear(): Promise<void>;
    getState(): number;
  }

  export const Html5QrcodeSupportedFormats: {
    QR_CODE: number;
    AZTEC: number;
    CODABAR: number;
    CODE_39: number;
    CODE_93: number;
    CODE_128: number;
    DATA_MATRIX: number;
    MAXICODE: number;
    ITF: number;
    EAN_13: number;
    EAN_8: number;
    PDF_417: number;
    RSS_14: number;
    RSS_EXPANDED: number;
    UPC_A: number;
    UPC_E: number;
    UPC_EAN_EXTENSION: number;
  };
}
