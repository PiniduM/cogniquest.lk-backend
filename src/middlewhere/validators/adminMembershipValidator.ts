import { NextFunction, Request, Response } from "express";
import { IParsedByValidateOrganizationMembership } from "../../types/organizationRoutes.js";
const adminMembershipValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { parsedData } = req.body as IParsedByValidateOrganizationMembership;
  const { relevantMembership } = parsedData; //there must be a relevent membership(validated by organization memberships validator);
  if (relevantMembership.role !== "admin") {
    res.status(401).json("unauthorized: not a admin");
    return;
  }
  next();
};

export default adminMembershipValidator;
