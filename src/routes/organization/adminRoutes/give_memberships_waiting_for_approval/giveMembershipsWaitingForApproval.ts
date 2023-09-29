import { RequestHandler } from "express";
import { IParsedByAdminMembershipValidator } from "../../../../types/adminRoutes.js";
import mainDBPool from "../../../../utils/mainDBPool.js";
import { RowDataPacket } from "mysql2";

const giveMembershipsWaitingForApproval: RequestHandler = async (req, res) => {
  const { parsedData } = req.body as IParsedByAdminMembershipValidator;
  const { organization_id } = parsedData.relevantMembership;

  const sql = `SELECT member_id,username,full_name,email,role FROM organization_memberships INNER JOIN users USING (user_id) WHERE organization_id=? AND admin_approved='N';`;
  const values = [organization_id];

  try {
    const response = await mainDBPool.query(sql, values);
    const result = response[0] as RowDataPacket;
    res.status(200).json({ membershipsWaitingForApproval: result });
  } catch (error) {
    console.log(error);
    res.status(500).json(error); //set to unknown error
  }
};

export default giveMembershipsWaitingForApproval;
