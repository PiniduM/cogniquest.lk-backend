import { NextFunction, Request, Response } from "express";
import decodeLoginToken from "../../routes/authentication/utils/decodeLoginToken.js";

const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.header("authorization");
  if (!authorization || !authorization.startsWith("Bearer"))
    res.status(401).json("no_organization_memberships_token");
  if (!authorization) res.status(401).json("unauthorized");
  const loginToken = authorization?.slice(7); //to remove bearer prefix
  if (!loginToken) res.status(401).send("unauthorized");
  else {
    const userData = decodeLoginToken(loginToken);
    if (userData) {
      req.body.userData = userData;
      next();
    } else {
      res.status(406).send("invalid_login_token");
    }
  }
};

export default loginValidator;
