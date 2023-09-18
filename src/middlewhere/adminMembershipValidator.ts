import { NextFunction, Request, Response } from "express";
import { IOrganizationMemberDefaults } from "../types/reqBodies.js";

const adminMembershipsValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { parsedData, organizationId } =
    req.body as IOrganizationMemberDefaults & { organizationId: string };

  if (!organizationId) {
    res.status(406).send("invalid organization id");
    return;
  }

  const { validMemberships } = parsedData;
  const adminMembership = validMemberships.find(
    ({organization_id,role}) =>
      organization_id == organizationId &&
      role === "admin"
  );

  if (!adminMembership) {
    res.status(401).json("unauthorized: not a admin");
    return;
  }

  req.body.parsedData.adminMembership = adminMembership;
  next();
};

export default adminMembershipsValidator;
