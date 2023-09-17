import { NextFunction, Request, Response } from "express";
import verifyAndDecodeJWT from "../utils/verifyAndDecodeJWT.js";

import { IOrganizationMembershipsPayload } from "../types/commonInterfaces.js";
import { TParsedMembershipsArray } from "../types/commonInterfaces.js";

const organizationMembershipsValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const orgMembershipToken = req.body.organizationMembershipsToken;
  if (!orgMembershipToken) res.status(401).json("unauthorized");
  else {
    try {
      const payload = verifyAndDecodeJWT(
        orgMembershipToken
      ) as IOrganizationMembershipsPayload;
      const { user_id, memberships } = payload;
      if (!memberships) {
        console.log("h");
        res.status(401).json("unauthorized");
        return;
        //token mismatch
      }

      const membershipsArray = JSON.parse(
        memberships
      ) as TParsedMembershipsArray;
      const validMemberships = membershipsArray.filter(
        (membership) =>
          (membership.role !== "admin" && membership.admin_approved === "Y") ||
          membership.system_verified === "Y"
      );
      if (validMemberships.length < 1) {
        console.log(validMemberships);
        res.status(401).json("unauthorized");
        return;
      }
      const userData = { userId: user_id, validMemberships };
      req.body.userData = userData;
      next();
    } catch {
      res.status(406).send("invalid_memberships_token");
    }
  }
};

export default organizationMembershipsValidator;
