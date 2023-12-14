import { RequestHandler } from "express";
import { TSetupCandidateAccountReqBody } from "../../../types/authenticationRoutes.js";
import {
  BirthDateRegex,
  validOccupations,
} from "../../../validators/validators.js";
import mainDBPool from "../../../utils/mainDBPool.js";
import { ResultSetHeader } from "mysql2";

const setupCandidateAccount: RequestHandler = async (req, res) => {
  const { candidateAccountSetupData, userData } =
    req.body as TSetupCandidateAccountReqBody;

    console.log(userData);
  const userId = userData?.userId as string;
  const { birthdate, occupation } = candidateAccountSetupData; 

  console.log(candidateAccountSetupData);

  console.log(BirthDateRegex.test(birthdate))
  if (
    !(birthdate && occupation) ||
    !(BirthDateRegex.test(birthdate) && validOccupations.includes(occupation))
  ) {
    res.status(406).json("invalid_data");
    return;
  }

  try {
    const sql = `INSERT INTO candidates (user_id,birthdate,occupation) VALUES(?,?,?)`;
    const values = [userId, birthdate, occupation];
    await mainDBPool.query(sql, values);

    const sql2 = `UPDATE users set account_type="candidate" WHERE user_id=? LIMIT 1;`
    const values2 = [userId];
    await mainDBPool.query(sql2,values2);
    res.status(200).json("account_set_up");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export default setupCandidateAccount;
