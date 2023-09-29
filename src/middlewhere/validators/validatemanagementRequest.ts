import { NextFunction, Request, Response } from "express";
import verifyAndDecodeJWT from "../../utils/verifyAndDecodeJWT.js";

const validateManagementRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.header("authorization");
  if (!authorization || !authorization.startsWith("Bearer"))
    res.status(401).json("no_organization_memberships_token");
  if (!authorization) res.status(401).json("unauthorized");
  const managementToken = authorization?.slice(7); //to remove bearer prefix
  if (!managementToken) {
    res.status(401).json("no_management_token");
    return;
  }

  const payload = verifyAndDecodeJWT(managementToken) as {
    management_id: string;
    type: string;
  };
  if (payload?.type !== "managementToken") {
    res.status(401).json("unauthorized");
  } else {
    next();
  }
};

export default validateManagementRequest;
