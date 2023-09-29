import fs from "fs";

import { RequestHandler } from "express";
import { TSubmitNewCompetitionReqBody } from "../../../types/organizationRoutes.js";
import mainDBPool from "../../../utils/mainDBPool.js";
import { ErrorPacketParams, ResultSetHeader } from "mysql2";
import generateFileUploadToken from "../../../utils/fileUploadToken/generateFileUploadToken.js";

const submitNewCompetition: RequestHandler = async (req, res) => {
  const {
    organizationId,
    competitionTitle,
    description,
    accessibilityObject,
    applicationFormPresent,
    parsedData,
  } = req.body as TSubmitNewCompetitionReqBody;

  const { relevantMembership } = parsedData ;

  const adminApproved = relevantMembership.role === "admin" ? "Y" : "N";

  const competitionLink = `${
    process.env.CLIENT_DOMAIN
  }/competitions/${competitionTitle.replace(" ", "_").toLowerCase()}`;
  const applicationFormFileName = `${competitionTitle} application form.pdf`;
  const applicationFormLink = applicationFormPresent
    ? `${process.env.CLIENT_DOMAIN}/competitions/application_forms/${applicationFormFileName}`
    : null;

  const sql = `INSERT INTO competitions 
  (organization_id,competition_title,description,accessibility,passcode,competition_link, status,admin_approved,application_form_link) 
   VALUES ( ?,?,?,?,?,?,?,?,?);`;
  const values = [
    organizationId,
    competitionTitle,
    description,
    accessibilityObject.type,
    accessibilityObject.passcode || null,
    competitionLink,
    "pending",
    adminApproved,
    applicationFormLink,
  ];
  try {
    const response = (await mainDBPool.query(sql, values)) as ResultSetHeader[];
    console.log(response);
    if (applicationFormPresent) {
      const applicationFormUploadToken = generateFileUploadToken(
        applicationFormFileName,
        "application_form",
        50,
        [".pdf"]
      );
      res.status(200).json({ applicationFormUploadToken });
    } else {
      res.status(200).json("competition_submitted");
    }
  } catch (err) {
    const error = err as ErrorPacketParams;
    console.log(error);
    if (error?.code === "ER_DUP_ENTRY") res.status(406).json("duplicate_title");
    else res.status(500).json("unknown_error");
  }
};

export default submitNewCompetition;
