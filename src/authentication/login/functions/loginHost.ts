import bcrypt from "bcrypt";
import { RowDataPacket } from "mysql2";
import { loginData } from "../../../types/reqDataTypes.js";
import mainDBPool from "../../../utils/mainDBPool.js";
import {
  emailRegex,
  hostPasswordRegex,
  hostUsernameRegex,
} from "../../../validators/validators.js";
import signJWT from "../../../utils/signJWT.js";
import sendVerificationMail from "../../functions/sendVerificationMail.js";
import giveEmailVerificationToken from "../../functions/createVerificationToken.js";

const loginHost = async (loginData: loginData) => {
  const { identifier, password } = loginData;

  if (!identifier) throw "invalid identifier";
  let identifierType;
  if (hostUsernameRegex.test(identifier)) identifierType = "username";
  else if (emailRegex.test(identifier)) identifierType = "email";
  else throw "invalid identifier";

  if (!(password && hostPasswordRegex.test(password))) throw "invalid password";
  try {
    const sql = `SELECT host_id,username,email,password,verified FROM hosts WHERE ${identifierType}=? LIMIT 1;`;
    const result = (await mainDBPool.execute(sql, [
      identifier,
    ])) as RowDataPacket[];
    const row = result[0][0];
    console.log(row);
    if (row) {
      const {
        host_id,
        username,
        email,
        password: hashedPassword,
        verified,
      } = row;
      if (bcrypt.compareSync(password, hashedPassword)) {
        if (verified === "y") {
          const token = signJWT({ host_id, username, email }, "1h");
          return {
            loginToken: JSON.stringify(token),
          };
        } else if (verified === "e") {
          return "under review";
        } else {
          await sendVerificationMail(email, "host");
          return {
            emailVerificationToken: giveEmailVerificationToken(email, "host"),
          };
        }
      }
    }
    return "incorrect credentials";
  } catch (error) {
    console.log(error);
    throw "500";
  }
};

export default loginHost;
