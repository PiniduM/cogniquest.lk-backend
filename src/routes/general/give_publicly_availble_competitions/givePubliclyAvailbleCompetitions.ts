import { RequestHandler } from "express";
import mainDBPool from "../../../utils/mainDBPool.js";

const givePubliclyAvailbleCompetitions: RequestHandler = async (req, res) => {
  const data = req.body;

  const sql = `SELECT competition_id,competition_title,accessibility,status,organization_name FROM competitions INNER JOIN organizations USING (organization_id) WHERE accessibility='public' AND system_approved='Y'`;

  try {
    const response = await mainDBPool.query(sql);
    const result = response[0];
    res.status(200).json({ competitions: result });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export default givePubliclyAvailbleCompetitions;