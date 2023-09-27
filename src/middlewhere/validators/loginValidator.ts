import { NextFunction, Request, Response } from "express";
import decodeLoginToken from "../../routes/authentication/utils/decodeLoginToken.js";

const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  const loginToken = req.header("login_token");
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
