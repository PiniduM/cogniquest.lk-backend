import { RequestHandler } from "express";
import { TGiveCompetitionsWaitingForApproval } from "../../../../types/reqBodies.js";
import mainDBPool from "../../../../utils/mainDBPool.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";

const giveCompetitionssWaitingForApproval: RequestHandler = async (
  req,
  res
) => {
  const data = req.body as TGiveCompetitionsWaitingForApproval;
  const { valid_memberships } = data.userData;

  const adminMemberships = valid_memberships.filter(
    (membership) => membership.role === "admin"
  );
  if (adminMemberships.length < 1) {
    res.status(200).json({ competitions: [] });
    return;
  }
  const ApprovableOrganizations = adminMemberships.map(
    (membership) => membership.organization_id
  );

  const filteringSet = `(${ApprovableOrganizations.join(",")})`;

  const sql = `SELECT competition_id,competition_title,accessibility,status,organization_name FROM organizations INNER JOIN competitions USING (organization_id) WHERE organization_id IN ${filteringSet} AND admin_approved='N';`;
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
