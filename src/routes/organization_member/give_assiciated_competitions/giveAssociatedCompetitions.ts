import { RequestHandler } from "express";
import mainDBPool from "../../../utils/mainDBPool.js";
import { RowDataPacket } from "mysql2";
import { TGiveAssociatedCompetitionsReqBody } from "../../../types/organizationMemberRoutes.js";

const giveAssociatedCompetitions: RequestHandler = async (req, res) => {
  const data = req.body as TGiveAssociatedCompetitionsReqBody;
  console.log(data.parsedData);
  const { userId, validMemberships } = data.parsedData;

  const accessibleOrganizationIds = validMemberships.map(
    (membership) => membership.organization_id
  );
  const filteringSet = `(${accessibleOrganizationIds.join(",")})`;
  const sql = `SELECT competition_id,competition_title,accessibility,status,organization_name FROM organizations INNER JOIN competitions USING (organization_id) WHERE organization_id IN ${filteringSet};`;
  const values = [userId];

  try {
    const response = (await mainDBPool.query(sql, values)) as RowDataPacket;
    const rows = response[0];
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("unknown_error");
  }
};

export default giveAssociatedCompetitions;
