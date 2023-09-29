import { RequestHandler } from "express";
import { UploadApplicationFomReqBody } from "../../../types/uploadRoutes.js";
import destinations from "../utils/destinations.js";
import uploadFile from "../utils/uploadFile.js";

const uploadApplicationForm: RequestHandler = async (req, res) => {
  const { parsedData } = req.body as UploadApplicationFomReqBody;

  const { fileUploadData } = parsedData;

  const { fileName, contentType, maxSize, validFileTypes } = fileUploadData;
  if (contentType !== "application_form") {
    res.status(401).json("token mismatch");
    return;
  }
  const destination = destinations["application_form"];
  const uploadInfo = {
    destination,
    fileName,
    maxSize,
    validFileTypes,
  };

  try {
    uploadFile(req, uploadInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json("unexpected_error");
  }
};

export default uploadApplicationForm;
