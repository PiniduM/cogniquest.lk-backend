import { RequestHandler } from "express";
import mainDBPool from "../../../utils/mainDBPool.js";
import createApplicationTable from "./functions/createApplicationTable.js";
import createSubmissionsTable from "./functions/createSubmissionsTable.js";

const approveCompetion: RequestHandler = async (req, res) => {
  const data = req.body;
  const {competition_id } = data;
  const sql =
    "UPDATE competitions SET system_approved='Y', status='live' WHERE competition_id = ?";
  const values = [competition_id];
  try {
    await createApplicationTable(competition_id);
    await createSubmissionsTable(competition_id);
    await mainDBPool.query(sql, values); //must update succesfully ,user_id is already validated when checking for organization_id
    res.status(200).json("approval_given");

  } catch (error) {
    console.log(error);
    res.status(500).json("unknown_error");
  }
};

export default approveCompetion;