import { NextFunction, Request, Response } from "express";
import verifyAndDecodeJWT from "../../utils/verifyAndDecodeJWT.js";

import { IOrganizationMembershipsPayload } from "../../types/commonInterfaces.js";
import { TParsedMembershipsArray } from "../../types/commonInterfaces.js";

const organizationMembershipValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.header("authorization");
  if (!authorization || !authorization.startsWith("Bearer"))
    res.status(401).json("no_organization_memberships_token");
  if (!authorization) res.status(401).json("unauthorized");
  else {
    try {
      const organizationMembershipsToken = authorization.slice(7); //to remove bearer prefix
      const { organizationId } = req.body;
      const payload = verifyAndDecodeJWT(
        organizationMembershipsToken
      ) as IOrganizationMembershipsPayload;
      const { memberships } = payload;
      if (!memberships) {
        res.status(401).json("unauthorized");
        console.log(2)
        return;
        //token mismatch
      }

      const membershipsArray = JSON.parse(
        memberships
      ) as TParsedMembershipsArray;
      const relevantMembership = membershipsArray.find(
        (membership) => membership.organization_id == organizationId
      );
      if (!relevantMembership) {
        res.status(401).json("unauthorized");
        console.log(3)
        return;
      }
      if (
        (relevantMembership &&
          relevantMembership.role !== "admin" &&
          relevantMembership.admin_approved === "Y") ||
        relevantMembership.system_verified === "Y"
      ) {
        const parsedData = req.body.parsedData;
        if (parsedData) {
          parsedData.relevantMembership = relevantMembership;
        } else {
          const parsedData = { relevantMembership };
          req.body.parsedData = parsedData;
        }
      }
      next();
    } catch (error) {
      console.log(error);
      res.status(406).send("invalid_memberships_token");
    }
  }
};

export default organizationMembershipValidator;
