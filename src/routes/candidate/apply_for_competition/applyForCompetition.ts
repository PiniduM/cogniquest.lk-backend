import { RequestHandler } from "express";
import { TApplyForCompetitionReqBody } from "../../../types/candidateRoutes.js";
import mainDBPool from "../../../utils/mainDBPool.js";
import { ErrorPacketParams } from "mysql2";

const applyForCompetition: RequestHandler = async (req, res) => {
  const { candidateData, competitionId } =
    req.body as TApplyForCompetitionReqBody;

  if (!competitionId) {
    res.status(406).json("no_competition_id");
    return;
  }

  const { candidateId } = candidateData;

  const sql = `INSERT INTO applications (competition_id,candidate_id) VALUES (?,?)`;
  const values = [competitionId, candidateId];

  try {
    const response = await mainDBPool.query(sql, values);
    res.status(200).send("applied_succesfuly");
  } catch (err) {
    const error = err as ErrorPacketParams;
    if (error.code === "ER_DUP_ENTRY") {
      res.status(409).json("already_applied");
    } else {
      res.status(500).json("unexpected error");
    }
  }
};

export default applyForCompetition;
