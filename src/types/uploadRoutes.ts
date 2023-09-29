import { JwtPayload } from "jsonwebtoken";
import { IParsedFileUploadTokenPayload } from "./global.js";

export interface parsedByFileUploadTokenValidator {
  parsedData: {
    fileUploadData: IParsedFileUploadTokenPayload & JwtPayload;
  };
}


export type UploadApplicationFomReqBody = parsedByFileUploadTokenValidator;