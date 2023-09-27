import { RequestHandler } from "express";
import mainDBPool from "../../../../utils/mainDBPool.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { TGiveCompetitionsWaitingForApprovalReqBody } from "../../../../types/adminRoutes.js";

const giveCompetitionsWaitingForApproval: RequestHandler = async (req, res) => {
  const { parsedData } = req.body as TGiveCompetitionsWaitingForApprovalReqBody;
  const { organizationMembership } = parsedData;
  const { organization_id } = organizationMembership;

  const sql = `SELECT competition_id,competition_title,accessibility,status,organization_name FROM organizations INNER JOIN competitions USING (organization_id) WHERE organization_id=? AND admin_approved='N';`;
  const values = [organization_id];
  try {
    const response = (await mainDBPool.query(sql, values)) as RowDataPacket;
    const result = response[0];
    res.status(200).json({ competitions: result });
  } catch (error) {
    console.log(error);
    res.status(500).json("unknown_error");
  }
};

export default giveCompetitionsWaitingForApproval;
