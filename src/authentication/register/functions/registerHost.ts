import bcrypt from "bcrypt";
import {
  LKPhoneNumberRegex,
  fullNameRegex,
  emailRegex,
  organizationRegex,
  validRoles,
  validCountries,
  hostPasswordRegex,
  hostUsernameRegex,
} from "../../../validators/validators.js";
import { ThostRegistrationData } from "../../../types/reqDataTypes.js";
import mainDBPool from "../../../utils/mainDBPool.js";
import sendVerificationMail from "../../functions/sendVerificationMail.js";
import giveEmailVerificationToken from "../../functions/createVerificationToken.js";

const registerHost = async (data: ThostRegistrationData) => {
  const {
    type,
    email,
    username,
    password,
    organization,
    role,
    phoneNumber,
    fullName,
    country,
  } = data;

  if (
    !(
      emailRegex.test(email) &&
      hostUsernameRegex.test(username) &&
      hostPasswordRegex.test(password) &&
      LKPhoneNumberRegex.test(phoneNumber) &&
      fullNameRegex.test(fullName) &&
      organizationRegex.test(organization) &&
      validRoles.includes(role) &&
      validCountries.includes(country)
    )
  )
    throw "invalid data";

    const hashedPassword = bcrypt.hashSync(password,2);
  const sql = `INSERT INTO hosts(
    email,
    username,
    password,
    organization,
    role,
    full_name,
    phone_number,
    country)
    VALUES
    (?,?,?,?,?,?,?,?);
    `;
  try {
    await mainDBPool.execute(sql, [
      email,
      username,
      hashedPassword,
      organization,
      role,
      fullName,
      phoneNumber,
      country,
    ]);
    await sendVerificationMail(email,"host")
    return giveEmailVerificationToken(email,"host");
  } catch (err) {
    console.log(err);
    throw "db error";
  }
};

export default registerHost;
