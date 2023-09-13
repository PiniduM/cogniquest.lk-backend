import { RequestHandler } from "express";
import {
  TGiveOrganizationMemberToken,
  decryptedLoginToken,
} from "../../../types/reqBodies.js";
import verifyAndDecodeJWT from "../../../utils/verifyAndDecodeJWT.js";
import mainDBPool from "../../../utils/mainDBPool.js";
import { RowDataPacket } from "mysql2";
import signJWT from "../../../utils/signJWT.js";

const giveOrganizationMemberToken: RequestHandler = (req, res) => {
  const data = req.body as TGiveOrganizationMemberToken;
  const loginToken = data.loginToken;
  const userData = verifyAndDecodeJWT(loginToken) as
    | decryptedLoginToken
    | false;

  if (!userData) {
    res.status(406).json("invalid_login_token");
    return;
  }
  const { user_id } = userData;

  const sql = `SELECT organization,member_id,admin_approved,system_verified FROM hosting_staff WHERE user_id=?;`;
  const values = [user_id];
  try {
    const response = mainDBPool.query(sql, values) as RowDataPacket;
    const result = response[0];
    const payload = {
      user_id,
      memberships: result,
    };
    const hostingStaffToken = signJWT(payload, "2h");
    res.status(200).json(hostingStaffToken);
  } catch {
    res.status(500).json("unknown_error");
  }
};

export default giveOrganizationMemberToken;
