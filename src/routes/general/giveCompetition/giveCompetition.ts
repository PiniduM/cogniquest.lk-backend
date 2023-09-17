import { RequestHandler } from "express";
import { TGiveCompetition } from "../../../types/reqBodies.js";

import mainDBPool from "../../../utils/mainDBPool.js";
import { RowDataPacket } from "mysql2";

const giveCompetition: RequestHandler = async (req, res) => {
  const { competition_id } = req.body as TGiveCompetition;

  if(!competition_id) {
    res.status(406).send('invalid_competition_id');
    return;
  }


  const sql = "SELECT competition_id,competition_title,accessibility,description,assest_type FROM competitions WHERE competition_id = ?";
  const values = [competition_id];
  try {
    const response = (await mainDBPool.query(sql, values)) as RowDataPacket;
    const result = response[0];
    console.log(response)
    const data = { competition: result[0] };
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json("unknown_error");
  }
};

export default giveCompetition;