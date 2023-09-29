import { RowDataPacket } from "mysql2";
import mainDBPool from "../../../../utils/mainDBPool.js";

const giveProjectSubmissionStatus = async (
  competitionId: string,
  candidateId: string
) => {
  const sql = `SELECT submitted_time FROM project_submissions INNER JOIN applications WHERE competition_id=? AND candidate_id=? LIMIT 1`;
  const values = [competitionId, candidateId];

  try {
    const reponse = (await mainDBPool.query(sql, values)) as RowDataPacket;
    const result = reponse[0];
    const row = result[0];
    if (!row) {
      return null;
    }

    const { submitted_time } = row;
    return {
      submittedTime: submitted_time,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default giveProjectSubmissionStatus;
