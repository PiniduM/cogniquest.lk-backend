import { RequestHandler } from "express";

import mainDBPool from "../../../utils/mainDBPool.js";
import { RowDataPacket } from "mysql2";
import giveParticipationStatus from "./utils/giveParticipationStatus.js";
import { TGiveCompetitionReqBody } from "../../../types/candidateRoutes.js";

const giveCompetition: RequestHandler = async (req, res) => {
  const { competitionId, candidateData } = req.body as TGiveCompetitionReqBody;
  const { candidateId } = candidateData;

  if (!competitionId) {
    res.status(406).send("invalid_competition_id");
    return;
  }

  const sql =
    "SELECT competition_id,competition_title,accessibility,description,assest_type FROM competitions WHERE competition_id = ?";
  const values = [competitionId];
  try {
    const response = (await mainDBPool.query(sql, values)) as RowDataPacket;
    const result = response[0];
    const row = result[0];
    console.log(response);
    const participationStatus = await giveParticipationStatus(
      competitionId,
      candidateId
    );
    const data = { competition: row, participationStatus };
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json("unknown_error");
  }
};

export default giveCompetition;
