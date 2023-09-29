import { RowDataPacket } from "mysql2";
import mainDBPool from "../../../utils/mainDBPool.js";
import { RequestHandler } from "express";
import { TGiveParticipationStatusReqBody } from "../../../types/candidateRoutes.js";

const giveApplicationStatus: RequestHandler = async (req, res) => {
  const { candidateData, competitionId } =
    req.body as TGiveParticipationStatusReqBody;
  const { candidateId } = candidateData;

  const sql = `SELECT application_id,approved from applications WHERE competition_id=? AND candidate_id=? LIMIT 1;`;
  const values = [competitionId, candidateId];

  const response = (await mainDBPool.query(sql, values)) as RowDataPacket;
  const rows = response[0];
  const row = rows[0];
  if (!row) {
    res.status(200).json({ status: "no_application" });
  }
  const { application_id, approved } = row;
  if (!approved) {
    res.status(200).json({ status: "not_approved" });
  } else {
    res.status(200).json({ status: "approved", applicationId: application_id });
    return;
  }
};

export default giveApplicationStatus;
