import { RequestHandler } from "express";
import { TGiveCompetition } from "../../../types/reqBodies.js";
import giveOrganizationId from "../functions/giveOrganizationId.js";
import mainDBPool from "../../../utils/mainDBPool.js";
import { RowDataPacket } from "mysql2";

const giveCompetition: RequestHandler = async (req, res) => {
  const { competition_id, userData } = req.body as TGiveCompetition;

  const organization_id = await giveOrganizationId(competition_id);
  if (!organization_id) {
    res.status(406).json("invalid_competition_id");
    return;
  }

  const { valid_memberships } = userData;
  let accessible = false;
  valid_memberships.forEach((membership) => {
    if (membership.organization_id === organization_id) accessible = true;
  });

  if (!accessible) {
    res.status(401).json("unauthorized");
    return;
  }

  const sql = "SELECT * FROM competitions WHERE competition_id = ?";
  const values = [competition_id];
  try {
    const response = (await mainDBPool.query(sql, values)) as RowDataPacket;
    const result = response[0];
    const data = { competition: result[0] };
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json("unknown_error");
  }
};

export default giveCompetition;