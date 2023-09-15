import generateRandomNumber from "../../../utils/generateRandomNumber.js";
import mainDBPool from "../../../utils/mainDBPool.js";
import sendMail from "../../../utils/sendMail.js";
import createVerificationMail from "./createVerificationMail.js";
import giveEmailVerificationToken from "./createVerificationToken.js";

const sendVerificationMail = async (email: string) => {
  const verificationCode = generateRandomNumber(100000, 999999);
  try {
    const sql =
      "INSERT INTO verifying_emails (email, verification_code,expiry_date) VALUES (?, ?, DEFAULT) ON DUPLICATE KEY UPDATE verification_code=values(verification_code),expiry_date=values(expiry_date);";
    const values = [email, verificationCode];
    const result = await mainDBPool.query(sql, values);
    console.log(result);
    const mail = createVerificationMail(email, `${verificationCode}`);
    await sendMail(mail);
    return giveEmailVerificationToken(email);
  } catch (error) {
    // if ((error as any)?.code === "ER_DUP_ENTRY") throw "VC_already_sent";
    throw "unknown error";
  }
};

export default sendVerificationMail;
