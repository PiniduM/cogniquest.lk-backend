import { RequestHandler } from "express";
import { TSetupHostingStaffAccountReqBody } from "../../../types/reqBodies.js";
import { referenceCodeRegex, validRoles } from "../../../validators/validators.js";
import mainDBPool from "../../../utils/mainDBPool.js";

const setupOrganizationMembership: RequestHandler = async (req, res) => {
  const { hostingStaffAccountSetupData, userData } =
    req.body as TSetupHostingStaffAccountReqBody;

  const userId = userData?.user_id as string;
  const { referenceCode,role } = hostingStaffAccountSetupData;

  if (!(referenceCode && role) || !(referenceCodeRegex.test(referenceCode) && validRoles.includes(role))) {
    res.status(406).json("invalid_data");
    return;
  }

  try {
    const sql = `INSERT INTO organization_memberships (user_id,organization_id,role) VALUES(?,(SELECT organization_id from organizations WHERE reference_code = ?),?)`;
    const values = [userId, referenceCode,role];
    await mainDBPool.query(sql, values);
    res.status(200).json("account_set_up");
  } catch (err) {
    console.log(err);
    res.status(500).json("unknown_error");
  }
};


export default setupOrganizationMembership;