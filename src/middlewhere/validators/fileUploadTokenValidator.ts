import { NextFunction, Request, Response } from "express";
import validateAndCleanAuthorizationToken from "../../utils/validateAndCleanAuthorizationToken.js";
import {
  IParsedFileUploadTokenPayload,
  fileUploadTokenPayload,
} from "../../types/global.js";
import verifyAndDecodeJWT from "../../utils/verifyAndDecodeJWT.js";

const fileUploadTokenValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const fileUploadToken = validateAndCleanAuthorizationToken(req);
  if (!fileUploadToken) {
    res.status(401).json("no_file_upload_token");
    return;
  }

  const parsedFileUploadData = verifyAndDecodeJWT(fileUploadToken);

  if (!parsedFileUploadData || !parsedFileUploadData.fileName) {
    res.status(401).json("invalid_file_upload_token");
    return;
  }

  const parsedData = req.body.parsedData;
  if (parsedData) {
    parsedData.fileUploadData = parsedFileUploadData;
  } else {
    const parsedData = {
      fileUploadData: parsedFileUploadData,
    };
    req.body.parsedData = parsedData;
  }
  next();
};

export default fileUploadTokenValidator;
