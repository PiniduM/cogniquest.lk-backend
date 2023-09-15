import { RequestHandler } from "express";
import mainDBPool from "../../../utils/mainDBPool.js";
import { RowDataPacket } from "mysql2";
import signJWT from "../../../utils/signJWT.js";

const giveManagementToken: RequestHandler = async (req, res) => {
  const data = req.body;

  const { username, password } = data;

  if (!(username && password)) {
    res.status(406).json("invalid_data");
    return;
  }

  const sql = `SELECT management_id from management WHERE username=? AND password =? LIMIT 1;`;
  const values = [username, password];

  try {
    const response = (await mainDBPool.query(sql, values)) as RowDataPacket;
    const result = response[0];
    const row = result[0];
    if (!row) {
      res.status(401).json("No account");
      return;
    }
    const payload = {
      management_id: row.management_id,
      type: "managementToken",
    };
    const managementToken = signJWT(payload, "5d");
    res.status(200).json({ managementToken });
  } catch (error) {
    console.log(error);
    res.status(500).json(error); // handle error / no time
  }
};
export default giveManagementToken;
