import { RequestHandler } from "express";
import { decryptedLoginToken } from "../../../types/authenticationRoutes.js";
import verifyAndDecodeJWT from "../../../utils/verifyAndDecodeJWT.js";
import mainDBPool from "../../../utils/mainDBPool.js";
import { RowDataPacket } from "mysql2";
import signJWT from "../../../utils/signJWT.js";
import { IOrganizationMembershipsPayload } from "../../../types/commonInterfaces.js";
import { TGiveOrganizationMemberTokenReqBody } from "../../../types/organizationMemberRoutes.js";
import { JwtPayload } from "jsonwebtoken";

const giveOrganizationMembershipsToken: RequestHandler = async (req, res) => {
  const data = req.body as TGiveOrganizationMemberTokenReqBody;
  const loginToken = data.loginToken;
  if (!loginToken) {
    res.status(401).json("unauthorized");
    return;
  }
  const userData = verifyAndDecodeJWT(loginToken) as JwtPayload | false;

  if (!userData) {
    res.status(406).json("invalid_login_token");
    return;
  }
  const { user_id } = userData;
  console.log(userData);

  const sql = `SELECT member_id,role,organization_id,admin_approved,system_verified FROM organization_memberships WHERE user_id=?;`;
  const values = [user_id];
  try {
    const response = (await mainDBPool.query(sql, values)) as RowDataPacket;
    const result = response[0];
    console.log(user_id);
    const payload: IOrganizationMembershipsPayload = {
      user_id,
      memberships: JSON.stringify(result),
    };
    const organizationMembershipsToken = signJWT(payload, "2h");
    res.status(200).json({ organizationMembershipsToken });
  } catch (error) {
    console.log(error);
    res.status(500).json("unknown_error");
  }
};

export default giveOrganizationMembershipsToken;
