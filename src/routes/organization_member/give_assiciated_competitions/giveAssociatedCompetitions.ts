import { RequestHandler } from "express";
import mainDBPool from "../../../utils/mainDBPool.js";
import { RowDataPacket } from "mysql2";

const giveAssociatedCompetitions: RequestHandler = async (req, res) => {
  const { userId } = req.body.userData;


  const sql = `SELECT competition_id,title,accessibility,'status',organization_name FROM
    ((SELECT organization_id FROM hosting_staff WHERE user_id=?) AS orgids
    INNER JOIN organizations USING (organization_id) )
    INNER JOIN competitions USING (organization_id);`;
  const values = [userId];

  try {
    const response = await mainDBPool.query(sql, values) as RowDataPacket;
    const rows = response[0];
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send("unknown_error");
  }
};

export default giveAssociatedCompetitions;
