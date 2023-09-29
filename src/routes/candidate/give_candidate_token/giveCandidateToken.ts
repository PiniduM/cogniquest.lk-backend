import { RequestHandler } from "express";
import decodeLoginToken from "../../authentication/utils/decodeLoginToken.js";
import mainDBPool from "../../../utils/mainDBPool.js";
import { RowDataPacket } from "mysql2";
import signJWT from "../../../utils/signJWT.js";

const giveCandidateToken: RequestHandler = async (req, res) => {
  const { loginToken } = req.body;

  const loginData = decodeLoginToken(loginToken);
  if (!loginData) {
    res.status(401).send("invalid_login_token");
    return;
  }
  const { userId } = loginData;

  const sql = `SELECT user_id,username,full_name,country,candidate_id,birthdate,occupation FROM users INNER JOIN candidates USING(user_id) WHERE user_id=? LIMIT 1`;
  const values = [userId];
  try {
    const response = (await mainDBPool.query(sql, values)) as RowDataPacket;
    const result = response[0];
    const row = result[0];
    if (!row) {
      res.status(406).json("no_candidate_account");
      return;
    }
    const {
      user_id,
      username,
      full_name,
      country,
      candidate_id,
      birthdate,
      occupation,
    } = row;
    const payload = {
      userId: user_id,
      username,
      fullName: full_name,
      country,
      candidateId: candidate_id,
      birthdate: birthdate,
      occupation: occupation,
    };
    //this mapping is used to bridge the incompetibility between db column names and camel case variable names
    //change db column names to camel case and use raw row withut mapping (posponed since it affects all the other routes)
    const lifetime = "1d";
    const candidateToken = signJWT(payload, lifetime);

    const responseBody = { candidateToken };
    res.status(200).json(responseBody);
  } catch (error) {
    console.log(error);
    res.status(500).json("unknown_error");
  }
};

export default giveCandidateToken;
