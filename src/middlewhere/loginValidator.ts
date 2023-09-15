import { NextFunction, Request, Response } from "express";
import extractUserData from "../routes/authentication/utils/extractUserData.js";

const loginValidator = (req:Request, res:Response, next:NextFunction) => {
    const { loginToken } = req.body;
    if (!loginToken) res.status(401).send("unauthorized");
    else {
      try {
        const userData = extractUserData(loginToken);
        req.body.userData = userData;
        next();
      } catch {
        res.status(406).send("invalid_login_token");
      }
    }

}

export default loginValidator;