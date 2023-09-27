import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/temp/application_forms/");
  },
  filename: function (req, file, cb) {
    const { competition_title: competitionTitle } = req.body;
    cb(null, `${competitionTitle} application form.pdf`);
  },
});
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
) => {
  const fileExtension = path.extname(file.originalname);
  const validFileExtensions = [".pdf"];
  //can validate with mime type but this is more straightforward and universal. Implement mimetype validator if necessary
  if (!validFileExtensions.includes(fileExtension || "")) {
    callback(null, false);
    callback(new Error("invalid_file_extension"));
  }
};

const upload = multer({ storage: storage, fileFilter });

export const applicationFormExtractor = upload.single("application_form");
