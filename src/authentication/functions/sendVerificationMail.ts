import mainDBPool from "../../utils/mainDBPool.js";
import sendMail from "../../utils/sendMail.js";
import createVerificationMail from "./createVerificationMail.js";

const getRandomValue = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const sendVerificationMail = async (email: string, type: string) => {
  let verificationCode;
  if (type === "candidate") verificationCode = getRandomValue(100000, 499999);
  else verificationCode = getRandomValue(500000, 999999); // hosts
  /*these specific ranges are used to identify wether the user
  is verifying a candidate account or a host account at verification handler.*/
  try {
    const sql =
      "INSERT INTO verifying_emails (email, verification_code, type, expiry_date) VALUES (?, ?,?, DEFAULT);";
    await mainDBPool.query(sql, [email, verificationCode, type]);
    const mail = createVerificationMail(email, `${verificationCode}`);
    await sendMail(mail);
    return "verification code sent";
  } catch (error) {
    if ((error as any)?.code === "ER_DUP_ENTRY") throw "VC already sent";
    console.log(error);
    throw "unknown error";
  }
};

export default sendVerificationMail;
