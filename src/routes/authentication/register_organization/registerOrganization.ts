import { RequestHandler } from "express";
import validateOrgRegistrationData from "./functions/validateOrgRegistrationData.js";
import mainDBPool from "../../../utils/mainDBPool.js";
import { ErrorPacketParams, ResultSetHeader, RowDataPacket } from "mysql2";
import { TRegisterOrganizationReqBody } from "../../../types/authenticationRoutes.js";
import generateRandomNumber from "../../../utils/generateRandomNumber.js";
import registerAdmin from "./functions/registerAdmin.js";
import verifyAndDecodeJWT from "../../../utils/verifyAndDecodeJWT.js";
import updateUserAcccountType from "./functions/updateUserAccountType.js";

const registerOrganization: RequestHandler = async (req, res) => {
  const { orgRegistrationData, userData } = req.body as TRegisterOrganizationReqBody;

  const userId = userData?.userId as string// validated and parsed by middlewhere
  
  if (!validateOrgRegistrationData(orgRegistrationData)) {
    res.status(406).json("invalid_data");
    return;
  }

  const {
    organizationName,
    email,
    phoneNumber,
    address,
    organizationType,
    referencePrefix,
  } = orgRegistrationData;

  let referenceCode = `${referencePrefix}${generateRandomNumber(1000, 9999)}`;
  //serch for reference code first to avoid duplidations;
  let repeatedReferenceCode = true;
  const searchSQL = `SELECT EXISTS (SELECT 1 FROM organizations WHERE reference_code = ?) AS present;`;
  while (repeatedReferenceCode) {
    const data = [referenceCode];
    const response = await mainDBPool.query(searchSQL, data);
    const result = response[0] as RowDataPacket[];
    if (result[0].present === 0) repeatedReferenceCode = false;
    else
    referenceCode = `${referencePrefix}${generateRandomNumber(1000, 9999)}`;
}
try {
    const sql = `INSERT INTO organizations (organization_name,reference_code,email,contact_number,address,for_profit) VALUES(?,?,?,?,?,?)`;
//     const sql = `
//     BEGIN TRANSACTION;
// INSERT INTO organizations (organization_name, reference_code, email, contact_number, address, for_profit)
// VALUES (?, ?, ?, ?, ?, ?);

// SET @organization_id = LAST_INSERT_ID();
// SET @userId = ?;

// INSERT INTO  (user_id,organization_id, role, admin_appreoved)
// VALUES (userId,@organization_id,'admin','Y');

// UPDATE users
// SET account_type = 'host'
// WHERE user_id = userId;

// COMMIT;

// ROLLBACK;
//     `;
    const data = [
      organizationName,
      referenceCode,
      email,
      phoneNumber,
      address,
      organizationType === "for_profit" ? "Y" : "N",
      57,
    ];
    const response = await mainDBPool.query(sql, data);
    const result = response[0] as ResultSetHeader;
    console.log(response);
    if (result.affectedRows === 1) {
      registerAdmin(userId,referenceCode);
      updateUserAcccountType(userId);
      res.status(200).json("organization_registered");
    } else res.status(400).json("unknown_error");
  } catch (err) {
    const error = err as ErrorPacketParams;
    console.log(error);
    if (error.code === "ER_DUP_ENTRY") {
      if (error.message?.includes("email"))
        res.status(406).send("duplicate_email");
      else res.status(406).send("duplicate_organization_name");
      return;
    }
    res.status(400).json("unknown_error");
  }
};

export default registerOrganization;
