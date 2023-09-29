import { Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";

interface IUploadInfo {
  destination: string;
  fileName: string;
  maxSize: number;
  validFileTypes: string[];
}

const uploadFile = (req: Request, UploadInfo: IUploadInfo) => {
  const { destination, fileName, validFileTypes, maxSize } = UploadInfo;

  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, destination);
    },
    filename: (req, file, callback) => {
      const fileExtension = path.extname(file.originalname);
      callback(null, fileName+fileExtension);
    },
  });
  const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback
  ) => {
    console.log(file);
    const fileExtension = path.extname(file.originalname);
    const validFileExtensions = validFileTypes;
    //can validate with mime type but this is more straightforward and universal. Implement mimetype validator if necessary
    if (!validFileExtensions.includes(fileExtension || "")) {
      callback(null, false);
      callback(new Error("invalid_file_extension"));
    } else {
      callback(null, true);
    }
  };
  const limits: multer.Options["limits"] = { fieldSize: maxSize };

  const upload = multer({ storage: storage, fileFilter, limits });

  const uploader = upload.single("file");
  try {
    uploader(req, {} as Response, (error) => {
      console.log(error);
    });
    console.log("try completed");
  } catch (error) {
    console.log("at catcher");
    console.log(error);
  }
};

export default uploadFile;
