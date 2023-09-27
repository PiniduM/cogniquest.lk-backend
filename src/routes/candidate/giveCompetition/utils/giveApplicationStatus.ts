import { RowDataPacket } from "mysql2";
import mainDBPool from "../../../../utils/mainDBPool.js";

const giveApplicationStatus = async (
  competitionId: string,
  candidateId: string
) => {
  const sql = `SELECT applied_time,approved FROM applications WHERE competiton_id=? AND candidate_id=? LIMIT 1;`;
  const values = [competitionId, candidateId];

  try {
    const response = (await mainDBPool.query(sql, values)) as RowDataPacket;
    const result = response[0];
    const row = result[0];
    if (!row) {
      return null;
    } else {
      const { applied_time, approved } = row;
      return {
        applidTime: applied_time,
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