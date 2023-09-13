import { RequestHandler } from "express";
import { TGiveAssociatedOrganizations } from "../../../types/reqBodies.js";
import mainDBPool from "../../../utils/mainDBPool.js";
import { RowDataPacket } from "mysql2";

const giveAssociatedOrganizations: RequestHandler = (req, res) => {
  const data = req.body as TGiveAssociatedOrganizations;

  const { userId } = data.userData;

  const sql =
    `SELECT organization_id,organization_name,role FROM hosting_staff 
    INNER JOIN organizations USING (organization_id) WHERE user_id=?;`;
    const values = [userId]

    try {
        const response = mainDBPool.query(sql,values) as RowDataPacket;
        const result = response[0];
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(501).json('unknown_error');
    }
};

export default giveAssociatedOrganizations;