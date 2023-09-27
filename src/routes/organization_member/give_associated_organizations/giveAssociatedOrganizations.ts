import { RequestHandler } from "express";
import mainDBPool from "../../../utils/mainDBPool.js";
import { RowDataPacket } from "mysql2";
import { TGiveAssociatedOrganizationsReqBody } from "../../../types/organizationMemberRoutes.js";

const giveAssociatedOrganizations: RequestHandler = async (req, res) => {
  const data = req.body as TGiveAssociatedOrganizationsReqBody;

  const { parsedData: userData } = data;

  const validMemberships = userData.validMemberships;
  const associatedOrganizationIds = validMemberships.map(
    (membership) => membership.organization_id
  );

  const Filteringvalues = `(${associatedOrganizationIds.join(",")})`;

  const sql = `SELECT organization_id,organization_name FROM organizations WHERE organization_id IN ${Filteringvalues}`;

  try {
    const response = await mainDBPool.query(sql) as RowDataPacket;
    const result = response[0];
    res.status(200).json({ associatedOrganizations: result });
  } catch (error) {
    console.log(error);
    res.status(501).json("unknown_error");
  }
};

export default giveAssociatedOrganizations;
