import bcrypt from "bcrypt";
import {
  BirthDateRegex,
  LKPhoneNumberRegex,
  validOccupations,
  candidatePasswordRegex,
  candidateUsernameRegex,
  fullNameRegex,
  gmailRegex,
} from "../../../validators/validators.js";
import { TcandidateRegistrationData } from "../../../types/reqDataTypes.js";
import mainDBPool from "../../../utils/mainDBPool.js";
import sendVerificationMail from "../../functions/sendVerificationMail.js";
import giveEmailVerificationToken from "../../functions/createVerificationToken.js";

const registerCandidate = async (data: TcandidateRegistrationData) => {
  const {
    type,
    gmail,
    username,
    password,
    phoneNumber,
    fullName,
    birthDate,
    occupation,
  } = data;
  if (
    !(
      gmailRegex.test(gmail) &&
      candidateUsernameRegex.test(username) &&
      candidatePasswordRegex.test(password) &&
      LKPhoneNumberRegex.test(phoneNumber) &&
      BirthDateRegex.test(birthDate) &&
      fullNameRegex.test(fullName) &&
      validOccupations.includes(occupation)
      )
      )
      throw "invalid data";
      
      const hashedPassword = bcrypt.hashSync(password, 2);
      const sql = `INSERT INTO candidates(
        email,
    username,
    password,
    phone_number,
    full_name,
    birthdate,
    occupation)
    VALUES
    (?,?,?,?,?,?,?);
    `;
    try {
      const result = await mainDBPool.execute(sql, [
      gmail,
      username,
      hashedPassword,
      phoneNumber,
      fullName,
      birthDate,
      occupation,
    ]);
    console.log(result);
    await sendVerificationMail(gmail, "candidate");
    return giveEmailVerificationToken(gmail,"candidate");
  } catch (error) {
    console.log(error);
    throw "unknown error";
  }
};

export default registerCandidate;
