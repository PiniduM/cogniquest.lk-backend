import { RequestHandler } from "express";
import mainDBPool from "../../../utils/mainDBPool.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import verifyAndDecodeJWT from "../../../utils/verifyAndDecodeJWT.js";

const giveCompetitionssWaitingForApproval: RequestHandler = async (
  req,
  res
) => {

  const sql = `SELECT competition_id,competition_title,accessibility,status,organization_name FROM organizations INNER JOIN competitions USING (organization_id) WHERE system_approved='N' AND admin_approved='Y';`;
  try {
    const response = (await mainDBPool.query(sql)) as RowDataPacket;
    const result = response[0];
    res.status(200).json({ competitions: result });
  } catch (error) {
    console.log(error);
    res.status(500).json("unknown_error");
  }
};

export default giveCompetitionssWaitingForApproval;
