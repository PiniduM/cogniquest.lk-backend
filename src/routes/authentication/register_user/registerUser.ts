import bcrypt from "bcrypt";
import { Request, Response } from "express";
import {
  phoneNumberRegex,
  emailRegex,
  fullNameRegex,
  passwordRegex,
  usernameRegex,
  validCountries,
} from "../../../validators/validators.js";
import mainDBPool from "../../../utils/mainDBPool.js";
import { ErrorPacketParams } from "mysql2";
import sendVerificationMail from "../utils/sendVerificationMail.js";

const registerUser = async (req: Request, res: Response) => {
  const { email, username, password, contactNumber, fullName, country } =
    req.body;

  if (
    !(email && username && password && contactNumber && fullName && country)
  ) {
    res.status(406).send("invalid_data");
    return;
  }
  if (
    !(
      emailRegex.test(email) &&
      usernameRegex.test(username) &&
      passwordRegex.test(password) &&
      fullNameRegex.test(fullName) &&
      phoneNumberRegex.test(contactNumber) &&
      validCountries.includes(country)
    )
  ) {
    res.status(406).send("invalid_data");
    return;
  }

  const hashedPassword = bcrypt.hashSync(password, 2);
  try {
    const sql =
      "INSERT INTO users (email,password,username,contact_number,full_name,country) VALUES(?,?,?,?,?,?)";
    const values = [
      email,
      hashedPassword,
      username,
      contactNumber,
      fullName,
      country,
    ];
    await mainDBPool.query(sql, values);
    const emailVerificationToken = sendVerificationMail(email);
    console.log(emailVerificationToken);//test malformed
    res.status(200).json({emailVerificationToken});
  } catch (err) {
    console.log(err);
    const error = err as ErrorPacketParams;
    if(error.code === "ER_DUP_ENTRY") {
      if(error.message?.includes("email")) res.status(406).send("duplicate_email");
      else if(error.message?.includes("username")) res.status(406).send("duplicate_username");
      else res.status(406).send("duplicate_contact_number"); //only these 3 duplications required
      return;
    }
    res.status(400).json("unknown_error");
  }
};

export default registerUser;
