import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { emailRegex,passwordRegex } from "src/validators/validators.js";
import mainDBPool from "src/utils/mainDBPool.js";
import { RowDataPacket } from "mysql2";
import signJWT from "src/utils/signJWT.js";
import sendVerificationMail from "../utils/sendVerificationMail.js";
import { ILoginPayload } from "src/types/serverSpecifics.js";

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!(email && emailRegex.test(email))) {
    res.status(406).send("incorrect_credentials");
    return;
  }
  if (!(password && passwordRegex.test(password))) {
    res.status(400).send("incorrect_credentials");
    return;
  }
  //spilitted to inform the specific case if necessary
  try {
    const sql =
      "SELECT user_id,username,password,email_verified,account_type FROM users WHERE email=? LIMIT 1;";
    const data = [email];
    const result = await mainDBPool.query(sql, data);
    const row = (result as RowDataPacket[])[0][0];
    console.log(row);
    if (row) {
      const {
        user_id,
        username,
        password: hashedPassword,
        email_verified,
        account_type,
      } = row;
      if (bcrypt.compareSync(password, hashedPassword)) {
        if (email_verified === "Y") {
          const payload:ILoginPayload = { email, user_id, username, account_type };
          const lifetime = "1d";
          const token = signJWT(
            payload,
            lifetime
          );
          res.status(200).json({ loginToken: token });
        } else {
          console.log("verify");
          const emailVerificationToken = await sendVerificationMail(email);
          res.status(200).json({
            emailVerificationToken
          });
          /*can set to perform asynchronously if it improves ux 
          but some users get annoyed when the have to wait for a while till they recieve the mail.
          better to keep them in the website till the email is sent.*/
        }
        console.log("correct pwd");
      } else {
        res.status(400).json("incorrect_credentials");
      }
    } else {
      res.status(400).json("incorrect_credentials");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("unknown_error");
  }
};

export default login;
