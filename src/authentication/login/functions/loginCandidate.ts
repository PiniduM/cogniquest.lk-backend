import bcrypt from "bcrypt";
import { RowDataPacket } from "mysql2";
import { loginData } from "../../../types/reqDataTypes.js";
import mainDBPool from "../../../utils/mainDBPool.js";
import {
  candidatePasswordRegex,
  candidateUsernameRegex,
  gmailRegex
} from "../../../validators/validators.js";
import signJWT from "../../../utils/signJWT.js";
import sendVerificationMail from "../../functions/sendVerificationMail.js";
import giveEmailVerificationToken from "../../functions/createVerificationToken.js";

const loginCandidate = async (loginData: loginData) => {
  const { identifier, password } = loginData;

  if (!identifier) throw "invalid identifier";
  let identifierType;
  if (candidateUsernameRegex.test(identifier)) identifierType = "username";
  else if (gmailRegex.test(identifier)) identifierType = "email";
  else throw "invalid identifier";

  if (!(password && candidatePasswordRegex.test(password)))
    throw "invalid password";

  try {
    const sql = `SELECT candidate_id,username,email,password,verified FROM candidates WHERE ${identifierType}=? LIMIT 1;`;
    const result = (await mainDBPool.execute(sql, [
      identifier,
    ])) as RowDataPacket[];
    const row = result[0][0];
    if (row) {
      const {
        candidate_id,
        username,
        email,
        password: hashedPassword,
        verified,
      } = row;
      if (bcrypt.compareSync(password, hashedPassword)) {
        if (verified === "y") {
          const token = signJWT({ candidate_id, username, email }, "1h");
          return {
            loginToken : JSON.stringify(token)
          }
        } else {
          await sendVerificationMail(email,"candidate");
          return {
            emailVerificationToken : giveEmailVerificationToken(email,"candidate")
          }
           /*can set to perform asynchronously if it improves ux 
           but some users get annoyed when the have to wait for a while till they recieve the mail.
           better to keep them in the website till the email is sent.*/
        }
      }
    }
    return "incorrect credentials";
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default loginCandidate;
