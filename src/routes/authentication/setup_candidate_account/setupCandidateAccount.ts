import { RequestHandler } from "express";
import { TSetupCandidateAccountReqBody } from "../../types/reqBodies.js";
import {
  BirthDateRegex,
  validOccupations,
} from "../../validators/validators.js";
import mainDBPool from "../../utils/mainDBPool.js";
import { ResultSetHeader } from "mysql2";

const setupCandidateAccount: RequestHandler = async (req, res) => {
  const { candidateAccountSetupData, userData } =
    req.body as TSetupCandidateAccountReqBody;

  const userId = userData?.userId as string;
  const { birthdate, occupation } = candidateAccountSetupData;

  if (
    !(birthdate && occupation) ||
    !(BirthDateRegex.test(birthdate) && validOccupations.includes(occupation))
  ) {
    res.status(406).json("invalid_data");
    return;
  }

  try {
    const sql = `ISERT INTO candidates (user_id,birthdate,occupation) VALUES(?,?,?)`;
    const values = [userId, birthdate, occupation];
    await mainDBPool.query(sql, values);
    res.status(200).json("account_set_up");
  } catch (err) {
    console.log(err);
    res.status(500).json("unknown_error");
  }
};

export default setupCandidateAccount;
