import fs from "fs";

import { RequestHandler } from "express";
import { TSubmitNewCompetition } from "../../../types/reqBodies.js";
import { IMembership } from "../../../types/commonInterfaces.js";
import mainDBPool from "../../../utils/mainDBPool.js";
import { ErrorPacketParams, ResultSetHeader } from "mysql2";

const submitNewCompetition: RequestHandler = async (req, res) => {
  //   console.log(req.body);
  //   console.log(req.file);
  const data = req.body as TSubmitNewCompetition;
  const applicationFormPDF = req.file;
  const deleteApplicationForm = async () => {
    const filePath = applicationFormPDF?.path;
    filePath && fs.unlinkSync(filePath);
  };
  const {
    organization_id,
    competition_title,
    description,
    accessibility,
    parsedData: userData,
  } = data;

  const { validMemberships } = userData;
  console.log(validMemberships);
  let relevent_membership;
  validMemberships.forEach((membership) => {
    if (membership.organization_id == organization_id) {
      relevent_membership = membership;
    }
  });
  //one membership for a one user in a specific organization (limited in db)
  if (!relevent_membership) {
    res.status(401).json("unauthorized");
    deleteApplicationForm();
    return;
  }

  const adminApproved =
    (relevent_membership as IMembership).role === "admin" ? "Y" : "N";

  const accessibilityParsed = JSON.parse(accessibility);
  const { type: accessibilityType } = accessibilityParsed;
  //   const passcodeProtected = accessibilityType === "passcode-protected";
  const competitionLink = `${
    process.env.CLIENT_DOMAIN
  }/competitions/${competition_title.replace(" ", "_").toLowerCase()}`;
  const applicationFormLink = `${
    process.env.CLIENT_DOMAIN
  }/competitions/application_forms/${competition_title
    .replace(" ", "_")
    .toLowerCase()}`;

  const sql = `INSERT INTO competitions 
  (organization_id,competition_title,description,accessibility,passcode,competition_link, status,admin_approved,application_form_link) 
   VALUES ( ?,?,?,?,?,?,?,?,?);`;
  const values = [
    organization_id,
    competition_title,
    description,
    accessibilityType,
    accessibilityParsed.passcode || null,
    competitionLink,
    "pending",
    adminApproved,
    applicationFormLink,
  ];
  try {
    const response = (await mainDBPool.query(sql, values)) as ResultSetHeader[];
    console.log(response);
    const result = response[0];
    res.status(200).json("competition_submitted");
  } catch (err) {
    const error = err as ErrorPacketParams;
    console.log(error);
    if (error?.code === "ER_DUP_ENTRY") res.status(406).json("duplicate_title");
    else res.status(500).json("unknown_error");
  }
};

export default submitNewCompetition;
