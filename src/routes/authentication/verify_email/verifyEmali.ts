import { Request, Response } from "express";
import verifyAndDecodeJWT from "../../../utils/verifyAndDecodeJWT.js";
import mainDBPool from "../../../utils/mainDBPool.js";
import { JwtPayload } from "jsonwebtoken";
import { ResultSetHeader } from "mysql2";

const validateVerification = async (
  email: string,
  verificationCode: string
) => {
  const sql =
    "DELETE FROM verifying_emails WHERE email = ? AND verification_code = ? LIMIT 1";
  const values = [email, verificationCode];
  const result = await mainDBPool.query(sql, values);
  console.log(result);
  const resultHeader = result[0] as ResultSetHeader;
  if (resultHeader.affectedRows === 1) return true;
  else return false;
};

const updateVerificationStatus = async (email: string) => {
  const sql = `update users SET email_verified='Y' WHERE email='${email}' LIMIT 1`;
  await mainDBPool.query(sql); //params are already validated
  /* no need to check the affectedRows because
    the user must go through the registration process in order to have a valid verification token legally
    can set a trigger to inform the management that something absurd is going on(a vulnerability).
    */
};

const verifyEmail = async (req: Request, res: Response) => {
  const data = req.body;
  const emailVerificationToken = data?.emailVerificationToken;
  const verificationCode = data?.verificationCode;
  if (!(emailVerificationToken && verificationCode)) {
    res.status(406).send("invalid request");
    return;
  }
  const payload = verifyAndDecodeJWT(emailVerificationToken);
  const { email} = payload as JwtPayload;
  if (email) {
    try {
      const validVerification = await validateVerification(
        email,
        verificationCode
      );
      if (validVerification) {
        updateVerificationStatus(email);
        res.status(200).send("verified");
      } else {
        res.status(401).send("invalid_credentials");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("internel_server_error");
    }
  } else {
    res.status(401).send("invalid_credentials");
    return;
  }
};

export default verifyEmail;
