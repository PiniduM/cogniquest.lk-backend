import { RequestHandler } from "express";
import { UploadApplicationFomReqBody } from "../../../types/uploadRoutes.js";
import destinations from "../utils/destinations.js";
import uploadFile from "../utils/uploadFile.js";

const uploadProjectFile: RequestHandler = async (req, res) => {
  const { parsedData } = req.body as UploadApplicationFomReqBody;

  const { fileUploadData } = parsedData;

  const { fileName, contentType, maxSize, validFileTypes } = fileUploadData;
  console.log(fileUploadData);
  if (contentType !== "project_file") {
    res.status(401).json("token mismatch");
    return;
  }
  const destination = destinations["project_file"];
  const uploadInfo = {
    destination,
    fileName,
    maxSize,
    validFileTypes,
  };

  try {
    uploadFile(req, uploadInfo);
    res.status(200).json('file_uploaded')
  } catch (error) {
    console.log(error);
    res.status(500).json("unexpected_error");
  }
};

export default uploadProjectFile;