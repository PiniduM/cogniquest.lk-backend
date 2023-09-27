import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/temp/submitted_projects/");
  },
  filename: (req, file, callback) => {
    const data = req.body;
    console.log(data);
    const { competition_id } = req.body;
    const fileExtension = path.extname(file.originalname) || ".zip";
    callback(null, `${competition_id}_project_file.${fileExtension}`);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
) => {
  const fileExtension = path.extname(file.originalname);
  const validFileExtensions = [".rar", ".zip"];
  //can validate with mime type but this is more straightforward and universal. Implement mimetype validator if necessary
  if (!validFileExtensions.includes(fileExtension || "")) {
    callback(null, false);
    callback(new Error("invalid_file_extension"));
  }
};

const upload = multer({ storage, fileFilter });

const projectSubmissionRequestParser = upload.single("project_file");

export default projectSubmissionRequestParser;
