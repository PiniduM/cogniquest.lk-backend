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
    const response = (await mainDBPool.query(sql)) as RowDataPacket;
    const result = response[0] as { [key: string]: string }[];
    const mappedResult = result.map(
      ({ organization_id, organization_name }) => ({
        organizationId: organization_id,
        organizationName: organization_name,
      })
    );
    //figure out a way to get rid of these mappings (changing column names to camelcase is a option but it may cause errors in db)
    res.status(200).json({ associatedOrganizations: mappedResult });
  } catch (error) {
    console.log(error);
    res.status(501).json("unknown_error");
  }
};

export default giveAssociatedOrganizations;
