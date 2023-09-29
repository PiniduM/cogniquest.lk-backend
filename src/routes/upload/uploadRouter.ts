import { Router } from "express";
import fileUploadTokenValidator from "../../middlewhere/validators/fileUploadTokenValidator.js";
import uploadApplicationForm from "./uploadApplicationForm/uploadApplicationForm.js";
import uploadProjectFile from "./uploadProjectFile/uploadProjectFile.js";

const uploadRouter = Router();
uploadRouter.use("/", fileUploadTokenValidator);

uploadRouter.post("/application_form", uploadApplicationForm);

uploadRouter.post("/project_file", uploadProjectFile);

export default uploadRouter;
