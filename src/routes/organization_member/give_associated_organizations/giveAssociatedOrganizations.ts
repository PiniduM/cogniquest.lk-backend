import { RequestHandler } from "express";
import { TGiveAssociatedOrganizations } from "../../../types/reqBodies.js";
import mainDBPool from "../../../utils/mainDBPool.js";
import { RowDataPacket } from "mysql2";

const giveAssociatedOrganizations: RequestHandler = async (req, res) => {
  const data = req.body as TGiveAssociatedOrganizations;

  const { associatedOrganizationIds } = data;

  const Filteringvalues = `(${associatedOrganizationIds.join(",")})`;

  const sql = `SELECT organization_id,organization_name FROM organizations WHERE organization_id IN ${Filteringvalues}`;

  try {
    const response = await mainDBPool.query(sql) as RowDataPacket;
    const result = response[0];
    res.status(200).json({ associatedOrganizations: result });
  } catch (error) {
    console.log(error);
    res.status(501).json("unknown_error");
  }
};

export default giveAssociatedOrganizations;
