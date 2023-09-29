export interface fileUploadTokenPayload {
  fileName: string;
  contentType: string;
  maxSize: string;
  validFileTypes: string;
}

export interface IParsedFileUploadTokenPayload {
  fileName: string;
  contentType: string;
  maxSize: number;
  validFileTypes: string[];
}
