import { NextFunction, Request, Response } from "express";
import verifyAndDecodeJWT from "../../utils/verifyAndDecodeJWT.js";

import { IOrganizationMembershipsPayload } from "../../types/commonInterfaces.js";
import { TParsedMembershipsArray } from "../../types/commonInterfaces.js";

const organizationMembershipsValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.header("authorization");
  if (!authorization || !authorization.startsWith("Bearer"))
    res.status(401).json("no_organization_memberships_token");
  else {
    try {
      const organizationMembershipsToken = authorization.slice(7);
      const payload = verifyAndDecodeJWT(
        organizationMembershipsToken
      ) as IOrganizationMembershipsPayload;
      const { user_id, memberships } = payload;
      if (!memberships) {
        console.log("h");
        res.status(401).json("token_mismatch");
        return;
        //token mismatch
      }

      const membershipsArray = JSON.parse(
        memberships
      ) as TParsedMembershipsArray;
      console.log(membershipsArray)
      const validMemberships = membershipsArray.filter(
        (membership) =>
          (membership.role !== "admin" && membership.admin_approved === "Y") ||
          membership.system_verified === "Y"
      );
      if (validMemberships.length < 1) {
        res.status(401).json("no_valid_memberships");
        return;
      }
      const parsedData = { userId: user_id, validMemberships };
      req.body.parsedData = parsedData;
      next();
    } catch {
      res.status(406).send("invalid_memberships_token");
    }
  }
};

export default organizationMembershipsValidator;
