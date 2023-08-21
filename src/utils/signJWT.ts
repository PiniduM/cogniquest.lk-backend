import JWT from "jsonwebtoken";

const signJWT = (payload: { [key: string]: string }, lifetime: string) => {
  const secret_key = process.env.JWT_SECRET as string;

  const options = {
    expiresIn: lifetime,
  };
  const token = JWT.sign(payload, secret_key, options);
  return token;
};

export default signJWT;