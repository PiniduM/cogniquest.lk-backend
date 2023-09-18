import { RequestHandler } from "express";
import { TApproveCompetition } from "../../../../types/reqBodies.js";
import giveOrganizationId from "../../functions/giveOrganizationId.js";
import mainDBPool from "../../../../utils/mainDBPool.js";

const approveCompetion: RequestHandler = async (req, res) => {
  const { competition_id, parsedData: userData } = req.body as TApproveCompetition;

  const organization_id = await giveOrganizationId(competition_id);
  if (!organization_id) {
    res.status(406).json("invalid_competition_id");
    return;
  }
  const { validMemberships } = userData;

  const isAuthorized = validMemberships.some(
    (membership) =>
      membership.organization_id === organization_id &&
      membership.role === "admin"
  );

  if (!isAuthorized) {
    res.status(401).json("unauthorized");
    return;
  }

  const sql =
    "UPDATE competitions SET admin_approved='Y' WHERE competition_id = ?";
  const values = [competition_id];
  try {
    await mainDBPool.query(sql, values); //must update succesfully ,user_id is already validated when checking for organization_id
    res.status(200).json("approval_given");
  } catch (error) {
    console.log(error);
    res.status(500).json("unknown_error");
  }
};

export default approveCompetion;
