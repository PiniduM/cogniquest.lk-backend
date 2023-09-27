import { RequestHandler } from "express";
import mainDBPool from "../../../utils/mainDBPool.js";


const approveCompetion: RequestHandler = async (req, res) => {
  const data = req.body;
  const {competition_id } = data;
  const sql =
    "UPDATE competitions SET system_approved='Y', status='live' WHERE competition_id = ?";
  const values = [competition_id];
  try {
    // table based approch reversed. check ./functions if you want to rearrange
    await mainDBPool.query(sql, values); 
    res.status(200).json("approval_given");

  } catch (error) {
    console.log(error);
    res.status(500).json("unknown_error");
  }
};

export default approveCompetion;