import { RequestHandler } from "express";
import { TApproveCompetitionReqBody } from "../../../../types/adminRoutes.js";

import mainDBPool from "../../../../utils/mainDBPool.js";

const approveCompetion: RequestHandler = async (req, res) => {
  const { competitionId, parsedData} = req.body as TApproveCompetitionReqBody;
  const {organization_id} = parsedData.organizationMembership;


  const sql =
    "UPDATE competitions SET admin_approved='Y' WHERE competition_id = ? AND organization_id=?";
  const values = [competitionId,organization_id]; //to prevent a admin of a organization from uaddproving a competition from another organization
  try {
    await mainDBPool.query(sql, values); 
    res.status(200).json("approval_given");
  } catch (error) {
    console.log(error);
    res.status(500).json("unknown_error");
  }
};

export default approveCompetion;
