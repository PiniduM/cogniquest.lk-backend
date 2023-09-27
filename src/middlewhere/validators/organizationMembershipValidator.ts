import { NextFunction, Request, Response } from "express";
import verifyAndDecodeJWT from "../../utils/verifyAndDecodeJWT.js";

import { IOrganizationMembershipsPayload } from "../../types/commonInterfaces.js";
import { TParsedMembershipsArray } from "../../types/commonInterfaces.js";

const organizationMembershipValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const organizationMembershipsToken = req.header(
    "organization_memberships_token"
  );
  const organizationId = req.header("organization_id");
  if (!organizationMembershipsToken) res.status(401).json("unauthorized");
  else {
    try {
      const payload = verifyAndDecodeJWT(
        organizationMembershipsToken
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
      const relevantMembership = membershipsArray.find(
        (membership) => membership.organization_id === organizationId
      );
      if (!relevantMembership) {
        res.status(401).json("unauthorized");
        return;
      }
      if (
        (relevantMembership.role !== "admin" &&
          relevantMembership.admin_approved === "Y") ||
        relevantMembership.system_verified === "Y"
      )
        req.body.relevantMembership = relevantMembership;
      next();
    } catch {
      res.status(406).send("invalid_memberships_token");
    }
  }
};

export default organizationMembershipValidator;
