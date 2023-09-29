import { Request } from "express";

const validateAndCleanAuthorizationToken = (req: Request) => {
  const authorization = req.header("authorization");
  if (!authorization || !authorization.startsWith("Bearer")) return false;
  return authorization.slice(7);
};

export default validateAndCleanAuthorizationToken;
