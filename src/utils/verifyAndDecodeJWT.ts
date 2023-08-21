import JWT from "jsonwebtoken";

const verifyAndDecodeJWT = (token: string) => {
  try {
    const secretKey = process.env.JWT_SECRET as string;
    if (JWT.verify(token, secretKey)) return JWT.decode(token);
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default verifyAndDecodeJWT;