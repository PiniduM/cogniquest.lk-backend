import signJWT from "../signJWT.js";

const generateFileUploadToken = (
  fileName: string,
  contentType: string,
  maxSizeInMB: number,
  validFileTypes: string[] | string = "any",
  lifetime: string = "1h"
) => {
  const payload = {
    fileName,
    contentType,
    maxSize: JSON.stringify(maxSizeInMB * 1024),
    validFileTypes: JSON.stringify(validFileTypes),
  };
  return signJWT(payload, lifetime);
};

export default generateFileUploadToken;
