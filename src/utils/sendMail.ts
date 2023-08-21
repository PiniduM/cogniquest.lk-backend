import nodemailer from "nodemailer";
type Tmail = {
  from: string;
  to: any;
  subject: string;
  text: string;
  html: string;
};

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "pmjuniorcomtec@gmail.com",
    pass: "jtaxfmnfxofkenpn",
  },
});

const sendMail = async (mail: Tmail) => {
  try {
    const result = await transporter.sendMail(mail);
    console.log(result);
    return result;
  } catch(error) {
    console.log(error);
    throw "mail error";
  }
};

export default sendMail;