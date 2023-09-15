import { RequestHandler } from "express";
import mainDBPool from "../../../utils/mainDBPool.js";
import { RowDataPacket } from "mysql2";
import { TGiveAssociatedCompetitions } from "../../../types/reqBodies.js";

const giveAssociatedCompetitions: RequestHandler = async (req, res) => {
  const data = req.body as TGiveAssociatedCompetitions;
  const { user_id, valid_memberships } = data.userData;

  // const sql = `SELECT competition_id,title,accessibility,'status',organization_name FROM
  //   ((SELECT organization_id FROM organization_memberships WHERE user_id=?) AS orgids
  //   INNER JOIN organizations USING (organization_id) )
  //   INNER JOIN competitions USING (organization_id);`;
  const accessibleOrganizationIds = valid_memberships.map(
    (membership) => membership.organization_id
  );
  const filteringSet = `(${accessibleOrganizationIds.join(",")})`;
  const sql = `SELECT competition_id,competition_title,accessibility,status,organization_name FROM organizations INNER JOIN competitions USING (organization_id) WHERE organization_id IN ${filteringSet};`;
  const values = [user_id];

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
