import { NextFunction, Request, Response } from "express";
import { IParsedByValidateOrganizationMembership } from "../../types/organizationRoutes.js";
const adminMembershipsValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { parsedData } = req.body as IParsedByValidateOrganizationMembership;
  const { organizationMembership } = parsedData;
  if (organizationMembership.role !== "admin") {
    res.status(401).json("unauthorized: not a admin");
    return;
  }
  next();
};

export default adminMembershipsValidator;
