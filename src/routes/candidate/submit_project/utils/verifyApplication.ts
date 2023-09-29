import { RowDataPacket } from "mysql2";
import mainDBPool from "../../../../utils/mainDBPool.js";

const verifyApplication = async (
  applicationId: string,
  candidateId: string
) => {
  const sql = `SELECT approved from applications WHERE application_id=? AND candidate_id=? LIMIT 1;`;
  const values = [applicationId, candidateId];

  const response = (await mainDBPool.query(sql, values)) as RowDataPacket;
  const rows = response[0];
  const row = rows[0];
  const { approved } = row;
  if (approved === "Y") return true;
  else return false;
};

export default verifyApplication;
