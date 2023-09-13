import { NextFunction, Request, Response } from "express";
import verifyAndDecodeJWT from "../utils/verifyAndDecodeJWT.js";
import { ILoginPayload } from "../types/serverSpecifics.js";
import { hostingStaffUserData } from "../types/reqBodies.js";

const organizationMemberValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { loginToken } = req.body;
  if (!loginToken) res.status(401).send("unauthorized");
  else {
    try {
      const payload = verifyAndDecodeJWT(loginToken) as ILoginPayload;
      const { user_id, account_type } = payload;
      const validAccountType =
        account_type === "host" || account_type === "hostNcandidate";
      if (!(user_id && validAccountType)) {
        res.status(401).send("unauthorized");
        return;
      }
      const userData:hostingStaffUserData = { userId: user_id };
      req.body.userData = userData;
      next();
    } catch {
      res.status(406).send("invalid_login_token");
    }
  }
};

export default organizationMemberValidator;
