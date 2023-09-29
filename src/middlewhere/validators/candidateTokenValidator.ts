import { NextFunction, Request, Response } from "express";
import verifyAndDecodeJWT from "../../utils/verifyAndDecodeJWT.js";
import { ICandidateTokenPayload } from "../../types/candidateRoutes.js";
import { JwtPayload } from "jsonwebtoken";

const candidateTokenValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.header("authorization");
  if (!authorization || !authorization.startsWith("Bearer"))
    res.status(401).json("no_organization_memberships_token");
  if (!authorization) res.status(401).json("unauthorized");
  const candidateToken = authorization?.slice(7); //to remove bearer prefix
  if (!candidateToken) res.status(401).send("no_candidate_token");
  else {
    const candidateData = verifyAndDecodeJWT(candidateToken) as
      | (ICandidateTokenPayload & JwtPayload)
      | false;
    //So far no need of issuing more types of jwts with candidate_id , if needed do a advance object simillarity check
    if (candidateData && candidateData.candidateId) {
      req.body.candidateData = candidateData;
      next();
    } else {
      res.status(406).send("invalid_candiate_token");
    }
  }
};

export default candidateTokenValidator;
