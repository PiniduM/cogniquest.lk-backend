import { RowDataPacket } from "mysql2";
import mainDBPool from "../../../../utils/mainDBPool.js";

const giveApplicationStatus = async (
  competitionId: string,
  candidateId: string
) => {
  const sql = `SELECT application_id,applied_time,approved FROM applications WHERE competition_id=? AND candidate_id=? LIMIT 1;`;
  const values = [competitionId, candidateId];

  try {
    const response = (await mainDBPool.query(sql, values)) as RowDataPacket;
    const result = response[0];
    const row = result[0];
    if (!row) {
      return null;
    } else {
      const { application_id, applied_time, approved } = row;
      return {
        applicationId: application_id,
        appliedTime: applied_time,
        approved,
      };
    }
  } catch (error) {
    console.log(error);
    return null;
    //handle --later
  }
};

export default giveApplicationStatus;
