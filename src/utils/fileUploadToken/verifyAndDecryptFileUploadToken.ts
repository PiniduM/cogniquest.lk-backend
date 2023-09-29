import { fileUploadTokenPayload } from "../../types/global.js";
import verifyAndDecodeJWT from "../verifyAndDecodeJWT.js";

const verifyAndDecryptFileUploadToken = (fileUploadToken: string) => {
  const payload = verifyAndDecodeJWT(fileUploadToken) as
    | fileUploadTokenPayload
    | false;
  if (!payload) return false;

  const { fileName, contentType, maxSize, validFileTypes } = payload;
  const decryptedPaylod = {
    fileName,
    contentType,
    maxSize: JSON.parse(maxSize) as number,
    validFileTypes: JSON.parse(validFileTypes) as string[],
  };

  return decryptedPaylod;
};

export default verifyAndDecryptFileUploadToken;
