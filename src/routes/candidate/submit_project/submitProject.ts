import { Request, Response } from "express";
import { TSubmitProjectReqBody } from "../../../types/candidateRoutes.js";
import verifyApplication from "./utils/verifyApplication.js";
import mainDBPool from "../../../utils/mainDBPool.js";
import { ResultSetHeader, ErrorPacketParams } from "mysql2";
import sendUnexpectedErrorResponse from "../../../utils/sendUnexpectedErrorResponse.js";
import generateFileUploadToken from "../../../utils/fileUploadToken/generateFileUploadToken.js";

const submitProject = async (req: Request, res: Response) => {
  const { candidateData, applicationId } = req.body as TSubmitProjectReqBody;
  const { candidateId } = candidateData;

  try {
    //check wether the application is valida and this reqest is made by the candidate who submitted the application;
    const validAppliation = await verifyApplication(applicationId, candidateId);
    if (!validAppliation) {
      res.status(401).json("not a valid application_id");
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("application_verification_error");
    return;
  }

  const projectFileName = `application_id_${applicationId}_project_file`;
  const assetPath = `/upload/projects/${projectFileName}`;

  const sql = `INSERT INTO project_submissions (application_id,asset_path) VALUES(?,?);`;
  const values = [applicationId, assetPath];
  try {
    const response = await mainDBPool.query(sql, values);
    const result = response[0] as ResultSetHeader;
    if (result.affectedRows === 1) {
      const contentType = "project_file";
      const maxSize = 50;
      const validFileTypes = [".zip", ".rar"];
      const lifetime = "1h";
      const projectFileUploadToken = generateFileUploadToken(
        projectFileName,
        contentType,
        maxSize,
        validFileTypes,
        lifetime
      );
      res.status(200).json({ projectFileUploadToken });
      return;
    } else {
      sendUnexpectedErrorResponse(res);
      return;
    }
  } catch (err) {
    const error = err as ErrorPacketParams;
    if (error.code === "ER_DUP_ENTRY") {
      res.status(409).json("alredy_submitted_a_project");
    } else {
      //no need to handle asset path error since it can only happen due to a client mistake
      sendUnexpectedErrorResponse(res);
    }
  }
};

export default submitProject;
